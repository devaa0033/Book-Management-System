'use client'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'

export default function page() {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
    });

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
        const response = await axios.post("/api/auth/register", inputs);
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
        
        {/* Left: Form */}
        <div className="md:w-3/5 md:pr-8 w-full">
          <h1 className="text-3xl font-bold mb-4 text-black">Sign Up</h1>
          <p className='text-black'>
            Already have an account? <a href="/login" className="text-blue-500">Login</a>
          </p>
          <form action="" className='mt-4'>
            {['Name', 'Email', 'Phone', 'Address', 'Password'].map((label, idx) => (
              <div className="form-group flex flex-col md:flex-row items-start md:items-center text-black mb-4" key={idx}>
                <label className="w-full md:w-28 mb-1 md:mb-0">{label}</label>
                <input
                  type={label.toLowerCase().includes('password') ? 'password' : 'text'}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className='w-full flex-1 rounded-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black' onChange={handleChange} name={label.toLowerCase()}
                />
              </div>
            ))}

            <div className="flex items-start md:items-center mt-4">
              <input type="checkbox" id="terms" className='mr-2 ' />
              <label htmlFor="terms" className='text-black'>I agree to the terms and conditions</label>
            </div>

            <div className="flex justify-center mt-4">
              <button type="submit" className='bg-blue-800 text-white py-2 px-6 rounded-full' onClick={handleClick}>Sign Up</button>
            </div>
          </form>
        </div>

        {/* Right: Image */}
        <div className="md:w-2/5 w-full mt-6 md:mt-0 flex justify-center items-center">
          <Image src="/customize@3x.webp" alt="Signup" width={400} height={400} />
        </div>

      </div>
    </div>
  )
}
