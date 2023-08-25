import React, { useEffect, useState } from "react";
import logo from "./logo.webp";
import login from "./login.png";
import cart from "./cart.png";
import toggle from "./toggle.png";
import Categories from "./Categories/Categories";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";

interface HeaderProps {
  toggleModal: () => void;
}

function Header({toggleModal}: HeaderProps): JSX.Element {
  const [isShown, setIsShown] = useState(false);
  const [menuIsShown, setMenuIsShown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cartQuantity = useAppSelector((state: RootState) => state.cart.totalQuantity);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setIsMobile(true);
      }
      if (window.innerWidth > 700) {
        setIsMobile(false);
        setMenuIsShown(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function toggleMenu() {
    const menu = document.getElementById("header-menu");
    const buttons = document.getElementById("header-buttons");
    if (menuIsShown) {
      menu?.classList.add("responsive");
      buttons?.classList.add("responsive");
    } else {
      menu?.classList.remove("responsive");
      buttons?.classList.remove("responsive");
    }
    setMenuIsShown(!menuIsShown);
  }



  return (
    <header className="site-header" id="site-header">
      <div className="header">
        {isMobile && (
          <div className="toggle">
            <Image
              alt="toggle-button"
              src={toggle}
              className="toggle-button"
              onClick={toggleMenu}
            />
          </div>
        )}

        <Link href="/">
          <div className="header-logo">
            <Image alt="logo" src={logo} className="header-logo-image" />
          </div>
        </Link>
        <div className="header-buttons" id="header-buttons">
          <div className="header-user-button">
            <Link href="/login">
              <Image
                alt="login"
                src={login}
                className="header-button-image"
              />
            </Link>
          </div>
          <div className="header-user-button">
            <Image
              alt="cart"
              src={cart}
              className="header-button-image"
              onClick={toggleModal}
            />
            {cartQuantity > 0 &&
            <div className="total-cart-quantity"><p>{cartQuantity}</p></div>
            }
          </div>
        </div>
      </div>
      <div className="header-menu" id="header-menu">
        <ul className="header-list">
          <li
            className="header-element"
            onMouseEnter={() => {
              setIsShown(true);
            }}
            onMouseLeave={() => {
              setIsShown(false);
            }}
          >
            <h3 className="h">
              {" "}
              <Link href="/category/clothing"> Clothing </Link>
            </h3>
            {isShown && <Categories />}
          </li>
          <li className="header-element">
            <h3 className="h">
              {" "}
              <Link href="/category/jewelery"> Jewelery </Link>
            </h3>
          </li>
          <li className="header-element">
            <h3 className="h">
              {" "}
              <Link href="/category/electronics"> Electronics </Link>
            </h3>
          </li>
        </ul>
      </div>

    </header>
  );
}

export default Header;