import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import HomePage, { loader as homePageLoader } from "./pages/HomePage.jsx";
import DetailPage, { loader as detailPageLoader } from "./pages/DetailPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homePageLoader,
        errorElement: <ErrorPage />,
        id: "home",
      },
      {
        path: "detail/:id",
        element: <DetailPage />,
        loader: detailPageLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
