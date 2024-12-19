import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import titleImage from "../assets/title.png";
import { fetchLeaderboardFromAPI } from "../api/api";

function Home() {
  // 페이지 이동을 처리하는 React Router Hook
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);

  // 컴포넌트가 마운트될 때 리더보드 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
        const data = await fetchLeaderboardFromAPI(); // API 호출
        if (data) {
          setLeaderboard(data);
        }
    };
    fetchData();
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
