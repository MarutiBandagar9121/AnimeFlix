import React from "react";
import styled from "styled-components";
import { Link,useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "signIn") {
      navigate("/LoginPage");
    } else if (selectedOption === "signUp") {
      navigate("/SignupPage");
    }
  };
  return (
    <HeaderContainer>
      <Logo src="images/animieFlix.png" alt="Logo" />
      <ButtonContainer>
        <Link to="/LoginPage">
          <Button showOnSmallScreen={false}>Sign In</Button>
        </Link>
        <Link to="/SignupPage">
          <Button showOnSmallScreen={false}>Sign Up</Button>
        </Link>
        <DropdownButton onChange={handleDropdownChange} showOnSmallScreen={true}>
          <option value="menu">Menu</option>
          <option value="signIn">Sign In</option>
          <option value="signUp">Sign Up</option>
        </DropdownButton>
      </ButtonContainer>
    </HeaderContainer>
  );
};
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: transperent;
  color: #fff;
`;

const Logo = styled.img`
  width: 10rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 600px) {
    flex: 1;
    justify-content: flex-end;
  }
`;

const DropdownButton = styled.select`
  padding: 0.5rem 1rem;
  background-color: #007bff; /* Replace with your desired button color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: none;

  &:hover {
    background-color: #0056b3; /* Replace with your desired hover color */
  }

  @media (max-width: 600px) {
    display: ${(props) => (props.showOnSmallScreen ? "block" : "none")};
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: transperent;
  border:2px solid white;
  color: #fff;
  //border: none;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    background-color: black;
    border:3px solid white;
  }

  @media (max-width: 600px) {
    display: ${(props) => (props.$showOnSmallScreen ? "block" : "none")};
  }
`;


export default Header;
