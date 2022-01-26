import { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  addCategory,
  getCategoriesLit,
  removeCategory,
} from "../../../functions/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategoriesLit().then((res) => setCategories(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    addCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        loadCategories();
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
        else toast.error("Error creating category");
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          loadCategories();
          toast.success(`${res.data.name} deleted`);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const categoryForm = () => (
    <form>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          autoFocus
          required
        />
        <br />
        <button className="btn btn-outline-primary" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav></AdminNav>
        </div>
        <div className="col">
          {loading ? (
            <p className="text-danger">Loading</p>
          ) : (
            <p>Create category</p>
          )}
          {categoryForm()}
          <br />
          {categories.map((category) => {
            return (
              <div className="alert alert-secondary" key={category._id}>
                {category.name}
                <span
                  onClick={() => {
                    handleRemove(category.slug);
                  }}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/category/${category.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
