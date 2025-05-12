import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // adjust as needed
  withCredentials: true, // send cookies (refreshToken)
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If access token expired and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post('/api/refresh_access_token', {}, {
          withCredentials: true
        });

        const newAccessToken = res.data.accessToken;

        // Save it (e.g., in memory, localStorage, or axios header)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Optionally redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
