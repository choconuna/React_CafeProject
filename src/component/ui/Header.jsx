import React from "react";
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";

const MainTitleHeader = styled.div`
  background-color: #D2B48C;
  width: flex;
  display: flex;
  color: white;
  padding: 20px;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  justify-content: space-between; /* 헤더 내부 요소 간에 여백을 최대화하여 맨 왼쪽과 맨 오른쪽으로 정렬 */
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  
  a {
    text-decoration: none; /* 링크의 밑줄 제거 */
    margin-left: 20px;
    padding-right: 20px;
    font-size: 15px;
    align-items: center; /* 텍스트를 수직으로 중앙 정렬 */
    font-family: 'NanumBarunGothicUltraLight';
  }
`;

function Header(props) {

  const navigate = useNavigate

  const menu1 = { name: "먹은 빵 자랑", path: "/" };
  const menu2 = { name: "빵 질문", path: "/" };
  const menu3 = { name: "Q&A", path: "/" };

  const activeStyle = {
    color: "#696969",
  };

  return (
    <MainTitleHeader>
      <LeftSection>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'white', fontFamily: 'NanumBarunGothic' }}>
          빵훈
        </NavLink>
      </LeftSection>
      <CenterSection>
        <Menu>
          <NavLink to={menu1.path} style={({ isActive }) => ({
            color: isActive ? "#696969" : "#FFFFF0",
          })}>
            {menu1.name}
          </NavLink>
          <NavLink to={menu2.path} style={({ isActive }) => ({
            color: isActive ? "#696969" : "#FFFFF0",
          })}>
            {menu2.name}
          </NavLink>
          <NavLink to={menu3.path} style={({ isActive }) => ({
            color: isActive ? "#696969" : "#FFFFF0",
          })}>
            {menu3.name}
          </NavLink>
        </Menu>
      </CenterSection>
      <RightSection>
        <NavLink to="/login" style={{ textDecoration: 'none', color: 'white', fontFamily: 'NanumBarunGothicUltraLight', fontSize: '15px' }}>
          로그인
        </NavLink>
      </RightSection>
    </MainTitleHeader>
  );
}

export default Header;