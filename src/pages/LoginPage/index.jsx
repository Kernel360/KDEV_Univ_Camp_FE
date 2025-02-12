import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/loginApi";
import styles from "./login.module.css";

const LoginPage = ({ setNickname }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const idRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  // 토큰 저장 함수
  const saveTokenToStorage = (token) => {
    localStorage.setItem("userToken", token);
  };

  // 사용자 정보 추출 함수
  const getUserInfoFromToken = (token) => {
    if (!token) return null;
    return {
      nickname: localStorage.getItem("userNickname"),
    };
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = idRef.current.value;
    const password = passwordRef.current.value;

    if (!id || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      const response = await login(id, password);
      const { token } = response;
      saveTokenToStorage(token);
      const userInfo = getUserInfoFromToken(token);

      if (userInfo) {
        setNickname(userInfo.nickname);
        alert(`${userInfo.nickname}님, 로그인 성공!`);
        navigate("/search");
      } else {
        throw new Error("사용자 정보를 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      setErrorMessage(
        error.message || "로그인에 실패했습니다. 다시 시도해주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="id">아이디</label>
          <input
            ref={idRef}
            type="text"
            id="id"
            placeholder="아이디를 입력하세요"
            className={styles.inputField}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            className={styles.inputField}
          />
        </div>
        <button
          type="submit"
          className={styles.loginSubmitButton}
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
      <p className={styles.signupText}>
        아직 회원이 아닌가요?{" "}
        <span className={styles.signupLink} onClick={() => navigate("/signup")}>
          <strong>회원가입하기</strong>
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
