import { Card, Tabs } from "antd";
// import { Link } from "react-router-dom";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import defaultImage from "../../images/default.png";
import ProductItems from "./ProductItems";

const { Meta } = Card;
const { TabPane } = Tabs;
const SingleProduct = ({ product }) => {
  const { title, description, images } = product;
  return (
    <div className="row">
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel>
            {images.map((img) => (
              <div key={img.public_id}>
                <img src={img.url} alt={`${title}_${img.public_id}`} />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="card-image">
            <img src={defaultImage} />
          </div>
        )}
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More Info" key="2">
            Please contact the shipper or owner for more info in mail@info.com
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" />
              <br />
              Add to Cart
            </>,
            <>
              <HeartOutlined className="text-warning" />
              <br />
              Add to Cart
            </>,
          ]}
        >
          <Meta title={title} description={description}></Meta>
          <ProductItems product={product}></ProductItems>
        </Card>
      </div>
    </div>
  );
};

export default SingleProduct;
