import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=111faae4";
const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=111faae4";
const StrictMode = __vite__cjsImport1_react["StrictMode"];
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=111faae4";
const createRoot = __vite__cjsImport2_reactDom_client["createRoot"];
import App from "/src/App.jsx";
import "/src/App.css";
import store from "/src/store/store.js";
import { Provider } from "/node_modules/.vite/deps/react-redux.js?v=111faae4";
import {
  createBrowserRouter,
  RouterProvider,
} from "/node_modules/.vite/deps/react-router-dom.js?v=111faae4";
import Home from "/src/pages/Home.jsx";
import LoginPage from "/src/pages/LoginPage.jsx";
import SginupPage from "/src/pages/SginupPage.jsx";
import AddPost from "/src/pages/AddPost.jsx";
import AuthLayout from "/src/components/AuthLayout.jsx";
import Profail from "/src/pages/Profail.jsx";
import CreateProfail from "/src/pages/CreateProfail.jsx";
import EditeProfail from "/src/pages/EaditeProfail.jsx";
import UserProfai from "/src/pages/UserProfail.jsx";
import Friend from "/src/pages/Friend.jsx";
import AllFriends from "/src/pages/AllFriends.jsx";
import Message from "/src/pages/Message.jsx";
import ShowMessage from "/src/pages/ShowMessage.jsx";
import PostPage from "/src/pages/PostPage.jsx";
import VideoPage from "/src/pages/VideoPage.jsx";
import UplodBlogPage from "/src/pages/UplodBlogPage.jsx";
import BlogPage from "/src/pages/BlogPage.jsx";
import ProfailVideosPage from "/src/pages/profail-pages/ProfailVideosPage.jsx";
import ProfailBlogsPage from "/src/pages/profail-pages/ProfailBlogsPage.jsx";
import NotificationPage from "/src/pages/NotificationPage.jsx";
import SearchPage from "/src/pages/SearchPage.jsx";
import MessageSendOutLet from "/src/pages/messageSendOutlet/MessageSendOutLet.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: /* @__PURE__ */ jsxDEV(
      App,
      {},
      void 0,
      false,
      {
        fileName: "F:/App/Production-App/Frontent/src/main.jsx",
        lineNumber: 34,
        columnNumber: 12,
      },
      this
    ),
    children: [
      {
        path: "/",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              Home,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 40,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 39,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/login",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: false,
            children: [
              /* @__PURE__ */ jsxDEV(
                LoginPage,
                {},
                void 0,
                false,
                {
                  fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                  lineNumber: 48,
                  columnNumber: 13,
                },
                this
              ),
              ",",
            ],
          },
          void 0,
          true,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 47,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/sginup",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: false,
            children: [
              /* @__PURE__ */ jsxDEV(
                SginupPage,
                {},
                void 0,
                false,
                {
                  fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                  lineNumber: 56,
                  columnNumber: 13,
                },
                this
              ),
              ",",
            ],
          },
          void 0,
          true,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 55,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/createpost",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              AddPost,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 64,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 63,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/profail",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              Profail,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 72,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 71,
            columnNumber: 5,
          },
          this
        ),
        children: [
          {
            path: "/profail",
            element: /* @__PURE__ */ jsxDEV(
              AuthLayout,
              {
                authentication: true,
                children: /* @__PURE__ */ jsxDEV(
                  ProfailVideosPage,
                  {},
                  void 0,
                  false,
                  {
                    fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                    lineNumber: 80,
                    columnNumber: 17,
                  },
                  this
                ),
              },
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 79,
                columnNumber: 7,
              },
              this
            ),
          },
          {
            path: "/profail/Blogs",
            element: /* @__PURE__ */ jsxDEV(
              AuthLayout,
              {
                authentication: true,
                children: /* @__PURE__ */ jsxDEV(
                  ProfailBlogsPage,
                  {},
                  void 0,
                  false,
                  {
                    fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                    lineNumber: 88,
                    columnNumber: 17,
                  },
                  this
                ),
              },
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 87,
                columnNumber: 7,
              },
              this
            ),
          },
        ],
      },
      {
        path: "/profail/createprofail",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              CreateProfail,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 98,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 97,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/profail/Eadite",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              EditeProfail,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 106,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 105,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/profails/:userID",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              UserProfai,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 114,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 113,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/friends",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              Friend,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 122,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 121,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/profail/allfriends",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              AllFriends,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 130,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 129,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/message",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              Message,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 138,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 137,
            columnNumber: 5,
          },
          this
        ),
        children: [
          {
            path: "/message/profail/:id",
            element: /* @__PURE__ */ jsxDEV(
              AuthLayout,
              {
                authentication: true,
                children: /* @__PURE__ */ jsxDEV(
                  MessageSendOutLet,
                  {},
                  void 0,
                  false,
                  {
                    fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                    lineNumber: 146,
                    columnNumber: 17,
                  },
                  this
                ),
              },
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 145,
                columnNumber: 7,
              },
              this
            ),
          },
        ],
      },
      {
        path: "/message/:ID",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              ShowMessage,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 156,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 155,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/post",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              PostPage,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 164,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 163,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/blog",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              BlogPage,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 172,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 171,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/uplod-blog",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              UplodBlogPage,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 180,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 179,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/uplod-video",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              VideoPage,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 188,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 187,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/notification",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              NotificationPage,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 196,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 195,
            columnNumber: 5,
          },
          this
        ),
      },
      {
        path: "/explor",
        element: /* @__PURE__ */ jsxDEV(
          AuthLayout,
          {
            authentication: true,
            children: /* @__PURE__ */ jsxDEV(
              SearchPage,
              {},
              void 0,
              false,
              {
                fileName: "F:/App/Production-App/Frontent/src/main.jsx",
                lineNumber: 204,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: "F:/App/Production-App/Frontent/src/main.jsx",
            lineNumber: 203,
            columnNumber: 5,
          },
          this
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(
    StrictMode,
    {
      children: /* @__PURE__ */ jsxDEV(
        Provider,
        {
          store,
          children: /* @__PURE__ */ jsxDEV(
            RouterProvider,
            { router },
            void 0,
            false,
            {
              fileName: "F:/App/Production-App/Frontent/src/main.jsx",
              lineNumber: 215,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName: "F:/App/Production-App/Frontent/src/main.jsx",
          lineNumber: 214,
          columnNumber: 5,
        },
        this
      ),
    },
    void 0,
    false,
    {
      fileName: "F:/App/Production-App/Frontent/src/main.jsx",
      lineNumber: 213,
      columnNumber: 3,
    },
    this
  )
);

//# sourceMappingURL=data:application/json;base64,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QUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFpQixLQURuQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsUUFFSjtBQUFBLFFBQ0E7QUFBQSxVQUNFRCxNQUFNO0FBQUEsVUFDTkMsU0FDRSx1QkFBQyxjQUFXLGdCQUFjLE1BQ3hCLGlDQUFDLGdCQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQVcsS0FEYjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsUUFFSjtBQUFBLE1BQUM7QUFBQSxJQUVMO0FBQUEsRUFBQztBQUNGO0FBRUQvQixXQUFXaUMsU0FBU0MsZUFBZSxNQUFNLENBQUMsRUFBRUM7QUFBQUEsRUFDMUMsdUJBQUMsY0FDQyxpQ0FBQyxZQUFTLE9BQ1IsaUNBQUMsa0JBQWUsVUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUErQixLQURqQztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBRUEsS0FIRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSUE7QUFDRiIsIm5hbWVzIjpbIlN0cmljdE1vZGUiLCJjcmVhdGVSb290IiwiQXBwIiwic3RvcmUiLCJQcm92aWRlciIsImNyZWF0ZUJyb3dzZXJSb3V0ZXIiLCJPdXRsZXQiLCJSb3V0ZXJQcm92aWRlciIsIkhvbWUiLCJMb2dpblBhZ2UiLCJTZ2ludXBQYWdlIiwiQWRkUG9zdCIsIkF1dGhMYXlvdXQiLCJQcm9mYWlsIiwiQ3JlYXRlUHJvZmFpbCIsIkVkaXRlUHJvZmFpbCIsIlVzZXJQcm9mYWkiLCJGcmllbmQiLCJBbGxGcmllbmRzIiwiTWVzc2FnZSIsIlNob3dNZXNzYWdlIiwiUG9zdFBhZ2UiLCJWaWRlb1BhZ2UiLCJVcGxvZEJsb2dQYWdlIiwiQmxvZ1BhZ2UiLCJQcm9mYWlsVmlkZW9zUGFnZSIsIlByb2ZhaWxCbG9nc1BhZ2UiLCJOb3RpZmljYXRpb25QYWdlIiwiU2VhcmNoUGFnZSIsIk1lc3NhZ2VTZW5kT3V0TGV0Iiwicm91dGVyIiwicGF0aCIsImVsZW1lbnQiLCJjaGlsZHJlbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsibWFpbi5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RyaWN0TW9kZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQgQXBwIGZyb20gXCIuL0FwcC5qc3hcIjtcbmltcG9ydCBcIi4vQXBwLmNzc1wiO1xuaW1wb3J0IHN0b3JlIGZyb20gXCIuL3N0b3JlL3N0b3JlLmpzXCI7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IHsgY3JlYXRlQnJvd3NlclJvdXRlciwgT3V0bGV0LCBSb3V0ZXJQcm92aWRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgSG9tZSBmcm9tIFwiLi9wYWdlcy9Ib21lLmpzeFwiO1xuaW1wb3J0IExvZ2luUGFnZSBmcm9tIFwiLi9wYWdlcy9Mb2dpblBhZ2UuanN4XCI7XG5pbXBvcnQgU2dpbnVwUGFnZSBmcm9tIFwiLi9wYWdlcy9TZ2ludXBQYWdlLmpzeFwiO1xuaW1wb3J0IEFkZFBvc3QgZnJvbSBcIi4vcGFnZXMvQWRkUG9zdC5qc3hcIjtcbmltcG9ydCBBdXRoTGF5b3V0IGZyb20gXCIuL2NvbXBvbmVudHMvQXV0aExheW91dC5qc3hcIjtcbmltcG9ydCBQcm9mYWlsIGZyb20gXCIuL3BhZ2VzL1Byb2ZhaWwuanN4XCI7XG5pbXBvcnQgQ3JlYXRlUHJvZmFpbCBmcm9tIFwiLi9wYWdlcy9DcmVhdGVQcm9mYWlsLmpzeFwiO1xuaW1wb3J0IEVkaXRlUHJvZmFpbCBmcm9tIFwiLi9wYWdlcy9FYWRpdGVQcm9mYWlsLmpzeFwiO1xuaW1wb3J0IFVzZXJQcm9mYWkgZnJvbSBcIi4vcGFnZXMvVXNlclByb2ZhaWwuanN4XCI7XG5pbXBvcnQgRnJpZW5kIGZyb20gXCIuL3BhZ2VzL0ZyaWVuZC5qc3hcIjtcbmltcG9ydCBBbGxGcmllbmRzIGZyb20gXCIuL3BhZ2VzL0FsbEZyaWVuZHMuanN4XCI7XG5pbXBvcnQgTWVzc2FnZSBmcm9tIFwiLi9wYWdlcy9NZXNzYWdlLmpzeFwiO1xuaW1wb3J0IFNob3dNZXNzYWdlIGZyb20gXCIuL3BhZ2VzL1Nob3dNZXNzYWdlLmpzeFwiO1xuaW1wb3J0IFBvc3RQYWdlIGZyb20gXCIuL3BhZ2VzL1Bvc3RQYWdlLmpzeFwiO1xuaW1wb3J0IFZpZGVvUGFnZSBmcm9tIFwiLi9wYWdlcy9WaWRlb1BhZ2UuanN4XCI7XG5pbXBvcnQgVXBsb2RCbG9nUGFnZSBmcm9tIFwiLi9wYWdlcy9VcGxvZEJsb2dQYWdlLmpzeFwiO1xuaW1wb3J0IEJsb2dQYWdlIGZyb20gXCIuL3BhZ2VzL0Jsb2dQYWdlLmpzeFwiO1xuaW1wb3J0IFByb2ZhaWxWaWRlb3NQYWdlIGZyb20gXCIuL3BhZ2VzL3Byb2ZhaWwtcGFnZXMvUHJvZmFpbFZpZGVvc1BhZ2UuanN4XCI7XG5pbXBvcnQgUHJvZmFpbEJsb2dzUGFnZSBmcm9tIFwiLi9wYWdlcy9wcm9mYWlsLXBhZ2VzL1Byb2ZhaWxCbG9nc1BhZ2UuanN4XCI7XG5pbXBvcnQgTm90aWZpY2F0aW9uUGFnZSBmcm9tIFwiLi9wYWdlcy9Ob3RpZmljYXRpb25QYWdlLmpzeFwiO1xuaW1wb3J0IFNlYXJjaFBhZ2UgZnJvbSBcIi4vcGFnZXMvU2VhcmNoUGFnZS5qc3hcIjtcbmltcG9ydCBNZXNzYWdlU2VuZE91dExldCBmcm9tIFwiLi9wYWdlcy9tZXNzYWdlU2VuZE91dGxldC9tZXNzYWdlU2VuZE91dExldC5qc3hcIjtcblxuY29uc3Qgcm91dGVyID0gY3JlYXRlQnJvd3NlclJvdXRlcihbXG4gIHtcbiAgICBwYXRoOiBcIi9cIixcbiAgICBlbGVtZW50OiA8QXBwIC8+LFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiL1wiLFxuICAgICAgICBlbGVtZW50OiAoXG4gICAgICAgICAgPEF1dGhMYXlvdXQgYXV0aGVudGljYXRpb24+XG4gICAgICAgICAgICA8SG9tZSAvPlxuICAgICAgICAgIDwvQXV0aExheW91dD5cbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiL2xvZ2luXCIsXG4gICAgICAgIGVsZW1lbnQ6IChcbiAgICAgICAgICA8QXV0aExheW91dCBhdXRoZW50aWNhdGlvbj17ZmFsc2V9PlxuICAgICAgICAgICAgPExvZ2luUGFnZSAvPixcbiAgICAgICAgICA8L0F1dGhMYXlvdXQ+XG4gICAgICAgICksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIi9zZ2ludXBcIixcbiAgICAgICAgZWxlbWVudDogKFxuICAgICAgICAgIDxBdXRoTGF5b3V0IGF1dGhlbnRpY2F0aW9uPXtmYWxzZX0+XG4gICAgICAgICAgICA8U2dpbnVwUGFnZSAvPixcbiAgICAgICAgICA8L0F1dGhMYXlvdXQ+XG4gICAgICAgICksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIi9jcmVhdGVwb3N0XCIsXG4gICAgICAgIGVsZW1lbnQ6IChcbiAgICAgICAgICA8QXV0aExheW91dCBhdXRoZW50aWNhdGlvbj5cbiAgICAgICAgICAgIDxBZGRQb3N0IC8+XG4gICAgICAgICAgPC9BdXRoTGF5b3V0PlxuICAgICAgICApLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvcHJvZmFpbFwiLFxuICAgICAgICBlbGVtZW50OiAoXG4gICAgICAgICAgPEF1dGhMYXlvdXQgYXV0aGVudGljYXRpb24+XG4gICAgICAgICAgICA8UHJvZmFpbCAvPlxuICAgICAgICAgIDwvQXV0aExheW91dD5cbiAgICAgICAgKSxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiBcIi9wcm9mYWlsXCIsXG4gICAgICAgICAgICBlbGVtZW50OiAoXG4gICAgICAgICAgICAgIDxBdXRoTGF5b3V0IGF1dGhlbnRpY2F0aW9uPlxuICAgICAgICAgICAgICAgIDxQcm9mYWlsVmlkZW9zUGFnZSAvPlxuICAgICAgICAgICAgICA8L0F1dGhMYXlvdXQ+XG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogXCIvcHJvZmFpbC9CbG9nc1wiLFxuICAgICAgICAgICAgZWxlbWVudDogKFxuICAgICAgICAgICAgICA8QXV0aExheW91dCBhdXRoZW50aWNhdGlvbj5cbiAgICAgICAgICAgICAgICA8UHJvZmFpbEJsb2dzUGFnZSAvPlxuICAgICAgICAgICAgICA8L0F1dGhMYXlvdXQ+XG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIi9wcm9mYWlsL2NyZWF0ZXByb2ZhaWxcIixcbiAgICAgICAgZWxlbWVudDogKFxuICAgICAgICAgIDxBdXRoTGF5b3V0IGF1dGhlbnRpY2F0aW9uPlxuICAgICAgICAgICAgPENyZWF0ZVByb2ZhaWwgLz5cbiAgICAgICAgICA8L0F1dGhMYXlvdXQ+XG4gICAgICAgICksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIi9wcm9mYWlsL0VhZGl0ZVwiLFxuICAgICAgICBlbGVtZW50OiAoXG4gICAgICAgICAgPEF1dGhMYXlvdXQgYXV0aGVudGljYXRpb24+XG4gICAgICAgICAgICA8RWRpdGVQcm9mYWlsIC8+XG4gICAgICAgICAgPC9BdXRoTGF5b3V0PlxuICAgICAgICApLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvcHJvZmFpbHMvOnVzZXJJRFwiLFxuICAgICAgICBlbGVtZW50OiAoXG4gICAgICAgICAgPEF1dGhMYXlvdXQgYXV0aGVudGljYXRpb24+XG4gICAgICAgICAgICA8VXNlclByb2ZhaSAvPlxuICAgICAgICAgIDwvQXV0aExheW91dD5cbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiL2ZyaWVuZHNcIixcbiAgICAgICAgZWxlbWVudDogKFxuICAgICAgICAgIDxBdXRoTGF5b3V0IGF1dGhlbnRpY2F0aW9uPlxuICAgICAgICAgICAgPEZyaWVuZCAvPlxuICAgICAgICAgIDwvQXV0aExheW91dD5cbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiL3Byb2ZhaWwvYWxsZnJpZW5kc1wiLFxuICAgICAgICBlbGVtZW50OiAoXG4gICAgICAgICAgPEF1dGhMYXlvdXQgYXV0aGVudGljYXRpb24+XG4gICAgICAgICAgICA8QWxsRnJpZW5kcyAvPlxuICAgICAgICAgIDwvQXV0aExheW91dD5cbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiL21lc3NhZ2VcIixcbiAgICAgICAgZWxlbWVudDogKFxuICAgICAgICAgIDxBdXRoTGF5b3V0IGF1dGhlbnRpY2F0aW9uPlxuICAgICAgICAgICAgPE1lc3NhZ2UgLz5cbiAgICAgICAgICA8L0F1dGhMYXlvdXQ+XG4gICAgICAgICksXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogXCIvbWVzc2FnZS9wcm9mYWlsLzppZFwiLFxuICAgICAgICAgICAgZWxlbWVudDogKFxuICAgICAgICAgICAgICA8QXV0aExheW91dCBhdXRoZW50aWNhdGlvbj5cbiAgICAgICAgICAgICAgICA8TWVzc2FnZVNlbmRPdXRMZXQgLz5cbiAgICAgICAgICAgICAgPC9BdXRoTGF5b3V0PlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvbWVzc2FnZS86SURcIixcbiAgICAgICAgZWxlbWVudDogKFxuICAgICAgICAgIDxBdXRoTGF5b3V0IGF1dGhlbnRpY2F0aW9uPlxuICAgICAgICAgICAgPFNob3dNZXNzYWdlIC8+XG4gICAgICAgICAgPC9BdXRoTGF5b3V0PlxuICAgICAgICApLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvcG9zdFwiLFxuICAgICAgICBlbGVtZW50OiAoXG4gICAgICAgICAgPEF1dGhMYXlvdXQgYXV0aGVudGljYXRpb24+XG4gICAgICAgICAgICA8UG9zdFBhZ2UgLz5cbiAgICAgICAgICA8L0F1dGhMYXlvdXQ+XG4gICAgICAgICksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIi9ibG9nXCIsXG4gICAgICAgIGVsZW1lbnQ6IChcbiAgICAgICAgICA8QXV0aExheW91dCBhdXRoZW50aWNhdGlvbj5cbiAgICAgICAgICAgIDxCbG9nUGFnZSAvPlxuICAgICAgICAgIDwvQXV0aExheW91dD5cbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFwiL3VwbG9kLWJsb2dcIixcbiAgICAgICAgZWxlbWVudDogKFxuICAgICAgICAgIDxBdXRoTGF5b3V0IGF1dGhlbnRpY2F0aW9uPlxuICAgICAgICAgICAgPFVwbG9kQmxvZ1BhZ2UgLz5cbiAgICAgICAgICA8L0F1dGhMYXlvdXQ+XG4gICAgICAgICksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiBcIi91cGxvZC12aWRlb1wiLFxuICAgICAgICBlbGVtZW50OiAoXG4gICAgICAgICAgPEF1dGhMYXlvdXQgYXV0aGVudGljYXRpb24+XG4gICAgICAgICAgICA8VmlkZW9QYWdlIC8+XG4gICAgICAgICAgPC9BdXRoTGF5b3V0PlxuICAgICAgICApLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvbm90aWZpY2F0aW9uXCIsXG4gICAgICAgIGVsZW1lbnQ6IChcbiAgICAgICAgICA8QXV0aExheW91dCBhdXRoZW50aWNhdGlvbj5cbiAgICAgICAgICAgIDxOb3RpZmljYXRpb25QYWdlIC8+XG4gICAgICAgICAgPC9BdXRoTGF5b3V0PlxuICAgICAgICApLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogXCIvZXhwbG9yXCIsXG4gICAgICAgIGVsZW1lbnQ6IChcbiAgICAgICAgICA8QXV0aExheW91dCBhdXRoZW50aWNhdGlvbj5cbiAgICAgICAgICAgIDxTZWFyY2hQYWdlIC8+XG4gICAgICAgICAgPC9BdXRoTGF5b3V0PlxuICAgICAgICApLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXSk7XG5cbmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpKS5yZW5kZXIoXG4gIDxTdHJpY3RNb2RlPlxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPFJvdXRlclByb3ZpZGVyIHJvdXRlcj17cm91dGVyfSAvPlxuICAgIDwvUHJvdmlkZXI+XG4gIDwvU3RyaWN0TW9kZT5cbik7XG4iXSwiZmlsZSI6IkY6L0FwcC9Qcm9kdWN0aW9uLUFwcC9Gcm9udGVudC9zcmMvbWFpbi5qc3gifQ==
