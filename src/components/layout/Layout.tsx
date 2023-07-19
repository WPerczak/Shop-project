import Header from "../Header/Header";
import { useState, useEffect } from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import CartModalOverlay from "../Cart/Cart";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  
  function toggleCartModal() {
    setCartIsOpen(!cartIsOpen);
    const bodyElement = document.body;
    bodyElement?.classList.add("cartIsOpen")
  }

  function Scroll() {
    const currentScrollPos: number = window.pageYOffset;
    const visibility: boolean = currentScrollPos < 70 || prevScrollPos > currentScrollPos;
    setPrevScrollPos(currentScrollPos);
    setVisible(visibility);
  }

  useEffect(() => {
    window.addEventListener("scroll", Scroll);
    return () => window.removeEventListener("scroll", Scroll);

  }, [prevScrollPos]);

  return (
    <div className="layout">
      <CSSTransition
        in={visible}
        timeout={600}
        classNames="header-transition"
        unmountOnExit
      >
        <Header toggleModal={toggleCartModal}/>
      </CSSTransition>
      <main className="main">{props.children}</main>
      {cartIsOpen && (
        <CartModalOverlay isOpen={cartIsOpen} toggleModal={toggleCartModal} />
      )}
    </div>
  );
}

export default Layout;



