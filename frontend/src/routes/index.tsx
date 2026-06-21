import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  ProjectsPage,
  ProjectDetailsPage,
  ProfilePage,
} from '@/pages';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute component={DashboardPage} />,
  },
  {
    path: '/projects',
    element: <ProtectedRoute component={ProjectsPage} />,
  },
  {
    path: '/projects/:projectId',
    element: <ProtectedRoute component={ProjectDetailsPage} />,
  },
  {
    path: '/profile',
    element: <ProtectedRoute component={ProfilePage} />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];
