import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";
import { StoreProvider } from "./lib/store";
import { RoleSwitcher } from "./components/RoleSwitcher";
import { Toast } from "./components/Toast";
import RoleSelect from "./screens/RoleSelect";
import Today from "./screens/caretaker/Today";
import Areas from "./screens/caretaker/Areas";
import Task from "./screens/caretaker/Task";
import ReportIssue from "./screens/caretaker/ReportIssue";
import LaundryLog from "./screens/caretaker/LaundryLog";
import Submit from "./screens/caretaker/Submit";
import Checklists from "./screens/caretaker/Checklists";
import TaskChecklist from "./screens/caretaker/TaskChecklist";
import MyTasks from "./screens/caretaker/MyTasks";
import ManagerLaundry from "./screens/manager/Laundry";
import Operations from "./screens/manager/Operations";
import Review from "./screens/manager/Review";
import Issues from "./screens/manager/Issues";
import IssueDetail from "./screens/manager/IssueDetail";
import Calendar from "./screens/manager/Calendar";
import Deposit from "./screens/manager/Deposit";
import Owner from "./screens/Owner";
import Admin from "./screens/Admin";
import Inventory from "./screens/Inventory";
import Vendors from "./screens/Vendors";
import Procurement from "./screens/Procurement";
import RequestDetail from "./screens/RequestDetail";
import InventoryItem from "./screens/InventoryItem";
import Notifications from "./screens/Notifications";

function Layout() {
  return (<><Outlet /><RoleSwitcher /><Toast /></>);
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
  { path: "/", element: <RoleSelect /> },
  { path: "/caretaker", element: <Today /> },
  { path: "/caretaker/areas", element: <Areas /> },
  { path: "/caretaker/task", element: <Task /> },
  { path: "/caretaker/issue", element: <ReportIssue /> },
  { path: "/caretaker/laundry", element: <LaundryLog /> },
  { path: "/caretaker/submit", element: <Submit /> },
  { path: "/caretaker/checklists", element: <Checklists /> },
  { path: "/caretaker/checklist", element: <TaskChecklist /> },
  { path: "/caretaker/tasks", element: <MyTasks /> },
  { path: "/manager", element: <Operations /> },
  { path: "/manager/review", element: <Review /> },
  { path: "/manager/issues", element: <Issues /> },
  { path: "/manager/issue", element: <IssueDetail /> },
  { path: "/manager/calendar", element: <Calendar /> },
  { path: "/manager/deposit", element: <Deposit /> },
  { path: "/manager/laundry", element: <ManagerLaundry /> },
  { path: "/owner", element: <Owner /> },
  { path: "/admin", element: <Admin /> },
  { path: "/inventory", element: <Inventory /> },
  { path: "/inventory/item", element: <InventoryItem /> },
  { path: "/vendors", element: <Vendors /> },
  { path: "/procurement", element: <Procurement /> },
  { path: "/procurement/request", element: <RequestDetail /> },
  { path: "/notifications", element: <Notifications /> },
    ],
  },
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
