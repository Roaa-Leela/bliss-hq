import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { StoreProvider } from "./lib/store";
import RoleSelect from "./screens/RoleSelect";
import Today from "./screens/caretaker/Today";
import Areas from "./screens/caretaker/Areas";
import Task from "./screens/caretaker/Task";
import Stub from "./screens/Stub";

const router = createBrowserRouter([
  { path: "/", element: <RoleSelect /> },
  { path: "/caretaker", element: <Today /> },
  { path: "/caretaker/areas", element: <Areas /> },
  { path: "/caretaker/task", element: <Task /> },
  { path: "/manager", element: <Stub title="Property Manager dashboard" /> },
  { path: "/owner", element: <Stub title="Owner view" /> },
  { path: "/admin", element: <Stub title="Admin setup" /> },
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
