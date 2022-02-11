import Jumbrotron from "../components/cards/Jumbrotron";
import NewArrivals from "../components/home/NewArrival";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubCategoryList from "../components/category/SubCategoryList";

const Home = () => {
  return (
    <div className="">
      <div className="jumbotron ">
        <h1 className="text-danger text-center font-weight-bold">
          <Jumbrotron text={["New Arrivals", "Best Settlers"]} />
        </h1>
      </div>
      <h4 className="text-center p-3 mt-5 display-4 jumbotron">New Arrivals</h4>
      <NewArrivals />
      <h4 className="text-center p-3 mt-5 display-4 jumbotron">Best Sellers</h4>
      <BestSellers />
      <h4 className="text-center p-3 mt-5 display-4 jumbotron">Categories</h4>
      <CategoryList />
      <h4 className="text-center p-3 mt-5 display-4 jumbotron">
        Sub Categories
      </h4>
      <SubCategoryList />
      <br />
    </div>
  );
};

export default Home;
