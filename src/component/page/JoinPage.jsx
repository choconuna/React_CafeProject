import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FullHeightContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const JoinMain = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const JoinText = styled.div`
    width: flex;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const Line = styled.div`
    width: 800px;
    height: 1px;
    margin: 10px  0;
    background-color: #000000;
`;

const RequiredText = styled.div`
    display: flex;
    justify-content: flex-end;
    background-color: white;
    font-family: 'NanumBarunGothic';
    font-size: 12px;
    color: #000000;
    margin-top: 10px;
    user-select: none;
`;

const LineForm = styled.div`
    display: flex;
    align-items: center; /* 세로 중앙 정렬 해제 */
    justify-content: space-between;
    text-align: center; /* 중앙 정렬을 위해 추가 */
`;

const ExplanationText = styled.div`
    flex: 1;
    display: flex;
    background-color: white;
    font-family: 'NanumBarunGothic';
    font-size: 15px;
    color: #000000;
    margin-right: 30px; 
    user-select: none; /* 사용자가 텍스트를 선택하지 못하도록 설정 */
`;

const TextInput = styled.input`
    flex: 3;
    margin: 8px;
    padding: 10px;
    width: 300px;
    height: 30px;
    border: 1px solid #ccc; /* 1px 굵기의 #ccc 색상의 실선 스타일 테두리 */
    border-radius: 6px;
    font-family: 'NanumBarunGothicLight';
    font-size: 15px;
    margin-right: 10px;
`;

const IdDuplicateCheckButton = styled.button`
    flex: 1;
    margin: 8px;
    padding: 10px;
    width: 150px;
    height: 50px;
    border: 1px solid ${(props) => (props.isIdDuplicateCheckButtonEnabled ? "#D2B48C" : "gray")};
    border-radius: 6px;
    font-family: 'NanumBarunGothic';
    font-size: 15px;
    color: ${(props) => (props.isIdDuplicateCheckButtonEnabled ? "#D2B48C" : "gray")};
    background-color: #FFFFFF;
    cursor: ${(props) => (props.isIdDuplicateCheckButtonEnabled ? "pointer" : "nor-allowed")};
    pointer-events: ${(props) => (props.isIdDuplicateCheckButtonEnabled ? "auto" : "none")};
    
    &:hover {
        background-color: ${(props) => (props.isIdDuplicateCheckButtonEnabled ? "#D2B48C" : "#FFFFFF")};
        color: ${(props) => (props.isIdDuplicateCheckButtonEnabled ? "#FFFFFF" : "gray")};
    }
`;

const NicknameDuplicateCheckButton = styled.button`
    flex: 1;
    margin: 8px;
    padding: 10px;
    width: 150px;
    height: 50px;
    border: 1px solid ${(props) => (props.isNicknameDuplicateCheckButtonEnabled ? "#D2B48C" : "gray")};
    border-radius: 6px;
    font-family: 'NanumBarunGothic';
    font-size: 15px;
    color: ${(props) => (props.isNicknameDuplicateCheckButtonEnabled ? "#D2B48C" : "gray")};
    background-color: #FFFFFF;
    cursor: ${(props) => (props.isNicknameDuplicateCheckButtonEnabled ? "pointer" : "nor-allowed")};
    pointer-events: ${(props) => (props.isNicknameDuplicateCheckButtonEnabled ? "auto" : "none")};
    
    &:hover {
        background-color: ${(props) => (props.isNicknameDuplicateCheckButtonEnabled ? "#D2B48C" : "#FFFFFF")};
        color: ${(props) => (props.isNicknameDuplicateCheckButtonEnabled ? "#FFFFFF" : "gray")};
    }
`;

const EmailDuplicateCheckButton = styled.button`
    flex: 1;
    margin: 8px;
    padding: 10px;
    width: 150px;
    height: 50px;
    border: 1px solid ${(props) => (props.isEmailDuplicateCheckButtonEnabled ? "#D2B48C" : "gray")};
    border-radius: 6px;
    font-family: 'NanumBarunGothic';
    font-size: 15px;
    color: ${(props) => (props.isEmailDuplicateCheckButtonEnabled ? "#D2B48C" : "gray")};
    background-color: #FFFFFF;
    cursor: ${(props) => (props.isEmailDuplicateCheckButtonEnabled ? "pointer" : "nor-allowed")};
    pointer-events: ${(props) => (props.isEmailDuplicateCheckButtonEnabled ? "auto" : "none")};
    
    &:hover {
        background-color: ${(props) => (props.isEmailDuplicateCheckButtonEnabled ? "#D2B48C" : "#FFFFFF")};
        color: ${(props) => (props.isEmailDuplicateCheckButtonEnabled ? "#FFFFFF" : "gray")};
    }
`;

const AuthenticationButton = styled.button`
    flex: 1;
    margin: 8px;
    padding: 10px;
    width: 150px;
    height: 50px;
    border: 1px solid ${(props) => (props.isEnabled ? '#D2B48C' : 'gray')};
    border-radius: 6px;
    font-family: 'NanumBarunGothic';
    font-size: 15px;
    color: ${(props) => (props.isEnabled ? '#D2B48C' : 'gray')};
    background-color: #FFFFFF;
    cursor: ${(props) => (props.isEnabled ? 'pointer' : 'not-allowed')};
    pointer-events: ${(props) => (props.isEnabled ? "auto" : "none")};
`;

const Blank = styled.button`
    flex: 1;
    margin: 8px;
    padding: 10px;
    width: 150px;
    height: 50px;
    border-radius: 6px;
    font-size: 15px;
    background-color: transparent; /* 배경색을 투명하게 설정 */
    border: none; /* 테두리 제거 */
    outline: none;/* 포커스 시 외곽선 제거 */
    color: transparent;
`;

const JoinButton = styled.button`
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

function JoinPage(props) {
    const [id, setId] = useState("");
    const [idError, setIdError] = useState("");
    const [isIdDuplicated, setIsIdDuplicated] = useState(false); // 아이디 중복 확인 여부 상태
    const [isIdDuplicateCheckButtonEnabled, setIsIdDuplicateCheckButtonEnabled] = useState(true); // 중복 확인 버튼 활성화 여부 상태
    const [duplicateIdMessage, setDuplicateIdMessage] = useState(""); // 중복 아이디 팝업 메시지 상태

    const [password, setPassword] = useState("");
    const [checkPw, setCheckPw] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [pwMismatch, setPwMismatch] = useState(false);

    const [name, setName] = useState("");

    const [nickname, setNickname] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false); // 닉네임 중복 확인 여부 상태
    const [isNicknameDuplicateCheckButtonEnabled, setIsNicknameDuplicateCheckButtonEnabled] = useState(true); // 중복 확인 버튼 활성화 여부 상태
    const [duplicateNicknameMessage, setDuplicateNicknameMessage] = useState(""); // 중복 닉네임 팝업 메시지 상태


    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isEmailDuplicated, setIsEmailDuplicated] = useState(false); // 이메일 중복 확인 여부 상태
    const [isEmailDuplicateCheckButtonEnabled, setIsEmailDuplicateCheckButtonEnabled] = useState(true);  // 중복 확인 버튼 활성화 여부 상태
    const [duplicateEmailMessage, setDuplicateEmailMessage] = useState(""); // 중복 닉네임 팝업 메시지 상태

    const [phone, setPhone] = useState("");

    const validateId = (inputId) => {
        const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
        return idRegex.test(inputId);
    };

    // 중복 아이디 확인 함수
    const handleIdDuplicateCheck = async () => {
        try {
            const response = await fetch(`http://localhost:3001/check-duplicate-id/${id}`);
            const data = await response.json();

            if (data.isIdDuplicated) {
                toast.error("사용 불가능한 아이디입니다.");
                setIsIdDuplicated(true);
                setIsIdDuplicateCheckButtonEnabled(true);
            } else {
                toast.success("사용 가능한 아이디입니다.");
                setIsIdDuplicated(false);
                setIsIdDuplicateCheckButtonEnabled(false);
            }
        } catch (error) {
            console.error("중복 ID 확인 중 오류 발생: ", error);
        }
    };

    // 아이디 변경 시 중복 확인 버튼 활성화 여부 업데이트 함수
    const handleIdChangeForButton = (e) => {
        const newId = e.target.value;
        setId(newId);

        if (validateId(newId) || newId.length === 0) {
            setIdError("");
            setIsIdDuplicateCheckButtonEnabled(true); // 아이디 변경 시 중복 확인 버튼 활성화
        } else {
            setIdError("6자 이상 16자 이하의  영문과 숫자를 조합");
            setIsIdDuplicateCheckButtonEnabled(false); // 유효하지 않은 아이디일 경우 중복 확인 버튼 비활성화
        }
    }

    useEffect(() => {
        if (checkPw != "" && password != checkPw) {
            setPwMismatch(true);
        } else {
            setPwMismatch(false);
        }
    }, [checkPw, password]);

    const validatePassword = (password) => {
        const passwordRegax = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        return passwordRegax.test(password);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;

        if (newPassword.includes(' ')) {
            setPasswordError("비밀번호에는 공백이 포함될 수 없습니다.");
        } else if (validatePassword(newPassword) || newPassword.length === 0) {
            setPasswordError("");
        } else {
            setPasswordError("영문/숫자/특수문자(공백 제외)만 허용, 3개 이상 조합");
        }

        setPassword(newPassword);
    };

    const validateNickname = (nickname) => {
        const nicknameRegex = /^\S+$/;
        return nicknameRegex.test(nickname);
    };

    // 중복 닉네임 확인 함수
    const handleNicknameDuplicateCheck = async () => {
        try {
            const response = await fetch(`http://localhost:3001/check-duplicate-id/${nickname}`);
            const data = await response.json();

            if (data.isNicknameDuplicated) {
                toast.error("사용 불가능한 닉네임입니다.");
                setIsNicknameDuplicated(true);
                setIsNicknameDuplicateCheckButtonEnabled(true);
            } else {
                toast.success("사용 가능한 닉네임입니다.");
                setIsNicknameDuplicated(false);
                setIsNicknameDuplicateCheckButtonEnabled(false);
            }
        } catch (error) {
            console.error("중복 닉네임 확인 중 오류 발생: ", error);
        }
    };

    // 닉네임 변경 시 중복 확인 버튼 활성화 여부 업데이트 함수
    const handleNicknameChangeForButton = (e) => {
        const newNickname = e.target.value;
        setNickname(newNickname);

        if (validateNickname(newNickname) || newNickname.length === 0) {
            setNicknameError("");
            setIsNicknameDuplicateCheckButtonEnabled(true); // 닉네임 변경 시 중복 확인 버튼 활성화
        } else {
            setNicknameError("공백을 제외하세요.");
            setIsNicknameDuplicateCheckButtonEnabled(false); // 유효하지 않은 닉네임일 경우 중복 확인 버튼 비활성화
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // 중복 이메일 확인 함수
    const handleEmailDuplicateCheck = async () => {
        try {
            const response = await fetch(`http://localhost:3001/check-duplicate-id/${email}`);
            const data = await response.json();

            if (data.isEmailDuplicated) {
                toast.error("사용 불가능한 이메일입니다.");
                setIsEmailDuplicated(true);
                setIsEmailDuplicateCheckButtonEnabled(true);
            } else {
                toast.success("사용 가능한 이메일입니다.");
                setIsEmailDuplicated(false);
                setIsEmailDuplicateCheckButtonEnabled(false);
            }
        } catch (error) {
            console.error("중복 이메일 확인 중 오류 발생: ", error);
        }
    };

    // 이메일 변경 시 중복 확인 버튼 활성화 여부 업데이트 함수
    const handleEmailChangeForButton = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (validateEmail(newEmail) || newEmail.length === 0) {
            setEmailError("");
            setIsEmailDuplicateCheckButtonEnabled(true); // 이메일 변경 시 중복 확인 버튼 활성화
        } else {
            setEmailError("이메일 형식으로 입력해 주세요.");
            setIsEmailDuplicateCheckButtonEnabled(false); // 유효하지 않은 이메일일 경우 중복 확인 버튼 비활성화
        }
    }

    return (
        <FullHeightContainer>
            <JoinMain>
                <JoinText>
                    <div style={{ textDecoration: 'none', color: 'black', fontFamily: 'NanumBarunGothic', fontSize: '30px', marginBottom: '20px', marginTop: '50px', userSelect: 'none' }}>회원가입</div>
                </JoinText>
                <RequiredText style={{ alignItems: 'right' }}><p style={{ color: '#FF0000', marginRight: '3px' }}>*</p><p>필수입력사항</p></RequiredText>
                <Line />
                <LineForm>
                    <ExplanationText style={{ alignItems: 'right' }}><p style={{ marginRight: '2px' }}>아이디</p><p style={{ color: '#FF0000', marginRight: '10px' }}>*</p><p style={{ color: 'transparent', marginRight: '2px' }}>오확인</p></ExplanationText>
                    <TextInput
                        type="text"
                        placeholder="아이디를 입력해 주세요."
                        value={id}
                        onChange={handleIdChangeForButton} />
                    <IdDuplicateCheckButton
                        isIdDuplicateCheckButtonEnabled={isIdDuplicateCheckButtonEnabled}
                        onClick={handleIdDuplicateCheck}
                        disabled={!isIdDuplicateCheckButtonEnabled} // 버튼 비활성화 설정
                    >중복확인</IdDuplicateCheckButton>
                </LineForm>
                {idError && <p style={{ color: 'red', fontSize: '12px', userSelect: 'none' }}>{idError}</p>}
                {/* 중복 아이디 메시지 */}
                {duplicateIdMessage && (
                    <p style={{ color: 'red', fontSize: '12px', userSelect: 'none' }}>
                        {duplicateIdMessage}
                    </p>
                )}
                {/* Toast 메시지 컨테이너 */}
                <ToastContainer position="bottom-center" autoClose={3000} />
                <LineForm>
                    <ExplanationText style={{ alignItems: 'right' }}><p style={{ marginRight: '2px' }}>비밀번호</p><p style={{ color: '#FF0000', marginRight: '10px' }}>*</p><p style={{ color: 'transparent', marginRight: '2px' }}>확인</p></ExplanationText>
                    <TextInput
                        type="password"
                        placeholder="비밀번호를 입력해 주세요."
                        value={password}
                        onChange={handlePasswordChange} />
                    <Blank>중복확인</Blank>
                </LineForm>
                {passwordError && <p style={{ color: 'red', fontSize: '12px', userSelect: 'none' }}>{passwordError}</p>}
                <LineForm>
                    <ExplanationText style={{ alignItems: 'right' }}><p style={{ marginRight: '2px' }}>비밀번호 확인</p><p style={{ color: '#FF0000', marginRight: '10px' }}>*</p></ExplanationText>
                    <TextInput
                        type="password"
                        placeholder="비밀번호를 한 번 더 입력해 주세요."
                        value={checkPw}
                        onChange={(e) => setCheckPw(e.target.value)} />
                    <Blank>중복확인</Blank>
                </LineForm>
                {pwMismatch && <p style={{ color: 'red', fontSize: '12px', userSelect: 'none' }}>비밀번호가 일치하지 않습니다.</p>}
                <LineForm>
                    <ExplanationText style={{ alignItems: 'right' }}><p style={{ marginRight: '2px' }}>이름</p><p style={{ color: '#FF0000', marginRight: '10px' }}>*</p><p style={{ color: 'transparent', marginRight: '2px' }}>오오확인</p></ExplanationText>
                    <TextInput
                        type="text"
                        placeholder="이름을 입력해 주세요."
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <Blank>중복확인</Blank>
                </LineForm>
                <LineForm>
                    <ExplanationText style={{ alignItems: 'right' }}><p style={{ marginRight: '2px' }}>닉네임</p><p style={{ color: '#FF0000', marginRight: '10px' }}>*</p><p style={{ color: 'transparent', marginRight: '2px' }}>오확인</p></ExplanationText>
                    <TextInput
                        type="text"
                        placeholder="닉네임을 입력해 주세요."
                        value={nickname}
                        onChange={handleNicknameChangeForButton} />
                    <NicknameDuplicateCheckButton
                        isNicknameDuplicateCheckButtonEnabled={isNicknameDuplicateCheckButtonEnabled}
                        onClick={handleNicknameDuplicateCheck}
                        disabled={!isNicknameDuplicateCheckButtonEnabled // 버튼 비활성화
                        }>중복확인</NicknameDuplicateCheckButton>
                </LineForm>
                {nicknameError && <p style={{ color: 'red', fontSize: '12px', userSelect: 'none' }}>{nicknameError}</p>}
                {/* 중복 닉네임 메시지 */}
                {duplicateNicknameMessage && (
                    <p style={{ color: 'red', fontSize: '12px', userSelect: 'none' }}>
                        {duplicateNicknameMessage}
                    </p>
                )}
                {/* Toast 메시지 컨테이너 */}
                <ToastContainer position="bottom-center" autoClose={3000} />
                <LineForm>
                    <ExplanationText style={{ alignItems: 'right' }}><p style={{ marginRight: '2px' }}>이메일</p><p style={{ color: '#FF0000', marginRight: '10px' }}>*</p><p style={{ color: 'transparent', marginRight: '2px' }}>오확인</p></ExplanationText>
                    <TextInput
                        type="text"
                        placeholder="이메일을 입력해 주세요."
                        value={email}
                        onChange={handleEmailChangeForButton} />
                    <EmailDuplicateCheckButton
                        isEmailDuplicateCheckButtonEnabled={isEmailDuplicateCheckButtonEnabled}
                        onClick={handleEmailDuplicateCheck}
                        disabled={!isEmailDuplicateCheckButtonEnabled} // 버튼 비활성화 설정
                    >중복확인</EmailDuplicateCheckButton>
                </LineForm>
                {emailError && <p style={{ color: 'red', fontSize: '12px', userSelect: 'none' }}>{emailError}</p>}
                {/* 중복 아이디 메시지 */}
                {duplicateEmailMessage && (
                    <p style={{ color: 'red', fontSize: '12px', userSelect: 'none' }}>
                        {duplicateEmailMessage}
                    </p>
                )}
                {/* Toast 메시지 컨테이너 */}
                <ToastContainer position="bottom-center" autoClose={3000} />
                <LineForm>
                    <ExplanationText style={{ alignItems: 'right' }}><p style={{ marginRight: '2px' }}>휴대폰</p><p style={{ color: '#FF0000', marginRight: '10px' }}>*</p><p style={{ color: 'transparent', marginRight: '2px' }}>오확인</p></ExplanationText>
                    <TextInput
                        type="text"
                        placeholder="숫자만 입력해 주세요."
                        value={phone}
                        onChange={(e) => {
                            const inputNumber = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
                            setPhone(inputNumber.slice(0, 11)); // 11자리까지만 유지
                        }}
                    />
                    <AuthenticationButton
                        isEnabled={phone.length > 0}
                        onClick={() => {

                        }} >인증번호 받기</AuthenticationButton>
                </LineForm>
                <JoinButton style={{ marginTop: '20px', marginBottom: '50px' }}>가입하기</JoinButton>
            </JoinMain>
        </FullHeightContainer>
    );
}

export default JoinPage;