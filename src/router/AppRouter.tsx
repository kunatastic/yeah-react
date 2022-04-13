import { useRoutes } from "raviger";
import About from "../components/pages/About";
import Container from "../components/common/Container";
import Form from "../components/pages/Form";
import List from "../components/pages/List";
import Preview from "../components/pages/Preview";
import Result from "../components/pages/Result";
import Login from "../components/pages/Login";
import { UserType } from "../types/UserTypes";
import Home from "../components/pages/Home";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/about": () => <About />,
  "/list": () => <List />,
  "/form/:formId": ({ formId }: { formId: string }) => <Form formId={formId} />,
  "/result/:formId": ({ formId }: { formId: string }) => <Result formId={formId} />,
  "/form-do-not-exist": () => <>Form does not exist or locked</>,
  "/preview/:formId": ({ formId }: { formId: string }) => <Preview formId={formId} />,
};

function AppRouter(props: { currentUser: UserType }) {
  const { currentUser } = props;
  let routeResult = useRoutes(routes);
  return <Container currentUser={currentUser}>{routeResult}</Container>;
}

export default AppRouter;
