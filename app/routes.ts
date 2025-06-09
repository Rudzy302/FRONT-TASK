import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/register", "./routes/auth/register.tsx"),
  route("/login", "./routes/auth/login.tsx"),
  route("/resent-password", "./routes/auth/resentPassword.tsx"),
  route("/changepassword", "./routes/auth/changepassword.tsx"),
  route("/welcome", "./routes/src/dashboard/welcome.tsx"),
  route("/tasks", "./routes/src/dashboard/task.tsx"),
  route("/projects", "./routes/src/dashboard/projects.tsx"),
  route("/calendar", "./routes/src/dashboard/calendar.tsx"),
  route("/userConfig", "./routes/src/dashboard/userConfig.tsx"),
  route("/projects/:projectName", "./routes/src/dashboard/components/project/deleteProject.tsx"),
  route("/tasks/:nombre", "./routes/src/dashboard/components/task/TaskDetail.tsx"),
] satisfies RouteConfig;