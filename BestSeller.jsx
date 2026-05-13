import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
    const {products} = useAppContext()
  return (
    <div className='mt-16 w-[90%] mx-auto  justify-center '>
        <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      <diV className='mt-6 flex justify-center ' >
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
          {products.filter((product)=> product.inStock).slice(0,5).map((product,index)=>(
              <ProductCard key={index} product={product}/>
          ))}
            
        </div>
      </diV>
    </div>
  )
}

export default BestSeller