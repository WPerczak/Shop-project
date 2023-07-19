import Products from "@/components/Products/Products";
import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CategoryPageProps {
  products: Product[];
}

export default function CategoryPage(props: CategoryPageProps): JSX.Element {
  return (
    <div className="body">
      <Products Items={props.products} />
    </div>
  );
}

export async function getStaticPaths() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const categories: string[] = await response.json();

  const paths = categories.map((category) => ({
    params: { slug: category },
  }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${slug}`
  );
  const products: Product[] = await response.json();
  console.log(products);
  return {
    props: {
      products: products.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      })),
    },
  };
}