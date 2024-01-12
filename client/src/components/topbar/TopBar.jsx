import { TopBarContainer, ProfileIcon } from "../../styles/TopBarStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const TopBar = () => {
  return (
    <TopBarContainer>
      <div></div>

      <ProfileIcon>
        <FontAwesomeIcon icon={faUser} />
      </ProfileIcon>
    </TopBarContainer>
  );
};

export default TopBar;
