import Body from "../Body/Body";
import Login from "../user/Login/Login";
import Register from "../user/Register/Register";

export const myRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
