import { createBrowserRouter } from "react-router";
import MainLayout from "./../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import MyAssignments from "../pages/MyAssignments/MyAssignments";
import CreateAssignment from "../pages/CreateAssignment/CreateAssignment";
import Assignments from "../pages/Assignments/Assignments";
import AssignmentDetails from "../pages/AssignmentDetails/AssignmentDetails";
import UpdateAssignment from "../pages/UpdateAssignment/UpdateAssignment";
import MySubmittedAssignments from "../pages/MySubmittedAssignments/MySubmittedAssignments";
import PendingAssignments from "../pages/PendingAssignments/PendingAssignments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/myAssignments",
        element: (
          <PrivateRoute>
            <MyAssignments />
          </PrivateRoute>
        ),
      },
      {
        path: "/createAssignment",
        element: (
          <PrivateRoute>
            <CreateAssignment />
          </PrivateRoute>
        ),
      },
      {
        path: "/assignments",
        element: <Assignments />,
      },
      {
        path: "/assignment/:id",
        element: (
          <PrivateRoute>
            <AssignmentDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateAssignment />
          </PrivateRoute>
        ),
      },
      {
        path: "/mySubmittedAssignments",
        element: (
          <PrivateRoute>
            <MySubmittedAssignments />
          </PrivateRoute>
        ),
      },
      {
        path: "/pendingAssignments",
        element: (
          <PrivateRoute>
            <PendingAssignments />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
