import React from 'react';
import { useAppDispatch } from '@/app/hooks';
import { cartActions } from '@/app/cartSlice';

interface Product {
  id: number,
  title: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
  total?: number;
}

interface ProductDetailProps {
  product: Product;
}


export default function ProductDetail(props: ProductDetailProps): JSX.Element {
  
  const dispatch = useAppDispatch();
  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: props.product.id,
        title: props.product.title,
        price: props.product.price,
        image: props.product.image,
        quantity: 1,
        total: props.product.price
      })
    );
  };
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
          <button className="buy" onClick={addToCartHandler}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
}
