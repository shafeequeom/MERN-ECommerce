import { Card } from "antd";
import defaultImage from "../../images/default.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;
const AdminProductCard = ({ product }) => {
  const { title, description, images } = product;
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
        <EditOutlined className="text-warning" />,
        <DeleteOutlined className="text-danger" />,
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

export default AdminProductCard;
