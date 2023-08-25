import React from "react";
import Image from "next/image";
import CartItem from "./CartItem";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";

interface CartModalOverlayProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const CartModalOverlay: React.FC<CartModalOverlayProps> = ({
  isOpen,
  toggleModal,
}) => {
  const handleOverlayClick = () => {
    toggleModal();
    const bodyElement = document.body;
    bodyElement?.classList.remove("cartIsOpen");
  };

  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const cartPrice = useAppSelector((state: RootState) => state.cart.totalPrice);

  return isOpen ? (
    <div className="modal-overlay" id="modal-overlay">
      <div className="modal-content">
      {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                total: item.total,
                price: item.price,
                image: item.image,
              }}
            />
          ))
        ) : (
          <p>There is nothing in the cart.</p>
        )}
        <div className="total-amount">
          <span>Total:</span>
          <span>{cartPrice.toFixed(2)}</span>
        </div>
        <button onClick={handleOverlayClick}>BUY</button>
      </div>
    </div>
  ) : null;
};

export default CartModalOverlay;
