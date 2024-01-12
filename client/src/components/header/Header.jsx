import { useState } from "react";
import {
  Container,
  HeaderContainer,
  HeaderTitle,
  NavLink,
  PageContainer,
} from "../../styles/HeserStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyCheckAlt,
  faMoneyBill,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import PagamentoPage from "../../pages/payment/PaymentPage";
import SaldoPage from "../../pages/balance/BalancePage";

const Header = () => {
  const [selectedTitle, setSelectedTitle] = useState("Pagamento");

  const handleNavLinkClick = (title) => {
    setSelectedTitle(title === "Sair" ? "Pagamento" : title);
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>{selectedTitle}</HeaderTitle>
        <NavLink href="#" onClick={() => handleNavLinkClick("Pagamento")}>
          <FontAwesomeIcon icon={faMoneyCheckAlt} /> Pagamento
        </NavLink>
        <NavLink href="#" onClick={() => handleNavLinkClick("Saldo")}>
          <FontAwesomeIcon icon={faMoneyBill} /> Saldo
        </NavLink>
        <NavLink href="#" onClick={() => handleNavLinkClick("Sair")}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Sair
        </NavLink>
      </HeaderContainer>

      <PageContainer style={{ overflow: "hidden" }}>
        {selectedTitle === "Pagamento" && <PagamentoPage />}
        {selectedTitle === "Saldo" && <SaldoPage />}
      </PageContainer>
    </Container>
  );
};

export default Header;
