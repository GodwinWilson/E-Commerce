import React, { useState } from "react";
import RegisterImg from "../assets/register.png";
import { BsGoogle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/Config";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_ACTIVE_USER } from "../redux/features/authSlice";
import { SET_NICKNAME } from "../redux/features/authSlice";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [nickname, setNickName] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  //const nickname = useSelector((state) => state.auth.nickName)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerUser = async (e) => {
    e.preventDefault();
    //console.log(email, password, cPassword)
    if (password !== cPassword) {
      toast.error("Passwords do not match!");
    }

    dispatch(SET_NICKNAME(nickname))
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        //console.log(user);
        //await updateProfile(user, { displayName: nickName });
        console.log(user.displayName)
        setIsLoading(false);
        toast.success("User successfully created!");

        if(nickname){
          await updateProfile(user, {displayName: nickname})
          dispatch(
            SET_ACTIVE_USER({
              email: user.email,
              userName: nickname,
              userID: user.uid,
              nickName: nickname,
            })
          );
        }else{
          dispatch(
            SET_ACTIVE_USER({
              email:user.email,
              userName:null,
              userID:user.uid,
              nickname:null
            })
          )
        }
        //dispatch(SET_ACTIVE_USER({nickname}))
        navigate("/");
        
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className="container mx-auto flex items-center justify-center min-h-[80vh]">
        <div className="w-1/2 rounded shadow-xl md:h-80 sm:h-64 py-2 sm:py-2 px-1">
          <p className="text-center font-bold text-2xl text-amber-600 my-1">
            Register
          </p>
          <form
            action=""
            className="flex flex-col gap-1 md:gap-4"
            onSubmit={registerUser}
          >
            <input
              type="text"
              placeholder="Username"
              name="nickName"
              id="nickName"
              className="border border-gray-700 focus:outline-none h-6 md:h-8 rounded"
              required
              value={nickname}
              //onChange={(e) => dispatch(SET_NICKNAME( e.target.value))}
              onChange={(e) => setNickName(e.target.value)}
            />

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

            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-700 focus:outline-none h-6 md:h-8 rounded"
              required
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white p-1 rounded"
            >
              Register
            </button>
          </form>
          {/* <button className="bg-amber-600 text-white p-1 text-sm w-full rounded flex items-center justify-center mt-1">
            <BsGoogle size={10} className='mx-1' /> SignUp with Google
          </button> */}
          <span className="w-full text-slate-700 text-sm md:text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-black">
              Login
            </Link>
          </span>
        </div>
        <div className="w-1/2">
          <img src={RegisterImg} alt="" />
        </div>
      </section>
    </>
  );
};

export default Register;

