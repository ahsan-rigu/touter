import React, { useState, useEffect } from "react";
import {truncateText} from './truncateText';
import './style.css'

export default function Products({products})  {

  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(({titile, description, price}) => title.toLowerCase.includes(search.toLowerCase()) || description.toLowerCase.includes(search.toLowerCase()) || price.toLowerCase.includes(search.toLowerCase()))
  
  return (
    <div>
      <input data-testid="search" type="text" placeholder="search here" onChange={(e)=> setSearchQuery(e.target.value)} value={searchQuery}/>
      <div className="container" data-testid="products" >
      </div>
    </div>
  );
};

export function truncateText(text, length) {
    return text.slice(0,length) + "..."
   // Write your code here
  }


  import React, { useState, useEffect } from "react";
import {truncateText} from './truncateText';
import Products from './Products';
import './style.css'

export default function Solution()  {

  const [products, setProducts] = useState([])


  
  
  
  return (
    <div>
      <h1>MoonshotX Products</h1>
      <Products  products={products}/>
    </div>
  );
};





