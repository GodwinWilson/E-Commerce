import React from 'react'

const date = new Date

const year = date.getFullYear()

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white text-2xl flex items-center justify-center h-32">
      <div className="conatiner mx-auto text-xs xs:text-sm sm:text-base">
        <p className="sm:text-xl text-base font-bold inline">
          Godwin<span className="sm:text-2xl text-xl text-amber-500">Shop </span>
        </p>
        <p className='inline'>&copy; {year} All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer