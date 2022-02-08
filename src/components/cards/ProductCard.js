import { Card } from "antd";
import defaultImage from "../../images/default.png";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;
const ProductCard = ({ product }) => {
  const { title, description, images, slug } = product;
  return (
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
        title={title}
        description={`${description && description.substring(0, 40)}..`}
      ></Meta>
    </Card>
  );
};

export default ProductCard;
