import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  useBalanceContext,
  BalanceActionTypes,
} from "../../context/BalanceContext.jsx";

function BalanceList() {
  const rowsPerPageOptions = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [openModal, setOpenModal] = useState(false);
  const [newBalance, setNewBalance] = useState({
    name: "",
    description: "",
    initialValue: 0,
    usedValue: 100,
    remainingValue: 100,
  });
  const [successAlert, setSuccessAlert] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [alertColor, setAlertColor] = useState("success");

  const { state: balances, dispatch } = useBalanceContext();
  const pageCount = Math.ceil(balances.length / rowsPerPage);
  const showPagination = pageCount > 1;
  const [duplicateNameAlert, setDuplicateNameAlert] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingIndex(null);
    setNewBalance({
      name: "",
      description: "",
      initialValue: 0,
      usedValue: "",
      remainingValue: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBalance((prevBalance) => ({
      ...prevBalance,
      [name]: value,
    }));
  };

  const handleCreateBalance = () => {
    const updatedBalances = [...balances];

    const isNameAlreadyExist = updatedBalances.some(
      (balance, index) =>
        index !== editingIndex && balance.name === newBalance.name
    );

    if (isNameAlreadyExist) {
      setDuplicateNameAlert(true);
      return;
    }

    const newBalanceWithDefaults = {
      ...newBalance,
      usedValue: 0,
      remainingValue: newBalance.initialValue,
    };

    if (editingIndex !== null) {
      const originalUsedValue = updatedBalances[editingIndex].usedValue;
      const amountUsed = originalUsedValue - newBalanceWithDefaults.usedValue;
      newBalanceWithDefaults.remainingValue -= amountUsed;

      updatedBalances[editingIndex] = newBalanceWithDefaults;
      dispatch({
        type: BalanceActionTypes.SET_BALANCES,
        payload: updatedBalances,
      });
      setActionType("edit");
    } else {
      // Ao adicionar um novo saldo, ajusta o usedValue do saldo original
      updatedBalances.forEach((balance) => {
        balance.usedValue += newBalanceWithDefaults.usedValue;
      });

      dispatch({
        type: BalanceActionTypes.SET_BALANCES,
        payload: [...updatedBalances, newBalanceWithDefaults],
      });
      setActionType("create");
    }

    setAlertColor("success");
    setSuccessAlert(true);
    handleCloseModal();
  };

  const handleEditBalance = (index) => {
    setEditingIndex(index);
    setOpenModal(true);

    setNewBalance({
      name: balances[index].name,
      description: balances[index].description,
      initialValue: balances[index].initialValue,
    });
  };

  const handleDeleteBalance = (index) => {
    const balanceToDelete = balances[index];

    const isBalanceLinkedToPayment =
      checkIfBalanceLinkedToPayment(balanceToDelete);

    if (isBalanceLinkedToPayment) {
      alert("Não é possível excluir um saldo vinculado a um pagamento.");
      return;
    }

    const updatedBalances = [...balances];
    updatedBalances.splice(index, 1);

    dispatch(updatedBalances);

    dispatch({
      type: BalanceActionTypes.SET_BALANCES,
      payload: updatedBalances,
    });
  };

  const checkIfBalanceLinkedToPayment = (balance) => {
    return balance.linkedToPayment === true;
  };
  function formatCurrency(value) {
    const numericValue = parseFloat(value);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue);
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Saldos</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Criar Saldo
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Valor Inicial</TableCell>
              <TableCell align="right">Valor Utilizado</TableCell>
              <TableCell align="right">Valor Restante</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balances
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((balance, index) => (
                <TableRow key={index}>
                  <TableCell>{balance.name}</TableCell>
                  <TableCell>{balance.description}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(balance.initialValue)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(balance.usedValue)}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(balance.remainingValue)}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditBalance(index)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteBalance(index)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={balances.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}

      {/* Modal para adicionar/editar saldo */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {editingIndex !== null ? "Editar Saldo" : "Adicionar Saldo"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            name="name"
            value={newBalance.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descrição"
            name="description"
            value={newBalance.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Valor Inicial"
            name="initialValue"
            type="number"
            value={newBalance.initialValue}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={editingIndex !== null}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleCreateBalance} color="primary">
            Criar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alerta de sucesso */}
      <Snackbar
        open={successAlert}
        autoHideDuration={3000}
        onClose={() => {
          setSuccessAlert(false);
          setActionType(null);
          setAlertColor("success");
        }}
      >
        <Alert severity={alertColor} onClose={() => setSuccessAlert(false)}>
          {actionType === "create"
            ? "Saldo criado com sucesso!"
            : actionType === "edit"
            ? "Saldo editado com sucesso!"
            : actionType === "delete"
            ? "Saldo excluído com sucesso!"
            : ""}
        </Alert>
      </Snackbar>
      <Snackbar
        open={duplicateNameAlert}
        autoHideDuration={3000}
        onClose={() => setDuplicateNameAlert(false)}
      >
        <Alert severity="error" onClose={() => setDuplicateNameAlert(false)}>
          Já existe um saldo com este nome.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BalanceList;
