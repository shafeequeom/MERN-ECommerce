import { useEffect, useState } from "react";
import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Jumbrotron from "../components/cards/Jumbrotron";
import LoadingCard from "../components/cards/LoadingCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(10)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="">
      <div className="jumbotron ">
        <h1 className="text-danger text-center font-weight-bold">
          {loading ? (
            "Loading.."
          ) : (
            <Jumbrotron text={["New Arrivals", "Best Settlers"]} />
          )}
        </h1>
      </div>
      <div className="container">
        {!loading ? (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product}></ProductCard>
              </div>
            ))}
          </div>
        ) : (
          <LoadingCard count={3} />
        )}
      </div>
    </div>
  );
};

export default Home;
