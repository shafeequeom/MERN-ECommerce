import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserCart, emptyCart, saveAddress } from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    if (user)
      getUserCart(user.token)
        .then((res) => {
          setProducts(res.data.products);
          setTotal(res.data.cartTotal);
        })
        .catch((err) => console.log(err));
  }, [user]);

  const handleSaveAddress = () => {
    saveAddress(user.token)
      .then((res) => {
        if (res && res.data.ok) {
          toast.success("Address Saved");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEmptyCart = () => {
    //
    if (typeof window != "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch({ type: "ADD_TO_CART", payload: [] });

    emptyCart(user.token)
      .then((res) => {
        if (res) {
          setProducts([]);
          setTotal(0);
          toast.success("Cart is empty, Continue shopping");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid mt-4">
      <div className="row p-4">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <br />
          <br />
          <div className="row p-4">
            <ReactQuill
              style={{ width: "100%" }}
              value={address}
              onChange={(e) => setAddress(e)}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleSaveAddress}>
            Save
          </button>
          <hr />
          <h4>Got coupons</h4>
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          <hr />
          {products.map((p) => (
            <div key={p._id}>
              <p>
                {p.product.title} {p.color} x {p.count} = $
                {p.product.price * p.count}
              </p>
            </div>
          ))}
          <p>
            Cart Total: <b>${total}</b>{" "}
          </p>
          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-primary mt-2"
                disabled={!address || !products.length}
              >
                Place Order
              </button>
            </div>
            <div className="col-md-6">
              <button
                onClick={handleEmptyCart}
                className="btn btn-primary mt-2"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
