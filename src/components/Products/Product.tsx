import Link from "next/link";
import React from "react";

interface IProductProps {
  title: string;
  id: number;
  image: string;
  price: number;
}

const Product: React.FC<IProductProps> = ({ title, id, image, price }) => {
  let Title = title;
  if (Title.length > 25) {
    Title = Title.slice(0, 25) + "...";
  }
  return (
    <li className="product">
      <Link href={`/product/${id}`}>
        <img src={image} className="photo"></img>
        <div className="description">
          <div className="name" title={title}>
            {Title}
          </div>
          <div className="price">{price}$</div>
        </div>
      </Link>
    </li>
  )
}

export default Product;