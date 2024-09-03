import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  return {
    ...params,
  };
}

const ProductsDetail = () => {
  const { id } = useLoaderData();
  return (
    <div>
      <h1>Product Detail - {id}</h1>
      <h2>Display your product detail here</h2>
    </div>
  );
};

export default ProductsDetail;
