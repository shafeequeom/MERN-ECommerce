import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  return <div>{JSON.stringify(product)}</div>;
};
