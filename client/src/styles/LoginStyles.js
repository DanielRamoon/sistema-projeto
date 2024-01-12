import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const StyledForm = styled.form`
  background-color: var(--color-background);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 600px;
`;

export const StyledInputField = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
`;

export const StyledLoginButton = styled.button`
  background-color: var(--color-link);
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
`;

export const StyledRegisterLink = styled.a`
  background-color: var(--color-link);
  color: #fff;
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  width: 100%;
  display: block;
  cursor: pointer;
  text-decoration: none;
`;

export const RegisterModal = styled.div.attrs((props) => ({
  style: {
    display: props.isOpen ? "block" : "none",
  },
}))`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RegisterFormField = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

export const RegisterInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const RegisterButton = styled.button`
  background-color: var(--color-link);
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #333;
`;
