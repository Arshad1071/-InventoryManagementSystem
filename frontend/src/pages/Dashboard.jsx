import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import ProductTable from "../components/ProductTable";

function Dashboard() {
  return (
    <>

      <div className="dashboard">

        {/* <DashboardCard /> */}

        <ProductTable />

      </div>
    </>
  );
}

export default Dashboard;