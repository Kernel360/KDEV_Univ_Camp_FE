import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "@@/SearchPage";
import LoginPage from "@@/LoginPage/index.jsx";
import SignupPage from "@@/SignupPage/index.jsx";
import InfoPage from "@@/InfoPage/index.jsx";
import "@/App.css";

function App() {
  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가

  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route
        path="/login"
        element={<LoginPage setNickname={setNickname} />}
      />{" "}
      {/* setNickname 전달 */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/info" element={<InfoPage />} />
    </Routes>
  );
}

export default App;
