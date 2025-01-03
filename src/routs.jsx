// import AuthLayout from "./components/AuthLayout";
// import Home from "./pages/Home";
// import LoginPage from "./pages/LoginPage";
// import SginupPage from "./pages/SginupPage";
// import Profail from "./pages/Profail";
// import ProfailVideosPage from "./pages/profail-pages/ProfailVideosPage";
// import ProfailBlogsPage from "./pages/profail-pages/ProfailBlogsPage";
// import Message from "./pages/Message";
// import MessageSendOutLet from "./pages/messageSendOutlet/MessageSendOutLet";
// import PostPage from "./pages/PostPage";
// import BlogPage from "./pages/BlogPage";
// import UplodBlogPage from "./pages/UplodBlogPage";
// import VideoPage from "./pages/VideoPage";
// import NotificationPage from "./pages/NotificationPage";
// import SearchPage from "./pages/SearchPage";
// import VideoChart from "./pages/videoAnalyzePage/VideoChart";
// import BusinessHome from "./pages/BussinessPage/Home";
// import BusinessLoginPage from "./pages/BussinessPage/BusinessLoginPage.jsx";
// import BusinessSginupPage from "./pages/BussinessPage/BusinessSginupPage.jsx";
// import { BusinessAuthLayout } from "./bussinessComponents/index.js";

// // Regular user routes
// export const regularUserRoutes = [
//   {
//     path: "/",
//     element: (
//       <AuthLayout authentication>
//         <Home />
//       </AuthLayout>
//     ),
//   },
//   {
//     path: "/login",
//     element: (
//       <AuthLayout authentication={false}>
//         <LoginPage />
//       </AuthLayout>
//     ),
//   },
//   {
//     path: "/sginup",
//     element: (
//       <AuthLayout authentication={false}>
//         <SginupPage />
//       </AuthLayout>
//     ),
//   },
//   {
//     path: "/profail/:id",
//     element: (
//       <AuthLayout authentication>
//         <Profail />
//       </AuthLayout>
//     ),
//     children: [
//       {
//         path: "videos",
//         element: <ProfailVideosPage />,
//       },
//       {
//         path: "blogs",
//         element: <ProfailBlogsPage />,
//       },
//     ],
//   },
//   {
//     path: "/message",
//     element: (
//       <AuthLayout authentication>
//         <Message />
//       </AuthLayout>
//     ),
//   },
//   {
//     path: "/message-send/:id",
//     element: (
//       <AuthLayout authentication>
//         <MessageSendOutLet />
//       </AuthLayout>
//     ),
//   },
//   {
//     path: "/post",
//     element: (
//       <AuthLayout authentication>
//         <PostPage />
//       </AuthLayout>
//     ),
//   },
//   {
//     path: "/blog",
//     element: (
//       <AuthLayout authentication>
//         <BlogPage />
//       </AuthLayout>
//     ),
//   },
//   {
//     path: "/uplod-blog",
//     element: (
//       <AuthLayout authentication>
//         <UplodBlogPage />
//       </AuthLayout>
//     ),
//   },
//   {
//     path: "/uplod-video",
//     element: (
//       <AuthLayout authentication>
//         <VideoPage />
//       </AuthLayout>
//     ),
//   },
//   {
//     path: "/notification",
//     element: (
//       <AuthLayout authentication>
//         <NotificationPage />
//       </AuthLayout>
//     ),
//   },
//   {
//     path: "/explor",
//     element: (
//       <AuthLayout authentication>
//         <SearchPage />
//       </AuthLayout>
//     ),
//   },
//   {
//     path: "/video-analytice/:videoId",
//     element: (
//       <AuthLayout authentication>
//         <VideoChart />
//       </AuthLayout>
//     ),
//   },
// ];

// // Business user routes
// export const businessUserRoutes = [
//   {
//     path: "/business",
//     element: (
//* <BusinessAuthLayout authentication>
//         <BusinessHome />
//       </BusinessAuthLayout>
//     ),
//   },
//   {
//     path: "/business/sginup",
//     element: (
//       <BusinessAuthLayout authentication={false}>
//         <BusinessSginupPage />
//       </BusinessAuthLayout>
//     ),
//   },
//   {
//     path: "/business/login",
//     element: (
//       <BusinessAuthLayout authentication={false}>
//         <BusinessLoginPage />
//       </BusinessAuthLayout>
//     ),
//   },
// ];
