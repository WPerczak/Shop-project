import React from 'react';
import Products from '@/components/Products/Products';

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

export async function getStaticProps() {
  const response = await fetch(`https://fakestoreapi.com/products/category/men's%20clothing`);
  const response2 = await fetch(`https://fakestoreapi.com/products/category/women's%20clothing`);
  const menData = await response.json();
  const womenData = await response2.json();

  const products: Product[] = [
    ...menData.map((item: Product) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    })),
    ...womenData.map((item: Product) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    })),
  ];

  return {
    props: {
      products,
    },
  };
}