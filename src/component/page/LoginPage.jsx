import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";

const FullHeightContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const LoginMain = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LoginText = styled.div`
    width: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const TextInput = styled.input`
    margin: 8px;
    padding: 10px;
    width: 350px;
    height: 30px;
    border: 1px solid #ccc; /* 1px 굵기의 #ccc 색상의 실선 스타일 테두리 */
    border-radius: 6px;
    font-family: 'NanumBarunGothicLight';
    font-size: 15px;
`;

const LoginButton = styled.button`
   margin: 8px;
   padding: 10px;
   width: 350px;
   height: 50px; 
   border: none;
   border-radius: 6px;
   font-family: 'NanumBarunGothic';
   font-size: 15px;
   color: #FFFFFF;
   background-color: #D2B48C;
   cursor: pointer;
`;

const JoinButton = styled.button`
    margin: 8px;
    padding: 10px;
    width: 350px;
    height: 50px;
    border: 1px solid #D2B48C;
    border-radius: 6px;
    font-family: 'NanumBarunGothic';
    font-size: 15px;
    color: #D2B48C;
    background-color: #FFFFFF;
    cursor: pointer;
`;

function LoginPage(props) {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const navigate = useNavigate();
    
    const handleJoinButtonClick = () => {
        // JoinButton 클릭 시 joinPage로 이동
        navigate('/join'); 
    }

    return (
        <FullHeightContainer>
            <LoginMain>
                <LoginText>
                    <div style={{ textDecoration: 'none', color: 'black', fontFamily: 'NanumBarunGothicBold', fontSize: '18px', marginBottom: '20px' }}>로그인</div>
                    <TextInput
                        type="text"
                        placeholder="아이디를 입력해 주세요."
                        value={inputId}
                        onChange={(e) => setInputId(e.target.value)} />
                    <TextInput
                        type="password"
                        placeholder="비밀번호를 입력해 주세요."
                        value={inputPw}
                        onChange={(e) => setInputPw(e.target.value)} />
                        
                    <LoginButton style={{ marginTop: '40px' }}>로그인</LoginButton>
                    <JoinButton onClick={handleJoinButtonClick}>회원가입</JoinButton>
                </LoginText>
            </LoginMain>
        </FullHeightContainer>
    );
}

export default LoginPage;