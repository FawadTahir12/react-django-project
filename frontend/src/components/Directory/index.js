import React from 'react'
import { Link } from 'react-router-dom';
import ShopMen from './../../assests/shopMens.jpg'
import ShopWomen from './../../assests/shopWomens.jpg';
import './style.scss'

function Directory() {
  return (
    <div className="directory">
    <div className="wrap">
      <div
        className="item"
        style={{
          backgroundImage: `url(${ShopWomen})`
        }}
      >
        <a>
          
        {/* <Link to="/search/womens"> */}
          Shop Womens
        {/* </Link> */}
        </a>
      </div>
      <div
        className="item"
        style={{
          backgroundImage: `url(${ShopMen})`
        }}
      >
        <a>
        {/* <Link to="/search/mens"> */}
          Shop Mens
        {/* </Link> */}
          
        </a>
      </div>
    </div>
  </div>
  )
}

export default Directory
