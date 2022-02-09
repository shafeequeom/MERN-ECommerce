import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import { getProduct } from "../functions/product";

export const Product = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});

  const { slug } = useParams();
  const loadProduct = () => {
    setLoading(true);
    getProduct(slug)
      .then((res) => {
        setLoading(false);
        let data = res.data;
        setProduct(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div className="container-fluid p-4">
      <SingleProduct product={product}></SingleProduct>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          Related Products
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
