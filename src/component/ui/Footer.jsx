import React from "react";
import styled from "styled-components";
import gitbubIcon from "../../images/github.png";
import notionIcon from "../../images/notion.png";

const FooterMain = styled.footer`
    border-top: 1px solid #e4e4e4;
    background-color: #f8f9fa;
    padding: 1rem 0;
    margin: 1rem 0;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
`;

const FooterTitle = styled.footer`
    font-size: 15px;
    color: #545e6f;
    margin-bottom: 10px;
    margin: 0 0 0 0.6rem;
    user-select: none; /* 사용자가 텍스트를 선택하지 못하도록 설정 */
`;

const FooterMessage = styled.footer`
    font-size: 13px;
    color: #545e6f;
    margin-bottom: 10px;
    margin: 0 0 0 0.6rem;
    user-select: none; /* 사용자가 텍스트를 선택하지 못하도록 설정 */
`;

const Icon = styled.img`
    margin: 0 0 0 0.6rem;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

function Footer(props) {
    const title = "빵훈";
    const name = "제작자: 이소진";

    const copyright = "© 이소진 ALL RIGHTS RESERVED";
    const email = "이메일: dlthwls227@naver.com";
    const contents = "개인 리액트 웹 프로젝트"

    return (
        <FooterMain>
            <div>
                <FooterTitle style={{ fontFamily: 'NanumBarunGothic', fontWeight: 'bold', marginBottom: '10px' }}>
                    {title}
                </FooterTitle>
                <div style={{ display: "flex", alignItems: "center", marginBottom: '10px' }}>
                    <FooterMessage style={{ marginRight: '5px' }}>{name}</FooterMessage>
                    <span style={{ margin: "0 0.5rem", alignSelf: "center" }}>|</span>
                    <FooterMessage style={{ marginRight: '5px' }}>{email}</FooterMessage>
                    <span style={{ margin: "0 0.5rem", alignSelf: "center" }}>|</span>
                    <FooterMessage style={{ marginRight: '5px' }}>{contents}</FooterMessage>
                </div>
                <FooterMessage style={{ marginBottom: '10px' }}>
                    {copyright}
                </FooterMessage>
                <div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
                    <a href="https://github.com/choconuna" target="_blank" rel="noopener noreferrer">
                        <Icon src={gitbubIcon} alt="GitHub" />
                    </a>
                    <a href="https://sjdv.notion.site/750d7cde8c6f429b8ae5f31f62d4b9cc" target="_blank" rel="noopener noreferrer">
                        <Icon src={notionIcon} alt="Notion" />
                    </a>
                </div>
            </div>
        </FooterMain>
    );
}

export default Footer;
