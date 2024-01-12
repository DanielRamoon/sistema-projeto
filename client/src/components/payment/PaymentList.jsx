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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Snackbar,
} from "@mui/material";

// Contexts
import {
  usePaymentContext,
  ActionTypes as PaymentActionTypes,
} from "../../context/PaymentContext";
import {
  useBalanceContext,
  BalanceActionTypes,
} from "../../context/BalanceContext.jsx";

function PaymentList() {
  const rowsPerPageOptions = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newPayment, setNewPayment] = useState({
    name: "",
    description: "",
    amount: 0,
    selectedBalance: "",
  });
  const [successAlert, setSuccessAlert] = useState(false);
  const [editSuccessAlert, setEditSuccessAlert] = useState(false);
  const [deleteSuccessAlert, setDeleteSuccessAlert] = useState(false);
  const { payments: payment, dispatch } = usePaymentContext();
  const { state: balances, dispatch: balanceDispatch } = useBalanceContext();

  console.log("Current Payments:", payment);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setEditMode(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
    setEditIndex(null);
    setNewPayment({
      name: "",
      description: "",
      amount: "",
      selectedBalance: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const newValue = typeof value === "object" ? value : value;

    setNewPayment((prevPayment) => ({
      ...prevPayment,
      [name]: newValue,
    }));
  };

  const handleCreatePayment = () => {
    if (!newPayment.selectedBalance) {
      console.error("Erro: Nenhum saldo selecionado");
      return;
    }

    const selectedBalance = balances.find(
      (balance) => balance.id === newPayment.selectedBalance.id
    );

    if (!selectedBalance) {
      console.error("Erro: Saldo não encontrado");
      return;
    }

    if (editMode) {
      dispatch({
        type: PaymentActionTypes.EDIT_PAYMENT,
        payload: { index: editIndex, payment: newPayment },
      });
      setEditSuccessAlert(true);

      const oldPayment = payment[editIndex];
      const updatedBalance = {
        ...selectedBalance,
        usedValue:
          selectedBalance.usedValue - oldPayment.amount + newPayment.amount,
        remainingValue:
          selectedBalance.initialValue -
          selectedBalance.usedValue +
          oldPayment.amount -
          newPayment.amount,
      };

      const updatedBalances = balances.map((balance) =>
        balance.id === updatedBalance.id ? updatedBalance : balance
      );

      balanceDispatch({
        type: BalanceActionTypes.SET_BALANCES,
        payload: updatedBalances,
      });
    } else {
      dispatch({ type: PaymentActionTypes.ADD_PAYMENT, payload: newPayment });
      setSuccessAlert(true);

      const updatedBalance = {
        ...selectedBalance,
        usedValue: selectedBalance.usedValue + newPayment.amount,
        remainingValue: selectedBalance.remainingValue - newPayment.amount,
      };

      const updatedBalances = balances.map((balance) =>
        balance.id === updatedBalance.id ? updatedBalance : balance
      );

      balanceDispatch({
        type: BalanceActionTypes.SET_BALANCES,
        payload: updatedBalances,
      });
    }

    handleCloseModal();
  };

  const handleEditPayment = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setOpenModal(true);
    setNewPayment(payment[index]);
  };

  const handleDeletePayment = (index) => {
    const deletedPayment = payment[index];

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

    // Atualize os saldos usando o dispatch
    balanceDispatch({
      type: BalanceActionTypes.SET_BALANCES,
      payload: updatedBalances,
    });

    dispatch({
      type: PaymentActionTypes.DELETE_PAYMENT,
      payload: index,
    });
  };

  const pageCount = Math.ceil(payment.length / rowsPerPage);
  const showPagination = pageCount > 1;

  function formatCurrency(value) {
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    return formattedValue;
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Lista de Pagamentos</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Criar Pagamento
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome do Pagamento</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payment
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(row.amount)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditPayment(index)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeletePayment(index)}
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
          count={payment.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {editMode ? "Editar Pagamento" : "Adicionar Pagamento"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            name="name"
            value={newPayment.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descrição"
            name="description"
            value={newPayment.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={editMode}
          />
          <TextField
            label="Valor"
            name="amount"
            type="number"
            value={newPayment.amount}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            disabled={editMode}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-saldo-label">Selecionar Saldo</InputLabel>
            <Select
              labelId="select-saldo-label"
              id="select-saldo"
              name="selectedBalance"
              value={newPayment.selectedBalance}
              onChange={handleInputChange}
              disabled={editMode}
              renderValue={(selected) => selected.name}
            >
              {balances.map((balance) => (
                <MenuItem key={balance.id || balance.name} value={balance}>
                  {balance.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleCreatePayment} color="primary">
            {editMode ? "Salvar" : "Criar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={successAlert}
        autoHideDuration={3000}
        onClose={() => setSuccessAlert(false)}
      >
        <Alert severity="success" onClose={() => setSuccessAlert(false)}>
          Pagamento criado com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={editSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setEditSuccessAlert(false)}
      >
        <Alert severity="success" onClose={() => setEditSuccessAlert(false)}>
          Pagamento editado com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={deleteSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setDeleteSuccessAlert(false)}
      >
        <Alert severity="success" onClose={() => setDeleteSuccessAlert(false)}>
          Pagamento excluído com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default PaymentList;
