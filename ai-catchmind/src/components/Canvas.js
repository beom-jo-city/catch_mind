import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Canvas.css";
import { sendKeywordToAPI, sendCanvasToAPI } from "../api/api";

function Canvas() {
  const navigate = useNavigate();
  const location = useLocation();

  // 선택된 데이터와 라운드 정보 가져오기
  const { selectedWord, augmentation, round, totalScore: initialTotalScore } =
    location.state || {
      selectedWord: "No Word",
      augmentation: "No Condition",
      round: 1,
      totalScore: 0,
    };

  const [time, setTime] = useState(30); // 제한 시간
  const [results, setResults] = useState([]); // 추론 결과
  const [totalScore, setTotalScore] = useState(0); // 총합 점수
  const [isFinalPopupOpen, setIsFinalPopupOpen] = useState(false); // 닉네임 입력 팝업 상태
  const [nickname, setNickname] = useState(""); // 닉네임 입력 값

  const canvasRef = useRef(null); // 캔버스 DOM 참조
  const contextRef = useRef(null); // 캔버스 컨텍스트 참조
  const [isDrawing, setIsDrawing] = useState(false); // 그리기 상태 관리
  
  // 컴포넌트가 렌더링될 때 키워드와 증강 조건을 FastAPI로 전송
  useEffect(() => {
    sendKeywordToAPI(selectedWord, augmentation);
  }, [selectedWord, augmentation]);

  // 캔버스를 초기화하는 함수
  useEffect(() => {
    const canvas = canvasRef.current;
    const size = 400; // 정방형 크기
    canvas.width = size; // 캔버스 실제 크기 (픽셀)
    canvas.height = size;

    const context = canvas.getContext("2d");
    context.strokeStyle = "black"; // 선 색상
    context.lineWidth = 2; // 선 굵기
    contextRef.current = context;
  }, []);

  // 그림 시작
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // 그림 중
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  // 그림 종료
  const finishDrawing = () => {
    setIsDrawing(false);
    contextRef.current.closePath();    
    sendCanvasDataToAPI();
  };

  // 캔버스 데이터를 백엔드로 전송하는 함수
  const sendCanvasDataToAPI = async () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL("image/png"); // Base64 PNG 데이터 생성

    try {
      const response = await sendCanvasToAPI(imageData); // API 호출
      if (response) {
        // 백엔드에서 받은 추론 결과 업데이트
        setResults(response.results);
      }
    } catch (error) {
      console.error("Error sending canvas data:", error);
    }
  };

  // 타이머를 설정하고 시간이 끝나면 Choice 화면으로 이동
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (time === 0) {
        if (round < 3) {
            // 라운드가 3 미만이면 다음 라운드로 이동
            navigate("/choice", {
                state: {
                  round: round + 1,
                  totalScore: totalScore, // 업데이트된 총점 전달
                },
            });
        }
    }

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [time, navigate, round, totalScore]);

  // 제출 버튼 클릭 시 동작
  const handleSubmit = () => {
    if (results.length > 0) {
      // 가장 높은 점수의 클래스 찾기
      const highestScoreResult = results.reduce((max, result) =>
        result.score > max.score ? result : max
      );
  
      // 제시어와 가장 높은 점수의 클래스 비교
      if (highestScoreResult.class.toLowerCase() === selectedWord.toLowerCase()) {
        // 일치하면 총점 업데이트
        setTotalScore((prevScore) => prevScore + highestScoreResult.score);
      }
    }
  
    if (round === 3) {
      // 최종 제출 버튼 클릭 시 팝업 표시
      setIsFinalPopupOpen(true);
    } else {
      // 다음 라운드로 이동
      navigate("/choice", {
        state: {
          round: round + 1,
          totalScore: totalScore, // 업데이트된 총점 전달
        },
      });
    }
  };

  // 최종 제출 팝업에서 제출 동작
  const handleFinalSubmit = () => {
    console.log(`닉네임: ${nickname}, 총합 점수: ${totalScore}`);
    setIsFinalPopupOpen(false);
    navigate("/"); // 홈 화면으로 이동
  };

  return (
    <div className="canvas-container">
      <h1 className="selected-word">제시어: {selectedWord}</h1> {/* 선택된 제시어 표시 */}
      <h1 className="augmentation">증강: {augmentation}</h1> {/* 선택된 증강 표시 */}
      
      {/* 캔버스 영역 */}
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={finishDrawing}
      ></canvas>

      <div>
        <h2 className="results-title">Confidence Score</h2>
        <ul className="results-list">
          {results.map((result, index) => (
            <li
              key={index}
              className={`result-item ${index === 0 ? "highlight" : ""}`}
            >
              {result.class}: {result.score}
            </li>
          ))}
        </ul>
      </div>
      <div className="timer-and-button">
        <p className="timer">남은 시간: {time}초</p>
        <button className="submit-button" onClick={handleSubmit}>
          {round === 3 ? "최종 제출" : "제출"} {/* 라운드에 따라 버튼 텍스트 변경 */}
        </button>
      </div>

      {/* 닉네임 입력 팝업 */}
      {isFinalPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <p>총합 점수: {totalScore.toFixed(2)}</p>
            <input
              type="text"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="nickname-input"
            />
            <button onClick={handleFinalSubmit} className="final-submit-button">
              제출
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Canvas;
