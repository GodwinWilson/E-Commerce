import React, { useState } from "react";
import { Items } from "../data/items";
import { BiSearchAlt } from "react-icons/bi";
import { IoAddCircle, IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MenuContents = ({
  category,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setSearchQuery,
  searchQuery,
  cartItems,
  setCartItems,
  handlePriceFilter,
  priceFilter
}) => {
  let filteredItem =
    category === "" ? Items : Items.filter((item) => item.itemId === category);
  console.log("MenuContents: category =", category);

  if (searchQuery){
    filteredItem = filteredItem.filter((item) => item.name.toLowerCase().includes(searchQuery))
  }

  filteredItem = filteredItem.filter((item) => item.price <= priceFilter.max);

  const [displayStyle, setDisplayStyle] = useState('grid')
  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the items to display on the current page
  const currentItems = filteredItem.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredItem.length / itemsPerPage);

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const dispatch = useDispatch()
  const handleAddToCart = (item) => {
    //setCartItems((prevCartItem) => [...prevCartItem, item])
    dispatch(ADD_TO_CART(item))
    toast.success('Item Added To Cart')
  }

  const navigate = useNavigate()
  const handleItemClick = (itemId) => {
    navigate(`/products/${itemId}`);
  };

  return (
    <div className="mb-2 md:w-3/4">
      <div className="flex items-center justify-between px-2 py-1">

        <div className="flex items-center w-1/4 justify-center md:mr-9">
          <span className="p-1 rounded border border-slate-800">
            <IoGrid
              onClick={() => setDisplayStyle("grid")}
              className="cursor-pointer text-blue-700 mx-1"
            />
          </span>
          <span className="p-1 rounded border-slate-800 border">
            <FaListUl
              onClick={() => setDisplayStyle("list")}
              className="cursor-pointer text-purple-700 mx-1"
            />
          </span>
        </div>

        <p className="text-sm w-1/4">{filteredItem.length} Product(s) found</p>

        <div className="flex border-2 w-1/3 border-black items-center justify-center rounded">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none border-none w-3/4 sm:w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>
            <BiSearchAlt />
          </button>
        </div>

      </div>

      {displayStyle === "grid" ? (
        <div className="grid vs:grid-cols-2 grid-cols-1 sm:grid-cols-3 auto-rows-fr justify-items-center content-between gap-y-10 gap-x-3 w-full h-full px-2 py-10">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center shadow-xl rounded-md py-3 px-1 cursor-pointer"
            >
              <img
                src={item.image}
                alt="GodwinShop Item"
                className="w-36 h-36 object-contain"
                onClick={() => handleItemClick(item.id)}
              />
              <p>&#8358;{item.price}</p>
              <p className="font-medium text-center">{item.name}</p>
              <button
                className="bg-orange-600 text-white p-1 w-full cursor-pointer"
                onClick={() => handleAddToCart(item)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ul className="w-full h-full px-2 py-10">
          {currentItems.map((item) => (
            <li
              key={item.id}
              className="flex md:flex-row flex-col items-center justify-between shadow-xl rounded-md py-3 px-1 mb-3 cursor-pointer"
            >
              <img
                src={item.image}
                alt=""
                className="md:w-1/4 w-full h-36 object-contain"
                onClick={() => handleItemClick(item.id)}
              />
              <span
                className="md:w-1/4 w-full"
                onClick={() => handleItemClick(item.id)}
              >
                {item.description.length > 150
                  ? item.description.slice(0, 150) + "..."
                  : item.description}
              </span>
              <div className="md:w-1/4 w-1/3 flex flex-col items-center justify-center">
                <p className="font-medium">{item.name}</p>
                <p>&#8358;{item.price}</p>
                <button
                  className="bg-orange-600 text-white p-1 w-1/2 flex items-center justify-center cursor-pointer"
                  onClick={() => handleAddToCart(item)}
                >
                  <IoAddCircle />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex space-x-5 justify-center">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-amber-500 text-white px-2 py-1 rounded"
          >
            Prev
          </button>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className="bg-amber-500 text-white py-1 px-2 rounded"
          >
            {number}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-amber-500 text-white py-1 px-2 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuContents;
