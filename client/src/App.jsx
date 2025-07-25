import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ActivateEmailPage from "./pages/ActivateEmailPage";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/user/activate/:token" element={<ActivateEmailPage />} />

        {/* prevent user after login */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
}

export default App;
