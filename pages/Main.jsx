import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import SubMenu from '../components/SubMenu'
import MenuContents from '../components/MenuContents'
import { useDispatch } from 'react-redux'
import { ADD_TO_CART } from '../redux/features/authSlice'


const Main = () => {
  const [category, setCategory] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState([]);
  const [priceFilter, setPriceFilter] = useState({ min: 2000, max: 500000 });



  console.log("Main: category =", category);
  useEffect(()=> {
    
  },[]);

  const handlePriceChange = (event) => {
    const {value} = event.target
    setPriceFilter((prevFilter) => ({...prevFilter, max:parseInt(value)}))
  }
  
  function setCat(itemId){
    setCategory(itemId)
    setCurrentPage(1)
  }

  const dispatch = useDispatch()

  return (
    <div className="h-auto">
      <Slider />
      <div
        className="flex flex-col md:flex-row items-start justify-center container mx-auto"
        id="products"
      >
        <SubMenu setCat={setCat} handlePriceChange={handlePriceChange} priceFilter={priceFilter}/>
        <MenuContents
          category={category}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCartItems={(item) => dispatch(ADD_TO_CART(item))}
          cartItems={cartItems}
          handlePriceChange={handlePriceChange}
          priceFilter={priceFilter}
        />
      </div>
    </div>
  );
}

export default Main