import { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { addProduct } from "../../../functions/product";
const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  categories: [],
  subCategory: [],
  shipping: "Yes",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "White",
  brand: "Apple",
};

const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [value, setValue] = useState(initialState);

  const {
    title,
    description,
    price,
    categories,
    category,
    subCategory,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = value;

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(value, user.token)
      .then((res) => {
        toast.success(`${res.data.title} created successfully`);
        setValue(initialState);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data.err);
        else toast.error("Error creating product");
      });
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav></AdminNav>
        </div>
        <div className="col">
          <h1>Product Create</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Shipping</label>
              <select
                name="shipping"
                className="form-control"
                value={shipping}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Color</label>
              <select
                name="color"
                className="form-control"
                value={color}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {colors.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Brand</label>
              <select
                name="brand"
                className="form-control"
                value={brand}
                onChange={handleChange}
              >
                <option value="">Please Select</option>
                {brands.map((b) => (
                  <option value={b} key={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-outline-info">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
