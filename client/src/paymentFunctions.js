// paymentFunctions.js
import {
  createPayment,
  deletePayment,
  getPayments,
} from "./services/PatmentService.js";
import { ActionTypes as PaymentActionTypes } from "./context/PaymentContext.jsx";

import { BalanceActionTypes } from "./context/BalanceContext.jsx";

export const handleCreatePayment = async (
  newPayment,
  balances,
  dispatch,
  balanceDispatch,
  setSuccessAlert,
  handleCloseModal
) => {
  try {
    if (
      !newPayment.selectedBalance ||
      typeof newPayment.selectedBalance !== "object"
    ) {
      console.error("Selecione um saldo válido para o pagamento");
      return;
    }

    const createdPayment = await createPayment(newPayment);

    dispatch({
      type: PaymentActionTypes.ADD_PAYMENT,
      payload: createdPayment,
    });

    setSuccessAlert(true);
    handleCloseModal();
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
  }
};

export const handleEditPayment = async (
  index,
  payment,
  setEditMode,
  setEditIndex,
  setOpenModal,
  setNewPayment
) => {
  try {
    setEditMode(true);
    setEditIndex(index);
    setOpenModal(true);

    const paymentDetails = await getPayments();
    setNewPayment(paymentDetails);
  } catch (error) {
    console.error("Erro ao obter detalhes do pagamento:", error);
  }
};

export const handleDeletePayment = async (
  index,
  payment,
  balances,
  dispatch,
  balanceDispatch
) => {
  const deletedPayment = payment[index];

  try {
    await deletePayment(deletedPayment.id);

    dispatch({
      type: PaymentActionTypes.DELETE_PAYMENT,
      payload: index,
    });
  } catch (error) {
    console.error("Erro ao excluir pagamento:", error);
  }

  const updatedBalances = balances.map((balance) => {
    if (balance.id === deletedPayment.selectedBalance) {
      return {
        ...balance,
        usedValue: balance.usedValue - deletedPayment.amount,
        remainingValue:
          balance.initialValue - (balance.usedValue - deletedPayment.amount),
      };
    }
    return balance;
  });

  balanceDispatch({
    type: BalanceActionTypes.SET_BALANCES,
    payload: updatedBalances,
  });

  dispatch({
    type: PaymentActionTypes.DELETE_PAYMENT,
    payload: index,
  });
};
