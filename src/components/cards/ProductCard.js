import { Card } from "antd";
import defaultImage from "../../images/default.png";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;
const ProductCard = ({ product }) => {
  const { title, description, images, slug, price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <p className="text-center p-2">No rating yet</p>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : defaultImage}
            alt={title}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-2"
          />
        }
        actions={[
          <Link to={`/products/${slug}`}>
            <EyeOutlined className="text-warning" />
            <br />
            View Product
          </Link>,
          <>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
          </>,
        ]}
      >
        EditOul
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}..`}
        ></Meta>
      </Card>
    </>
  );
};

export default ProductCard;
