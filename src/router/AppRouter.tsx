import { useRoutes } from "raviger";
import App from "../App";
import About from "../components/About";
import Container from "../components/Container";
import Form from "../components/Form";
import List from "../components/List";
import Result from "../components/Result";

const routes = {
  "/": () => <App />,
  "/about": () => <About />,
  "/list": () => <List />,
  "/form/:formId": ({ formId }: { formId: string }) => <Form formId={formId} />,
  "/result/:formId": ({ formId }: { formId: string }) => <Result formId={formId} />,
  "/form-do-not-exist": () => <>Form does not exist or locked</>,
  "/preview/:formId": ({ formId }: { formId: string }) => <>Preview Form {formId}</>,
};

function AppRouter() {
  let routeResult = useRoutes(routes);
  return <Container>{routeResult}</Container>;
}

export default AppRouter;
