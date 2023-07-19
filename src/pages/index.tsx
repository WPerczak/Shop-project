import { Fragment, useEffect, useState } from "react";
import Products from "@/components/Products/Products";
import Banner from "@/components/Body/Banner/Banner";

interface ProductItem {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface HomePageProps {
  products: ProductItem[];
}

export default function HomePage(props: HomePageProps): JSX.Element {
  return (
    <Fragment>
      <div className="body">
        {/* <Banner /> */}
        <h1 className="category-name">Everything</h1>
        <Products Items={props.products} />
      </div>
    </Fragment>
  );
}

export async function getStaticProps(): Promise<{ props: HomePageProps }> {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  return {
    props: {
      products: data.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.category,
        image: item.image,
      })),
    },
  };
}