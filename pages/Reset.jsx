import React, { useState } from 'react'
import ResetImg from '../assets/forgot.png'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail, } from 'firebase/auth'
import { auth } from '../firebase/Config'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'



const Reset = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success('Password reset email sent')
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
      });
  }


  return (
    <>
    {isLoading && <Loader/>}
      <section className="container mx-auto flex items-center justify-center min-h-[80vh]">
        <div className="w-1/2">
          <img src={ResetImg} alt="" />
        </div>
        <div className="w-1/2 flex flex-col space-y-3 rounded shadow-xl md:h-64 sm:h-64 sm:py-2 px-1">
          <h3 className="text-center text-xl text-amber-500 font-bold">
            Reset Password
          </h3>
          <form action="" className="flex flex-col gap-2" onSubmit={resetPassword}>
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-700 focus:outline-none h-6 md:h-8 rounded"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit' className="bg-blue-600 text-white p-1 rounded">
              Submit
            </button>
          </form>
          <div className="flex items-center justify-between">
            <Link to="/login">- Login</Link>
            <Link to="/register">- Register</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Reset