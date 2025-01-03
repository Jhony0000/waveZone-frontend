// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import BusinessApp from "./BusinessApp.jsx";
// import "./App.css";
// import store from "./store/store.js";
// import businessStore from "./store/bussiness.store.js";
// import { Provider as RegularUserProvider } from "react-redux";
// import { Provider as BusinessUserProvider } from "react-redux";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// // Import your routes
// import { regularUserRoutes, businessUserRoutes } from "./routs.jsx";

// // Create routers
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//* <RegularUserProvider store={store}>
//         <App />
//       </RegularUserProvider>
//     ),
//     children: regularUserRoutes,
//   },
//   {
//     path: "/business",
//     element: (
//       <BusinessUserProvider store={businessStore}>
//         <BusinessApp />
//       </BusinessUserProvider>
//     ),
//     children: businessUserRoutes,
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// );

// this is main rouste

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { Navigate } from "react-router-dom";
import store from "./store/store.js";
import { Provider as RegularUserProvider } from "react-redux";
import { Provider as businessUserProvider } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SginupPage from "./pages/SginupPage.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Profail from "./pages/Profail.jsx";
import Message from "./pages/Message.jsx";
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
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/sginup",
        element: (
          <AuthLayout authentication={false}>
            <SginupPage />
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
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RegularUserProvider store={store}>
      <RouterProvider router={router} />
    </RegularUserProvider>
  </StrictMode>
);
