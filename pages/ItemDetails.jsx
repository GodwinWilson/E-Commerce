import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Items } from "../data/items";
import { ADD_TO_CART, selectIsLoggedIn, selectNickName } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {FaStar} from 'react-icons/fa'
import { toast } from "react-toastify";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('')
  const [reviews, setReviews] = useState([]);
  const item = Items.find((item) => item.id === itemId);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(ADD_TO_CART(item));
    toast.success('Item Added To Cart')
  };
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const nickname = useSelector(selectNickName)

  const handleAddReview = (event) => {
    event.preventDefault();

    // Create new review object
    const newReview = {
      userId: nickname,
      rating,
      comment,
    };

    // Add new review to item's reviews array
    // (You'll need to update your data structure accordingly)const itemIndex = Items.findIndex((item) => item.id === itemId);
    const itemIndex = Items.findIndex((item) => item.id === itemId);
    if (itemIndex > 0) {
      Items[itemIndex].reviews.push(newReview);
    }

    setReviews([...reviews, newReview]);
    // Clear the rating and comment fields

    setRating('');
    setComment("");
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const renderStarRating = (value) => {
    const stars = [];
    const max_rating = 5
   for (let i = 0; i < max_rating; i++) {
    const starColor = i < value ? "gold" : "grey";
     stars.push(
        <FaStar
          key={i}
          color={starColor}
          className="inline"
          onClick={() => handleRatingChange(i + 1)}
        />
      );
    }
    return stars;
  };
  

  return (
    <div>
      <span className="text-lg font-semibold">{item.name} Detail</span>
      <div className="container mx-auto flex items-center justify-center border border-zinc-400 rounded-md">
        <div className="w-1/2 h-60">
          <img
            src={item.image}
            alt={item.name}
            className="w-full object-contain h-full"
          />
        </div>
        <div className="w-1/2 px-2 space-y-3">
          <p className="text-purple-700 font-medium text-xl uppercase">
            {item.name}
          </p>
          <p className="leading-6">{item.description}</p>
          <p className="text-lg">&#8358;{item.price}</p>
          <button
            className="bg-orange-600 text-white p-1 w-1/2 flex items-center justify-center cursor-pointer"
            onClick={() => handleAddToCart(item)}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <section className="container mx-auto mt-5">
        <h3 className="text-xl font-medium">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <p>{review.userId}</p>
                <p>Rating: {renderStarRating(review.rating)}</p>
                <p>Comment: {review.comment}</p>
              </li>
            ))}
          </ul>
        )}

        {isLoggedIn && (
          <form
            onSubmit={handleAddReview}
            className="flex flex-col justify-between w-2/3 mt-4"
          >
            <label htmlFor="rating" className="text-lg font-medium">
              Rating:
            </label>
            <span className="flex cursor-pointer text-xl">
              <div>{renderStarRating(rating)}</div>
            </span>

            <label htmlFor="comment" className="text-lg font-medium">
              Comment:
            </label>
            <textarea
              id="comment"
              className="border border-slate-400"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment Here..."
              required
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 p-1 text-teal-50 my-1 rounded"
            >
              Submit Review
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ItemDetails;
