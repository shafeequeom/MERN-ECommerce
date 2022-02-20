import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserNav from "../../components/nav/UserNav";
import { getWishList, removeFromWishlist } from "../../functions/user";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishList();
  }, []);

  const loadWishList = () => {
    getWishList(user.token).then((res) => {
      setWishlist(res.data);
    });
  };

  const handleRemoveWishList = (productId) => {
    getWishList(user.token, productId).then((res) => {
      loadWishList();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav></UserNav>
        </div>
        <div className="col">
          {wishlist.map((w) => (
            <div key={w._id} className="alert alert-secondary">
              <Link to={`product/${w.slug}`}>{w.title}</Link>
              <DeleteOutlined
                className="text-danger"
                onClick={() => handleRemoveWishList(w._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
