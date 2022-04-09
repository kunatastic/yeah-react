import { useRoutes } from "raviger";
import App from "../App";
import About from "../components/pages/About";
import Container from "../components/common/Container";
import Form from "../components/pages/Form";
import List from "../components/pages/List";
import Preview from "../components/pages/Preview";
import Result from "../components/pages/Result";

const routes = {
  "/": () => <App />,
  "/about": () => <About />,
  "/list": () => <List />,
  "/form/:formId": ({ formId }: { formId: string }) => <Form formId={formId} />,
  "/result/:formId": ({ formId }: { formId: string }) => <Result formId={formId} />,
  "/form-do-not-exist": () => <>Form does not exist or locked</>,
  "/preview/:formId": ({ formId }: { formId: string }) => <Preview formId={formId} />,
};

function AppRouter() {
  let routeResult = useRoutes(routes);
  return <Container>{routeResult}</Container>;
}

export default AppRouter;
