import { Button } from "antd";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProductCardInCart from "../components/cards/ProductCardInCart";
import { userCart } from "../functions/user";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((a, b) => a + b.price * b.count, 0);
  };

  const gotoLogin = () => {
    navigate("/login", { state: { from: `/cart` } });
  };

  const saveOrderToDB = () => {
    userCart(user.token, { cart })
      .then((res) => {
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showCartItems = () => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Quantity</th>
            <th scope="col">Shipping</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((p) => (
            <ProductCardInCart key={p._id} product={p}></ProductCardInCart>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row p-4">
        <h4>Cart</h4>
      </div>
      <div className="row">
        <div className="col-md-8">
          {cart.length ? (
            <div>{showCartItems()}</div>
          ) : (
            <p>
              No products in cart. <Link to="/shop">Continue shopping</Link>{" "}
            </p>
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          Total: <b>${getTotal()}</b>
          {user ? (
            <Button
              onClick={saveOrderToDB}
              type="primary"
              block
              className="mt-2"
              disabled={!cart.length}
            >
              Proceed to Checkout
            </Button>
          ) : (
            <Button danger block onClick={gotoLogin}>
              Login to Checkout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
