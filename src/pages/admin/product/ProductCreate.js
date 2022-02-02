import { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { addProduct } from "../../../functions/product";
import {
  getCategoriesList,
  getCategorySubs,
} from "../../../functions/category";
import ProductForm from "../../../components/forms/ProductForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  categories: [],
  subCategories: [],
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
  const [subOptions, setSubOptions] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategoriesList().then((res) =>
      setValue({ ...value, categories: res.data })
    );
  };

  const loadSubCategories = (_id) => {
    console.log(_id);
    getCategorySubs(_id).then((res) => setSubOptions(res.data));
  };

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
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value.category);
    loadSubCategories(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav></AdminNav>
        </div>
        <div className="col">
          <h1>Product Create</h1>
          <ProductForm
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            handleSubmit={handleSubmit}
            setValue={setValue}
            value={value}
            subOptions={subOptions}
          ></ProductForm>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
