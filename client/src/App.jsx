import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import PropTypes from "prop-types";

import Login from "./components/login/Login";
import Register from "./components/register/RegisterForm";
import DashboardPage from "./pages/dashboard/DashboardPage";
import Balance from "./components/balance/BalanceList";
import Payment from "./components/payment/PaymentList";
import { BalanceProvider } from "./context/BalanceContext";

const PrivateRoute = ({ element }) => {
  const { authenticated } = useAuth();

  return authenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BalanceProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerPage" element={<Register />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<DashboardPage />} />}
        />
        <Route
          path="/payment"
          element={<PrivateRoute element={<Payment />} />}
        />
        <Route
          path="/balance"
          element={<PrivateRoute element={<Balance />} />}
        />
      </Routes>
    </BalanceProvider>
  );
}
PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default App;
