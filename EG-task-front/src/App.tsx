import { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./app.css";
import { AccountProvider, useAccount } from "./lib/context/account-context";
import Spinner from "./components/spinner";

const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Home = lazy(() => import("./pages/home"));

const authRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </>
  )
);

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);

const Navigation = () => {
  const { access_token } = useAccount();
  const router = access_token ? appRouter : authRouter;
  return <RouterProvider router={router} />;
};

const App = () => (
  <AccountProvider>
    <Suspense fallback={<Spinner />}>
      <Navigation />
    </Suspense>
  </AccountProvider>
);

export default App;
