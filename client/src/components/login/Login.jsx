import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  StyledContainer,
  StyledForm,
  StyledInputField,
  StyledLoginButton,
  StyledRegisterLink,
  RegisterModal,
  RegisterForm,
  StyledCloseButton,
} from "../../styles/LoginStyles";
import { registerUser, loginUser } from "../../services/api";

const LoginFormComponent = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(registerUsername, registerPassword);
      alert("Usuário registrado com sucesso!");
      setRegisterModalOpen(false);
      setRegisterUsername("");
      setRegisterPassword("");
      login();
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro durante o registro:", error.message);
      alert("Erro durante o registro: " + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginUser(loginUsername, loginPassword);

      console.log("Login bem-sucedido para o usuário:", loginUsername);

      login(loginUsername);
    } catch (error) {
      console.error("Erro durante o login:", error.message);

      if (error.message.includes("Credenciais inválidas")) {
        alert("Senha incorreta ou não fornecida. Por favor, tente novamente.");
      } else {
        alert("Erro durante o login. Por favor, tente novamente.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <StyledContainer>
      <StyledForm>
        <h1>Login e Registro</h1>
        <StyledInputField
          type="text"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <StyledInputField
          type={isPasswordVisible ? "text" : "password"}
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="eye-icon"
        >
          <i
            className={`fas ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
          ></i>
        </button>
        <StyledLoginButton onClick={handleLogin}>ENTRAR</StyledLoginButton>
        <StyledRegisterLink onClick={() => setRegisterModalOpen(true)}>
          Registrar
        </StyledRegisterLink>
      </StyledForm>

      <RegisterModal isOpen={isRegisterModalOpen}>
        <StyledCloseButton onClick={() => setRegisterModalOpen(false)}>
          X
        </StyledCloseButton>
        <RegisterForm>
          <h2>Registrar</h2>
          <StyledInputField
            type="text"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <StyledInputField
            type={isPasswordVisible ? "text" : "password"}
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <StyledLoginButton onClick={handleRegister}>
            Registrar
          </StyledLoginButton>
        </RegisterForm>
      </RegisterModal>
    </StyledContainer>
  );
};

export default LoginFormComponent;
