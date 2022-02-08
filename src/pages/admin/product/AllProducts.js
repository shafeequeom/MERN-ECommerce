import { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { getProductsByCount } from "../../../functions/product";

const AdminDashboard = () => {
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav></AdminNav>
        </div>
        <div className="col">
          {loading ? (
            <h3 className="text-danger">Loading</h3>
          ) : (
            <h3>All Products</h3>
          )}

          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 pb-3" key={product._id}>
                <AdminProductCard product={product}></AdminProductCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
