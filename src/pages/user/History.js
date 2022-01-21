import UserNav from "../../components/nav/UserNav";

const History = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav></UserNav>
        </div>
        <div className="col">User History</div>
      </div>
    </div>
  );
};

export default History;
