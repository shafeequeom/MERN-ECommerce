import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProductsByCount, getProductsByFilter } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { search } = useSelector((state) => ({ ...state }));

  const { text } = search;

  //Load pages on default
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const searchProducts = () => {
    setLoading(true);
    getProductsByFilter({ query: text }).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  //Load Products on user search
  useEffect(() => {
    const delayed = setTimeout(() => {
      searchProducts();
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-3">Search</div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          {products.length === 0 && <h3>No Products found</h3>}
          <div className="row pb-5">
            {products.map((p) => (
              <div className="col-md-4 mt-3" key={p._id}>
                <ProductCard product={p}></ProductCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
