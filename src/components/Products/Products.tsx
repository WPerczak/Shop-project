import Product from "./Product";
import React, { useRef } from "react";

interface ProductProps {
  Items?: {
    id: number;
    title: string;
    price: number;
    image: string;
  }[];
}

function Products(props: ProductProps): JSX.Element {
  const ProductsRef = useRef<HTMLUListElement>(null);

  const ScrollRight = (): void => {
    if (ProductsRef.current) {
      ProductsRef.current.scrollBy({
        left: 310,
        behavior: "smooth",
      });
    }
  };

  const ScrollLeft = (): void => {
    if (ProductsRef.current) {
      ProductsRef.current.scrollBy({
        left: -310,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="products">
      <ul className="list" ref={ProductsRef}>
        {props?.Items?.map((item) => (
          <Product
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
          />
        ))}
      </ul>
      <div className="scroll-right" onClick={ScrollRight}>
        <h1>〉</h1>
      </div>
      <div className="scroll-left" onClick={ScrollLeft}>
        <h1>〈</h1>
      </div>
    </div>
  );
}

export default Products;