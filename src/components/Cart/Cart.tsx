import React from "react";
import Image from "next/image";
import example from "../Header/logo.webp";

interface CartModalOverlayProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const CartModalOverlay = ({ isOpen, toggleModal }: CartModalOverlayProps): JSX.Element | null => {
  const handleOverlayClick = () => {
    toggleModal();
    const bodyElement = document.body;
    bodyElement?.classList.remove("cartIsOpen")
  };

  return isOpen ? (
    <div className="modal-overlay" id="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-list">
          <ul className="modal-products">
            <li className="modal-product">
              <div className="modal-image">
                <Image src={example} alt="example" className="example" />
              </div>
              <div className="modal-title">
                <h2>Modal Title</h2>
                <h2>50$</h2>
              </div>
              <div className="modal-buttons">
                <div className="modal-button-less">-</div>
                <div className="modal-count">1</div>
                <div className="modal-button-more">+</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="total-amount">
          <span>Total:</span>
          <span>500$</span>
        </div>
        <button>BUY</button>
      </div>
    </div>
  ) : null;
};

export default CartModalOverlay;