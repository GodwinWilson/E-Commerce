import React, { useState } from "react";
import { TbCaretRight } from "react-icons/tb";

const SubMenu = ({setCat, handlePriceChange, setPriceFilter, priceFilter}) => {
  //const [priceFilter, setPriceFilter] = useState({ min: 1000, max: 500000 });
  const handleClearFilter = () => {
    handlePriceChange({ target: { value: 500000 } });
    setCat("");
  };
  return (
    <div className="px-1 md:mr-2 md:w-1/4">
      <h2 className="text-xl font-medium">Categories</h2>
      <div className="">
        <ul className="flex flex-row md:flex-col items-center md:justify-normal md:items-start md:w-full justify-between flex-wrap">
          <li className="py-1 border-b border-black flex items-center cursor-pointer md:w-full" onClick={()=>setCat('')}>
            <TbCaretRight /> All
          </li>
          <li
            className="py-1 border-b border-black flex items-center cursor-pointer md:w-full"
            onClick={() => setCat("Shoes")}
          >
            <TbCaretRight /> Shoes
          </li>
          <li
            className="py-1 border-b border-black flex items-center cursor-pointer md:w-full"
            onClick={() => setCat("Fashion")}
          >
            <TbCaretRight /> Fashion
          </li>
          <li
            className="py-1 border-b border-black flex items-center cursor-pointer md:w-full"
            onClick={() => setCat("Phone")}
          >
            <TbCaretRight /> Phones
          </li>
          <li
            className="py-1 border-b border-black flex items-center cursor-pointer md:w-full"
            onClick={() => setCat("Laptop")}
          >
            <TbCaretRight /> Laptop
          </li>
          <li
            className="py-1 border-b border-black flex items-center cursor-pointer md:w-full"
            onClick={() => setCat("Electronics")}
          >
            <TbCaretRight /> Electronics
          </li>
        </ul>

        <div className="mt-2">
          <h2 className="text-xl font-medium">Brand</h2>
          <select name="" id="" className="border border-gray-900 w-full">
            <option value="">All</option>
          </select>
        </div>

        <div className="mt-2">
          <h2 className="text-xl font-medium">Price</h2>
          <div className="flex flex-col">
            <label htmlFor="">&#8358; {priceFilter.max}</label>
            <input
              type="range"
              name=""
              id=""
              min={2000}
              value={priceFilter.max}
              max={500000}
              step={5000}
              onChange={handlePriceChange}
              className="range bg-transparent w-full h-2 appearance-none"
            />
          </div>
        </div>
        <button className="bg-amber-500 text-white py-1 px-2 w-full mt-3 rounded" onClick={handleClearFilter}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default SubMenu;
