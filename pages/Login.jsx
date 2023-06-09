import React, { useEffect } from 'react'
import LoginImg from '../assets/login.png'
import { Link } from 'react-router-dom';
import {BsGoogle} from 'react-icons/bs'
import { useState } from 'react'
import {BounceLoader} from 'react-spinners'
import { auth } from "../firebase/Config";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword, GoogleAuthProvider,signInWithPopup, signInWithRedirect, getRedirectResult} from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

useEffect(() => {
  handleRedirectResult();
}, []);

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        toast.success('User Logged In!')
        setIsLoading(false)
        navigate('/')
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage)
        setIsLoading(false)
      });
  }

  const provider = new GoogleAuthProvider();
  
  const googleSignIn = async () => {
    setLoading(true)
    await signInWithRedirect(auth, provider); 
    toast.success('Please wait while we authenticate your account')   
  }

  const handleRedirectResult = async () => {
    try{
      await getRedirectResult(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate("/");
        toast.success("You're logged in");
      })
    }
    catch (error) {
      toast.error(error.message)
    }
    finally{
      setLoading(false)
    }
  }

  
  return (
    <>
      {isLoading && <Loader />}
      <section className="container mx-auto min-h-[80vh] flex items-center justify-center">
        <div className="w-1/2 h-full">
          <img
            src={LoginImg}
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-1/2 rounded shadow-xl md:h-80 sm:h-64 py-2 sm:py-2 px-1">
          <p className="text-center font-bold text-2xl text-amber-600 my-1">
            Login
          </p>
          <form
            //action=""
            className="flex flex-col gap-1 md:gap-4"
            onSubmit={loginUser}
          >
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-700 focus:outline-none h-6 md:h-8 rounded"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border border-gray-700 focus:outline-none h-6 md:h-8 rounded"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-1 rounded"
            >
              Login
            </button>
            <div>
              <Link to="/forgot-password">Forgot Password</Link>
            </div>
            <p className="text-center">-- or --</p>
          </form>
          
          <button
            onClick={googleSignIn}
            className="bg-amber-600 text-white p-1 text-sm w-full rounded flex items-center justify-center"
          >
            <BsGoogle size={10} className="mx-1" /> Login with Google
          </button>
          <span className="w-full text-slate-700 text-sm md:text-base">
            Don't have an account?{" "}
            <Link to="/register" className="text-black">
              Register
            </Link>
          </span>
        </div>
      </section>
    </>
  );
}

export default Login