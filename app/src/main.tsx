import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { StoreProvider } from "./lib/store";
import RoleSelect from "./screens/RoleSelect";
import Today from "./screens/caretaker/Today";
import Areas from "./screens/caretaker/Areas";
import Task from "./screens/caretaker/Task";
import ReportIssue from "./screens/caretaker/ReportIssue";
import LaundryLog from "./screens/caretaker/LaundryLog";
import Submit from "./screens/caretaker/Submit";
import Operations from "./screens/manager/Operations";
import Review from "./screens/manager/Review";
import Owner from "./screens/Owner";
import Admin from "./screens/Admin";

const router = createBrowserRouter([
  { path: "/", element: <RoleSelect /> },
  { path: "/caretaker", element: <Today /> },
  { path: "/caretaker/areas", element: <Areas /> },
  { path: "/caretaker/task", element: <Task /> },
  { path: "/caretaker/issue", element: <ReportIssue /> },
  { path: "/caretaker/laundry", element: <LaundryLog /> },
  { path: "/caretaker/submit", element: <Submit /> },
  { path: "/manager", element: <Operations /> },
  { path: "/manager/review", element: <Review /> },
  { path: "/owner", element: <Owner /> },
  { path: "/admin", element: <Admin /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </StoreProvider>
  </StrictMode>
);
