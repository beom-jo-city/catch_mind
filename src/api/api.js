// API 호출 관련 유틸리티 함수

// 리더보드 데이터를 가져오는 함수
export const fetchLeaderboardFromAPI = async () => {
  try {
    const response = await fetch("https://cv05-catchmind.loca.lt/api/leaderboard", {
      method: "GET",
      headers: {
        "bypass-tunnel-reminder": "true", // 우회 헤더 추가
      },
    });
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
      const response = await fetch("https://cv05-catchmind.loca.lt/api/receive-keyword", {
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
      const response = await fetch("https://cv05-catchmind.loca.lt/api/receive-image", {
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
  
// 사용자 닉네임, 총점, 제출 시간 전송
export const sendFinalSubmissionToAPI = async (nickname, totalScore) => {
  try {
    const response = await fetch("https://cv05-catchmind.loca.lt/api/submit-userinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
        total_score: totalScore,
        submission_time: new Date().toISOString(), // 현재 시간 ISO 형식
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Final submission successful:", data.message);
      return data;
    } else {
      console.error("Failed to send final submission.");
      return null;
    }
  } catch (error) {
    console.error("Error in sendFinalSubmissionToAPI:", error);
    return null;
  }
};
