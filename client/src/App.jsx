import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { Suspense, useEffect } from "react";


import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";
import LoadingState from "./components/LoadingState";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PageNotFound from "./pages/PageNotFound";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));

function App() {
  const { authUser, checkAuth, isAuthenticatingUser } = useAuthStore();
  const { currentTheme } = useThemeStore();
  
  useEffect(() => {
    checkAuth();
  }, []);


  //   Protected route wrapper
  function ProtectedRoute({ children }) {
    if(!authUser) return <Navigate to={'/login'}/>
    if(!authUser.emailVerified) return <Navigate to={'/verifyAccount'}/>
    return children;
  }

  if (isAuthenticatingUser)
    return (
      <LoadingState/>
    );

  return (
    <div data-theme={currentTheme}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Suspense
        fallback={<LoadingState/>}
      >
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={authUser?.emailVerified ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={authUser?.emailVerified ? <Navigate to="/" /> : <RegisterPage />}
          />

          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/verifyAccount" element={!authUser?.emailVerified ? <VerifyAccountPage /> : <Navigate to={'/'}/>} />

          {/* Protected routes */}
          <Route
            path="/"
            element={ <ProtectedRoute> <HomePage /> </ProtectedRoute> }
          />
          <Route
            path="/changePassword"
            element={ <ProtectedRoute> <ChangePasswordPage /> </ProtectedRoute> }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute> <ProfilePage /> </ProtectedRoute>
            }
          />

          <Route path="*" element={<PageNotFound/>} />
          {/* Catch-all for 404 */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
