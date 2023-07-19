import Products from "@/components/Products/Products";

export default function CategoryPage(props) {
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
      
      const products = [
        ...menData.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          category: item.category,
          image: item.image,
        })),
        ...womenData.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          category: item.category,
          image: item.image,
        })),
      ];
   return {
        props: {
          products,
        },
      };
  }
