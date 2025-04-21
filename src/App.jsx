import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setUser={setUser} user={user} />} />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <LoginPage setUser={setUser} />
          }
        />
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <SignUpPage setUser={setUser} />
            )
          }
        />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}
export default App;
