import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_ITEM_QUANTITY,
  selectCartItems,
  REMOVE_ITEM_FROM_CART,
  selectIsLoggedIn,
} from "../redux/features/authSlice";
import { MdAdd, MdRemove, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Payment from "./Payment";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <div className="container mx-auto min-h-[80vh]">
      <h1 className="text-2xl font-bold">Cart</h1>
      {cartItems.length == 0 ? (
        <img src="https://png.pngtree.com/element_our/20190530/ourmid/pngtree-man-pushing-a-shopping-cart-cartoon-image_1251699.jpg" alt="Empty Cart"/>
      ) : (
        <>
          <ul className="">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-1 border border-slate-200 mb-1 rounded"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="sm:h-20 sm:w-20 w-14 h-14 object-contain"
                />
                <div className="flex items-center justify-center w-1/5">
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      dispatch(
                        UPDATE_ITEM_QUANTITY({ itemId: item.id, quantity: -1 })
                      )
                    }
                  >
                    <MdRemove />
                  </span>

                  <p className="text-purple-600 font-medium text-lg mx-1">
                    x<span className="text-violet-600">{item.quantity}</span>
                  </p>
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      dispatch(
                        UPDATE_ITEM_QUANTITY({ itemId: item.id, quantity: 1 })
                      )
                    }
                  >
                    <MdAdd />
                  </span>
                </div>
                <p className="w-2/5 text-sm sm:text-base">{item.name}</p>
                <p className="w-1/5 text-sm sm:text-base">
                  &#8358;{item.price * item.quantity}
                </p>
                <span
                  className="text-red-700 cursor-pointer"
                  onClick={() => {
                    dispatch(REMOVE_ITEM_FROM_CART(item.id));
                    toast.success("Item removed from cart");
                  }}
                >
                  <MdDelete />
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center justify-center pb-3">
            <div className="flex items-center justify-between w-full">
              <p className="font-medium text-lg">Total</p>
              <p className="font-medium text-lg">&#8358; {getTotalPrice()}</p>
            </div>
            {/* <button className="bg-blue-500 text-white rounded py-1 px-2 ">
          Proceed To Payment
        </button> */}
            {isLoggedIn ? (
              <Payment getTotalPrice={getTotalPrice()} />
            ) : (
              "Log In to purchase items"
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
