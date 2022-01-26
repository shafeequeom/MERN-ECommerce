import AdminNav from "../../components/nav/AdminNav";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav></AdminNav>
        </div>
        <div className="col">
          <p>Admin Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
