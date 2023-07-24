import React from 'react';
import { RouteConfig } from 'react-router-config';
import Loadable from '@loadable/component';
import Layout from '../components/Layout';

import loader from '../core/loader';
import { Home } from './Home';

export interface MainRouteConfig extends Omit<RouteConfig, 'routes'> {
    meta?: any;
    routes?: MainRouteConfig[] | undefined;
  }

// ================== Home ======================================= //
// const Home = Loadable(() => loader(import('./Home')) as any);

const titleTemplate = 'Test';

const routes = () => {
  console.log('routes');
  
  return [
    {
      component: Layout,
      routes: [
        {
            path: '/',
            exact: true,
            component: Home
            // render: (routeProps: any) => <Home {...routeProps} />,
            // meta: {
            //   title: `Home ${titleTemplate}`,
            //   description: {
            //     content: 'Home page',
            //   },
            // },
          },
        ] as MainRouteConfig[],
    },
  ];
};

export default routes;
