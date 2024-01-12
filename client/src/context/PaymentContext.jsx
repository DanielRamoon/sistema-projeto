import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const ActionTypes = {
  ADD_PAYMENT: "ADD_PAYMENT",
  EDIT_PAYMENT: "EDIT_PAYMENT",
  DELETE_PAYMENT: "DELETE_PAYMENT",
};

const paymentReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PAYMENT:
      return [...state, action.payload];
    case ActionTypes.EDIT_PAYMENT:
      return state.map((payment, index) =>
        index === action.payload.index ? action.payload.payment : payment
      );
    case ActionTypes.DELETE_PAYMENT:
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const [payments, dispatch] = useReducer(paymentReducer, []);

  return (
    <PaymentContext.Provider value={{ payments, dispatch }}>
      {children}
    </PaymentContext.Provider>
  );
};

PaymentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Função utilitária para usar o contexto
const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used within a PaymentProvider");
  }
  return context;
};

export { PaymentProvider, usePaymentContext, ActionTypes };
