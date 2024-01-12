import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const HeaderContainer = styled.div`
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
`;

export const HeaderTitle = styled.div`
  margin-bottom: 20px;
  margin-left: 30px;
  margin-right: auto;
  font-size: 18px;
  position: relative;
  bottom: 45px;
`;

export const NavLink = styled.a`
  color: #fafafa;
  text-decoration: none;
  margin-top: 10px;
  margin-left: 30px;
  padding: 12px;
  cursor: pointer;
  position: relative;
  bottom: 40px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fafafa;
    color: #555;
    text-decoration: none;
  }
`;

export const PageContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;
