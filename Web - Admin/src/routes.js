import React from 'react';

const Dashboard = React.lazy(() => import('./views/pages/Dashboard/Dashboard'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Users = React.lazy(() => import('./views/pages/Users/Users'));
const Rides = React.lazy(() => import('./views/pages/Rides/Rides'));
const Map = React.lazy(() => import('./views/pages/Map/GenralMap'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/rides', exact: true, name: 'Rides', component: Rides },
  { path: '/login', exact: true, name: 'Logout', component: Login },
  { path: '/location', exact: true, name: 'Map', component: Map },
];

export default routes;
