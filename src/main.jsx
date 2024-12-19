import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
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
import VideoPage from "./pages/VideoPage.jsx";
import UplodBlogPage from "./pages/UplodBlogPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import ProfailVideosPage from "./pages/profail-pages/ProfailVideosPage.jsx";
import ProfailBlogsPage from "./pages/profail-pages/ProfailBlogsPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import MessageSendOutLet from "./pages/messageSendOutlet/MessageSendOutLet.jsx";
import VideoChart from "./pages/videoAnalyzePage/VideoChart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication>
            <Home />
          </AuthLayout>
        ),
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
        path: "/profail/:id",
        element: (
          <AuthLayout authentication>
            <Profail />
          </AuthLayout>
        ),
        children: [
          {
            path: "/profail/:id",
            element: (
              <AuthLayout authentication>
                <ProfailVideosPage />
              </AuthLayout>
            ),
          },
          {
            path: "profail/blog/:id",
            element: (
              <AuthLayout authentication>
                <ProfailBlogsPage />
              </AuthLayout>
            ),
          },
        ],
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
        path: "/message-send/:id",
        element: (
          <AuthLayout authentication>
            <MessageSendOutLet />
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
      {
        path: "/uplod-blog",
        element: (
          <AuthLayout authentication>
            <UplodBlogPage />
          </AuthLayout>
        ),
      },
      {
        path: "/uplod-video",
        element: (
          <AuthLayout authentication>
            <VideoPage />
          </AuthLayout>
        ),
      },
      {
        path: "/notification",
        element: (
          <AuthLayout authentication>
            <NotificationPage />
          </AuthLayout>
        ),
      },
      {
        path: "/explor",
        element: (
          <AuthLayout authentication>
            <SearchPage />
          </AuthLayout>
        ),
      },
      {
        path: "/video-analytice/:videoId",
        element: (
          <AuthLayout authentication>
            <VideoChart />
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
