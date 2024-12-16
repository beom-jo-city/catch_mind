// API 호출 관련 유틸리티 함수

// 리더보드 데이터를 가져오는 함수
export const fetchLeaderboardFromAPI = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/leaderboard");
      if (response.ok) {
        return await response.json(); // JSON 데이터를 반환
      } else {
        console.error("Failed to fetch leaderboard data.");
        return null;
      }
    } catch (error) {
      console.error("Error while fetching leaderboard data:", error);
      return null;
    }
};

// FastAPI로 키워드와 증강 조건 전송
export const sendKeywordToAPI = async (keyword, augmentation) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/receive-keyword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword, augmentation }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to send keyword and augmentation");
        return null;
      }
    } catch (error) {
      console.error("Error in sendKeywordToAPI:", error);
      return null;
    }
};

// FastAPI로 캔버스를 PNG 이미지로 전송
export const sendCanvasToAPI = async (imageData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/receive-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Image sent successfully:", data.message); // 서버로부터 확인 메시지 출력
        return data;  // 추론 결과 반환
      } else {
        console.error("Failed to send image to FastAPI");
        return null;
      }
    } catch (error) {
      console.error("Error in sendCanvasToAPI:", error);
      return null;
    }
};
  