import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SginupPage from "./pages/SginupPage.jsx";
import AddPost from "./pages/AddPost.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Profail from "./pages/Profail.jsx";
import CreateProfail from "./pages/CreateProfail.jsx";
import EditeProfail from "./pages/EaditeProfail.jsx";
import UserProfai from "./pages/UserProfail.jsx";
import Friend from "./pages/Friend.jsx";
import AllFriends from "./pages/AllFriends.jsx";
import Message from "./pages/Message.jsx";
import ShowMessage from "./pages/ShowMessage.jsx";
import PostPage from "./pages/PostPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />,
          </AuthLayout>
        ),
      },
      {
        path: "/sginup",
        element: (
          <AuthLayout authentication={false}>
            <SginupPage />,
          </AuthLayout>
        ),
      },
      {
        path: "/createpost",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/profail",
        element: (
          <AuthLayout authentication>
            <Profail />
          </AuthLayout>
        ),
      },
      {
        path: "/profail/createprofail",
        element: (
          <AuthLayout authentication>
            <CreateProfail />
          </AuthLayout>
        ),
      },
      {
        path: "/profail/Eadite",
        element: (
          <AuthLayout authentication>
            <EditeProfail />
          </AuthLayout>
        ),
      },
      {
        path: "/profails/:userID",
        element: (
          <AuthLayout authentication>
            <UserProfai />
          </AuthLayout>
        ),
      },
      {
        path: "/friends",
        element: (
          <AuthLayout authentication>
            <Friend />
          </AuthLayout>
        ),
      },
      {
        path: "/profail/allfriends",
        element: (
          <AuthLayout authentication>
            <AllFriends />
          </AuthLayout>
        ),
      },
      {
        path: "/message",
        element: (
          <AuthLayout authentication>
            <Message />
          </AuthLayout>
        ),
      },
      {
        path: "/message/:ID",
        element: (
          <AuthLayout authentication>
            <ShowMessage />
          </AuthLayout>
        ),
      },
      {
        path: "/post",
        element: (
          <AuthLayout authentication>
            <PostPage />
          </AuthLayout>
        ),
      },
      {
        path: "/blog",
        element: (
          <AuthLayout authentication>
            <BlogPage />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
