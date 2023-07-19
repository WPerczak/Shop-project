import React from 'react';

interface Product {
  image: string;
  title: string;
  description: string;
  price: number;
}

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail(props: ProductDetailProps): JSX.Element {
  return (
    <div className="details">
      <div className="productPhoto">
        <img src={props.product.image} className="detail-image" alt="Product Image" />
      </div>
      <div className="right">
        <div className="description">
          <h2>{props.product.title}</h2>
          <p>{props.product.description}</p>
          <h3>{props.product.price}$</h3>
          <button className="buy">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
}