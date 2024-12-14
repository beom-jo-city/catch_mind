import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import titleImage from "../assets/title.png";

function Home() {
  // 페이지 이동을 처리하는 React Router Hook
  const navigate = useNavigate();

  // 리더보드 데이터를 관리하는 상태(state)
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, nickname: "Player1", score: 100 },
    { rank: 2, nickname: "Player2", score: 80 },
    { rank: 3, nickname: "Player3", score: 60 },
  ]); // 더미 데이터

  // FastAPI에서 리더보드 데이터를 가져오는 함수
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/leaderboard"); // FastAPI의 리더보드 엔드포인트 호출
      if (response.ok) {
        const data = await response.json(); // JSON 데이터를 JavaScript 객체로 변환
        setLeaderboard(data); // 리더보드 상태 업데이트
      } else {
        console.error("Failed to fetch leaderboard data."); // API 호출 실패 처리
      }
    } catch (error) {
      console.error("Error while fetching leaderboard data:", error); // 네트워크 에러 처리
    }
  };

  // 컴포넌트가 마운트될 때 리더보드 데이터 가져오기
  useEffect(() => {
    fetchLeaderboard();
  }, []); // 빈 배열: 첫 렌더링 시 한 번만 실행

  // 컴포넌트에서 렌더링할 UI를 정의
  return (
    <div className="home-container">
      {/* 제목 이미지를 추가 */}
      <img src={titleImage} alt="AI Catchmind" className="home-title-image" />

      {/* 버튼 그룹 */}
      <div className="button-group">
        {/* Start 버튼: Choice 화면으로 이동 */}
        <button className="home-button" onClick={() => navigate("/choice")}>
          Start
        </button>

        {/* Quit 버튼: 창 닫기 */}
        <button className="home-button" onClick={() => window.close()}>
          Quit
        </button>

        {/* Developer 버튼: 개발자 정보*/}
        <button className="home-button" onClick={() => alert("Developer: AI Team")}>
          Developer
        </button>
      </div>

      {/* 리더보드 섹션 */}
      <div className="leaderboard-container">
        {/* 리더보드 제목 */}
        <h2 className="leaderboard-title">리더보드</h2>

        {/* 리더보드 데이터를 표시하는 테이블 */}
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>닉네임</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            {/* 리더보드 데이터를 map 함수로 반복 렌더링 */}
            {leaderboard.map((entry) => (
              <tr key={entry.rank}>
                <td>{entry.rank}</td>
                <td>{entry.nickname}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home; // 이 컴포넌트를 다른 파일에서 사용할 수 있도록 내보내기
