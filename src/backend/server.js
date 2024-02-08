const express = require('express');
const cors = require("cors");
const app = express();
const port = 3001;
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: port,
    password: "100409",
    database: "bbanghoondb",
});

db.connect((err) => {
    if(err) {
        console.error("MySQL connection error: ", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// 중복 ID 확인 API 엔드포인트
app.get('/check-duplicate-id/:userId', async(req, res) => {
    try {
        const userId = req.params.userId;
        const result = await db.query('SELECT COUNT(*) AS count FROM user WHERE userId = ?', [userId]);
        
        const isDuplicated = result[0].count > 0;
        res.json({ isDuplicated });
    } catch(error) {
        console.error("데이터베이스에서 중복 ID 확인 중 오류 발생: ", error);
        res.status(500).json({ message: "내부 서버 오류" });
    }
});

// 회원가입 API 엔드포인트
app.post('/signup', async(req, res) => {
    try {
        const { userId, userPassword, userName, userNickname, userEmail, userPhone } = req.body;
        
        // 검증: 필수 필드 확인
        if(!userId || !userPassword || !userName || !userNickname || !userEmail || !userPhone) {
            return res.status(400).json({ message: "All fields are required." });
        }
        
        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        
        // 현재 날짜 및 시간 가져오기
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:mm:ss 형식으로 변환
        
        // 데이터베이스에 사용자 추가
        db.query(
            'INSERT INTO user (userId, userPassword, userName, userNickname, userEmail, userPhone, regdate) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, hashedPassword, userName, userNickname, userEmail, userPhone, formattedDate],
            (error, results) => {
                if(error) {
                    console.error("Error while inserting user into database: ", error);
                    res.status(500).json({ message: "Error while registering user." });
                } else {
                    res.status(201).json({ message: "User registered successfully." });
                }
            }
        )
        
    } catch(error) {
        console.error("Error during registration process: ", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

