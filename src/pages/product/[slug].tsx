import React from "react";
import ProductDetail from "@/components/ProductDetail/ProductDetail";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface ProductPageProps {
  product: Product;
}

export default function ProductPage(props: ProductPageProps): JSX.Element {
  console.log(props.product);
  return (
    <div className="body">
      <div className="productDetail">
        <ProductDetail product={props.product} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const response = await fetch("https://fakestoreapi.com/products/");
    const chosenProduct: Product[] = await response.json();

    const paths = chosenProduct.map((product) => ({
      params: { slug: product.id.toString() },
    }));
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error(error);
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const response = await fetch(`https://fakestoreapi.com/products/${slug}`);
    const product: Product = await response.json();

    return {
      props: {
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          description: product.description,
          image: product.image,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return { props: { product: null }, revalidate: 60 };
  }
}