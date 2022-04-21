import { useRoutes } from "raviger";
import About from "../components/pages/About";
import Container from "../components/common/Container";
import Form from "../components/pages/Form";
import List from "../components/pages/List";
import Preview from "../components/pages/Preview";
import Result from "../components/pages/Result";
import Login from "../components/pages/Login";
import Home from "../components/pages/Home";
import ProtectRouteUtil from "../util/ProtectRouteUtil";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/about": () => <About />,
  "/list": () => <List />,
  "/form/:formId": ({ formId }: { formId: string }) => (
    <ProtectRouteUtil>
      <Form formId={formId} />
    </ProtectRouteUtil>
  ),
  "/result/:formId": ({ formId }: { formId: string }) => (
    <ProtectRouteUtil>
      <Result formId={formId} />
    </ProtectRouteUtil>
  ),
  "/form-do-not-exist": () => <>Form does not exist or locked</>,
  "/preview/:formId": ({ formId }: { formId: string }) => <Preview formId={formId} />,
};

function AppRouter() {
  let routeResult = useRoutes(routes);
  return <Container>{routeResult}</Container>;
}

export default AppRouter;
