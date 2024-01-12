import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

export const BalanceActionTypes = {
  SET_BALANCES: "SET_BALANCES",
};

const balanceReducer = (state, action) => {
  switch (action.type) {
    case BalanceActionTypes.SET_BALANCES:
      return action.payload;
    default:
      return state;
  }
};

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const initialBalanceState = [
    {
      id: 1,
      name: "Saldo 1",
      description: "Descrição 1",
      initialValue: 200,
      usedValue: 0,
      remainingValue: 200,
    },
    {
      id: 2,
      name: "Saldo 2",
      description: "Descrição 2",
      initialValue: 200,
      usedValue: 0,
      remainingValue: 200,
    },
  ];

  const [balanceState, dispatchBalances] = useReducer(
    balanceReducer,
    initialBalanceState
  );

  const balanceContextValue = {
    state: balanceState,
    dispatch: dispatchBalances,
  };

  return (
    <BalanceContext.Provider value={balanceContextValue}>
      {children}
    </BalanceContext.Provider>
  );
};

BalanceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBalanceContext = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalanceContext must be used within a BalanceProvider");
  }
  return context;
};
