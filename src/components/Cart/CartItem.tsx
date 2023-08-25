import React from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { cartActions } from "@/app/cartSlice";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    quantity: number;
    total: number;
    price: number;
    image: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const dispatch = useAppDispatch();
  const { title, quantity, total, price, id, image } = item;

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const addItemHandler = () => {
    dispatch(cartActions.addItemToCart({ id, title, price, image, total, quantity }));
  };

  return (
    <div className="modal-list">
      <ul className="modal-products">
        <li className="modal-product">
          <div className="modal-image">
            <Image
              src={image}
              className="modal-image-photo"
              width={200}
              height={200}
              alt="Description of the image"
            />
          </div>
          <div className="modal-title">
            <h2>{title}</h2>
            <h2>{price.toFixed(2)}</h2>
            <h3>{total.toFixed(2)}</h3>
          </div>
          <div className="modal-buttons">
            <div className="modal-button-less" onClick={removeItemHandler}>
              -
            </div>
            <div className="modal-count">{quantity}</div>
            <div className="modal-button-more" onClick={addItemHandler}>
              +
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CartItem;
