import { Outlet } from "react-router-dom";
import Header from "../Header.jsx";

function RootLayout() {
  return (
    <div className="container">
      <Header />
      <div className="container-view">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
