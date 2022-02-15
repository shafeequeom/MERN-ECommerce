import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsByCount, getProductsByFilter } from "../functions/product";
import { getCategoriesList } from "../functions/category";
import ProductCard from "../components/cards/ProductCard";
import { Collapse, Slider, Checkbox } from "antd";
import ReactStars from "react-rating-stars-component";
import {
  DollarOutlined,
  CheckSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const Shop = () => {
  let dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryCheck, setCategoryCheck] = useState([]);
  const [star, setStar] = useState(0);

  const { search } = useSelector((state) => ({ ...state }));

  const { text } = search;

  //Load pages on default
  useEffect(() => {
    loadAllProducts();
    loadCategories();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const loadCategories = () => {
    getCategoriesList().then((res) => setCategories(res.data));
  };

  const searchProducts = (form) => {
    setLoading(true);
    getProductsByFilter(form).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  //2. Load Products on user search
  useEffect(() => {
    const delayed = setTimeout(() => {
      searchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    searchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setCategoryCheck([]);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //4. Categories based filter

  const showCategories = () => {
    return (
      <Checkbox.Group value={categoryCheck} onChange={handleCategoryChange}>
        {categories.map((c) => (
          <div className="row pl-3" key={c._id}>
            <Checkbox value={c._id} name="category">
              {c.name}
            </Checkbox>
          </div>
        ))}
      </Checkbox.Group>
    );
  };

  const handleCategoryChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryCheck(e);
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      searchProducts({ category: categoryCheck });
    }, 300);
    return () => clearTimeout(delayed);
  }, [categoryCheck]);

  //4. Rating

  useEffect(() => {
    const delayed = setTimeout(() => {
      searchProducts({ star: star });
    }, 300);
    return () => clearTimeout(delayed);
  }, [star]);

  const handleRating = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryCheck([]);
    setStar(e);
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-3 pt-3">
          <h4>Search / Filter</h4>
          <Collapse defaultActiveKey={["1", "2"]}>
            <Panel
              key="1"
              header={
                <>
                  <DollarOutlined className="mt-1 mr-2" /> Price
                </>
              }
            >
              <>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={(v) => handleSlider(v)}
                  max="4999"
                />
              </>
            </Panel>
            <Panel
              key="2"
              header={
                <>
                  <CheckSquareOutlined className="mt-1 mr-2" /> Category
                </>
              }
            >
              <>{showCategories()}</>
            </Panel>
            <Panel
              key="3"
              header={
                <>
                  <StarOutlined className="mt-1 mr-2" /> Rating
                </>
              }
            >
              <>
                <div className="d-flex justify-content-center align-items-center">
                  <span>
                    <ReactStars
                      count={5}
                      size={50}
                      onChange={handleRating}
                      isHalf={true}
                      value={star}
                      activeColor="#ffd700"
                    />
                  </span>
                  <p className="pt-3 ml-3">({star})</p>
                </div>
              </>
            </Panel>
          </Collapse>
        </div>
        <div className="col-md-9 pt-3">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          {products.length === 0 && <h3>No Products found</h3>}
          <div className="row pb-5">
            {products.map((p) => (
              <div className="col-md-4 mt-3" key={p._id}>
                <ProductCard product={p}></ProductCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
