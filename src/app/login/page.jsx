'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { AuthContext } from '@/context/authContext' 

export default function page() {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const {login} = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleClick = async (e) => {
      e.preventDefault();
      try {
       const response =  await login(inputs);

        alert(response.data.message);
      } catch (error) {
        console.error(error);

        const errorMessage =
          error.response?.data?.error || 
          error.response?.data?.message || 
          error.message || 
          "Something went wrong";

        alert(errorMessage);
      }
    }

  return (
    <div className="flex justify-center items-center bg-blue-900 min-h-screen px-4 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-blue-100 p-8 rounded-xl">

      {/* Left: Image */}
      <div className="md:w-2/5 w-full mt-6 md:mt-0 flex justify-center items-center">
          <Image src="/customize@3x.webp" alt="Signup" width={400} height={400} />
      </div>

        {/* Right: Form */}
        <div className="md:w-3/5 md:pr-8 w-full">
          <h1 className="text-3xl font-bold mb-4 text-black">Sign In</h1>
          <p className='text-black'>
            Don't have an account? <a href="/register" className="text-blue-500">Register</a>
          </p>
          <form action="" className='mt-4'>
            {['Email', 'Password'].map((label, idx) => (
              <div className="form-group flex flex-col md:flex-row items-start md:items-center text-black mb-4" key={idx}>
                <label className="w-full md:w-28 mb-1 md:mb-0">{label}</label>
                <input
                  type={label.toLowerCase().includes('password') ? 'password' : 'text'}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className='w-full flex-1 rounded-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black' onChange={handleChange} name={label.toLowerCase()}
                />
              </div>
            ))}


            <div className="flex justify-center mt-4">
              <button type="submit" className='bg-blue-800 text-white py-2 px-6 rounded-full' onClick={handleClick}>Sign in</button>
            </div>
          </form>
        </div>

        

      </div>
    </div>
  )
}
