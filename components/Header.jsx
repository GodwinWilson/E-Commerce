import React, { useEffect, useState } from "react";
//import Logo from '../assets/logo192.png'
import {
  Link,
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { HiShoppingCart, HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp, IoPersonCircleSharp } from "react-icons/io5";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
  selectCartItems,
} from "../redux/features/authSlice";
const logo = (
  <div className="">
    <Link to="/">
      <h2 className="font-bold sm:text-2xl text-xl">
        Godwin<span className="text-amber-500 sm:text-3xl text-2xl">Shop</span>
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? "under" : "");

import { selectNickName } from "../redux/features/authSlice";
import LoggedIn, { LoggedOut } from "./HideLinks";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("User");

  const dispatch = useDispatch();
  const nickname = useSelector(selectNickName);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //const uid = user.uid;

        setDisplayName(user.displayName || nickname);
        if (user.displayName === null) {
          setDisplayName(nickname);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName || nickname,
            userID: user.uid,
            nickName: nickname,
          })
        );
      } else {
        setDisplayName(displayName);
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("User Logged Out");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  const cartItems = useSelector(selectCartItems)
  return (
    <>
      <ToastContainer />
      <header className="w-full bg-zinc-900 text-white">
        <div className="p-4 w-full h-32 flex items-center justify-between my-0 md:container mx-auto">
          {logo}
          <nav
            className={`md:flex md:items-center md:justify-between md:w-[75%] md:bg-transparent bg-zinc-900 ${
              showMenu ? "show-nav" : "hide-nav"
            }`}
          >
            <div
              className={`md:hidden ${
                showMenu ? "nav-wrapper shownavwrapper" : "nav-wrapper"
              }`}
              onClick={hideMenu}
            ></div>

            <ul
              className="md:flex md:justify-between md:space-x-2 block"
              onClick={hideMenu}
            >
              <li className="w-full md:w-auto md:py-0 px-2 h-20 md:border-none border-b border-zinc-500 md:hidden flex items-center justify-between">
                {logo}
                <IoCloseSharp size={30} />
              </li>

              <li className="w-full md:w-auto py-2 md:py-0 md:border-none border-b border-zinc-500">
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>

              <li className="w-full md:w-auto py-2 md:py-0 md:border-none border-b border-zinc-500">
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>

            <div className="flex md:flex-row flex-col" onClick={hideMenu}>
              <span className="md:space-x-2 flex md:flex-row flex-col md:items-center mx-1">
                <p className="flex items-center text-amber-500">
                  <IoPersonCircleSharp size={16} />
                  Hi {displayName || nickname}
                </p>
                <LoggedOut>
                  <NavLink
                    to="/login"
                    className={`hover:text-amber-500 w-full md:w-auto py-2 md:py-0 md:border-none border-b border-zinc-500`}
                  >
                    Login
                  </NavLink>
                </LoggedOut>

                <LoggedIn>
                  <NavLink
                    to="/orders"
                    className="hover:text-amber-500 w-full md:w-auto py-2 md:py-0 md:border-none border-b border-zinc-500"
                  >
                    My Orders
                  </NavLink>
                </LoggedIn>

                <LoggedIn>
                  <NavLink to="/" onClick={logoutUser}>
                    Logout
                  </NavLink>
                </LoggedIn>
              </span>
              <span className="flex items-center mx-1 relative">
                <NavLink
                  to="/cart"
                  className="hover:text-amber-500 w-full md:w-auto py-2 md:py-0 md:border-none border-b border-zinc-500"
                >
                  <HiShoppingCart size={23} />
                  <p className="absolute bottom-3 left-6">{cartItems.length}</p>
                </NavLink>
              </span>
            </div>
          </nav>

          <div className="md:hidden flex gap-3">
            <span className="flex items-center mx-1 relative">
              <Link to="/cart" className="hover:text-amber-500">
                <HiShoppingCart size={23} />
                <p className="absolute bottom-3 left-6">{cartItems.length}</p>
              </Link>
            </span>
            <span>
              <HiOutlineMenuAlt3 size={30} onClick={toggleMenu} />
            </span>
          </div>
        </div>
        <Outlet />
      </header>
    </>
  );
};

export default Header;
