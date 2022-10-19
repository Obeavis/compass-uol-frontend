import React, { FC, ComponentType } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "containers/Login";
import Home from "containers/Home";
interface AppProps {
  isLogged: boolean;
}
interface Props {
  component: ComponentType;
  isLogged: boolean;
}

const PrivateRoute: FC<Props> = ({ component: RouteComponent, isLogged }) => {
  if (isLogged) {
    return <RouteComponent />;
  }

  return <Navigate to="/login" replace />;
};

const RoutesApp: React.FunctionComponent<AppProps> = ({ isLogged }) => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="home"
          element={<PrivateRoute isLogged={isLogged} component={Home} />}
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default RoutesApp;
