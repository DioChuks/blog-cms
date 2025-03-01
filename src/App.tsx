import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Home from "./pages/Home";
import Dashboard from "./routes/dashboard";
import Content from "./pages/Content";
import CreateContentRoute from "./routes/content-editor";
import CreateContentRouteTwo from "./routes/content-editor-alt";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "content",
        element: <Content />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/create-content",
    element: <CreateContentRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create-content-alt",
    element: <CreateContentRouteTwo />,
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;