import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";

function Authenticated() {
  return (
    <div className="flex flex-col h-screen ">
      <Navbar />
      <div className="flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 ">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}

export default Authenticated;
