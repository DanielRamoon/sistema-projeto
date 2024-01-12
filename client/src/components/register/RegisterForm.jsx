import { useState } from "react";
import RegisterStyles from "../../styles/RegisterForm";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {};

  return (
    <RegisterStyles.RegisterContainer>
      <RegisterStyles.RegisterForm>
        <h2>Registro</h2>
        <form>
          <RegisterStyles.InputField
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <RegisterStyles.InputField
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RegisterStyles.RegisterButton onClick={handleRegister}>
            Registrar
          </RegisterStyles.RegisterButton>
        </form>
      </RegisterStyles.RegisterForm>
    </RegisterStyles.RegisterContainer>
  );
}

export default RegisterForm;
