import { Outlet } from "react-router-dom";
import Layout from "../components/layout";

const MainLayout = () => {
  return (
    <Layout>
        <Outlet />
    </Layout>
  );
};

export default MainLayout;