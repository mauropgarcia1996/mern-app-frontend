import Layout from "../layout";
import { NextPageWithLayout } from "../_app";
import AuthenticationContainer from "./components/Authentication";

const Index: NextPageWithLayout = () => {
  return (
    <>
      <AuthenticationContainer />
    </>
  );
};

Index.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <div>
      <h3>new layout</h3>
      {page}
    </div>
  );
};

export default Index;
