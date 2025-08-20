import CommonLayout from "./components/layouts/CommonLayout";
import { Outlet } from "react-router";
import ScrollToTop from "./utils/scrollToTop";
import LoadingLayout from "./components/layouts/LoadingLayout";

function App() {
  return (
    <>
      <CommonLayout>
        <ScrollToTop />
        <Outlet />
      </CommonLayout>
      <LoadingLayout />
    </>
  );
}

export default App;
