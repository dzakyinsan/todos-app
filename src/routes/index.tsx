import { RouteConfig } from "react-router-config";
import { AccessValidator } from "../components/AccessValidator";
import Layouts from "../components/Layout";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Todo from "./Todo";
export interface MainRouteConfig extends Omit<RouteConfig, "routes"> {
  meta?: any;
  routes?: MainRouteConfig[] | undefined;
}

const routes = () => {
  return [
    {
      component: Layouts,
      routes: [
        {
          path: "/",
          exact: true,
          render: () => (
            <AccessValidator>
              <Dashboard />
            </AccessValidator>
          ),
        },
        {
          path: "/todo",
          exact: true,
          render: () => (
            <AccessValidator>
              <Todo />
            </AccessValidator>
          ),
        },
        {
          path: "/login",
          exact: true,
          component: Login,
        },
      ] as MainRouteConfig[],
    },
  ];
};

export default routes;
