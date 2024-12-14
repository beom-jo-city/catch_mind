import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Choice.css";

function Choice() {
  const navigate = useNavigate();
  const location = useLocation(); // 이전 경로에서 navigate() 함수로 전달된 데이터를 받아옴

  // Canvas에서 전달된 라운드 및 총점 데이터
  const roundFromCanvas = location.state?.round || 1; // 초기값 1
  const totalScoreFromCanvas = location.state?.totalScore || 0; // 초기값 0

  /*
   * round: 현재 라운드 번호를 관리하는 상태
   * setRound: 라운드 번호를 업데이트하는 함수
   */
  const [round] = useState(roundFromCanvas); // 현재 라운드 상태
  const [totalScore] = useState(totalScoreFromCanvas); // 총점 상태

  // 더미 데이터  
  const randomWords = ["Cat", "Dog", "Car", "House", "Tree"]; // Quickdraw 클래스 리스트
  const randomAugmentations = ["Rotate", "Flip", "Blur", "Crop", "Scale"]; // 증강 리스트

  // 랜덤으로 중복되지 않게 3개의 클래스를 선택하는 함수
  const generateUniqueRandomWords = () => {
    const shuffled = [...randomWords].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3); // 처음 3개 선택
  };

  // 각 클래스에 대해 증강 조건 1개를 랜덤으로 선택하는 함수
  const generateAugmentationsForWords = (words) => {
    return words.map(() =>
      randomAugmentations[Math.floor(Math.random() * randomAugmentations.length)]
    );
  };

  // 클래스와 증강 선택
  const words = generateUniqueRandomWords(); // 랜덤으로 3개의 단어 선택
  const augmentations = generateAugmentationsForWords(words); // 각 단어마다 증강 조건 1개 선택

  return (
    <div className="choice-container">
      {/* 현재 라운드를 표시 */}
      <h1 className="round-title">Round {round}</h1>

      {/* 단어와 증강 조건을 담은 선택 박스 */}
      <div className="choice-box-container">
        {words.map((word, index) => (
          <div
            key={index}
            className="choice-box"
            // 박스를 클릭하면 Canvas 화면으로 이동하며 단어와 증강 조건 및 라운드 전달
            onClick={() =>
              navigate("/canvas", {
                state: {
                  selectedWord: word,
                  augmentation: augmentations[index],
                  round: round,
                  totalScore: totalScore,
                },
              })
            }
          >
            {/* 선택된 단어 표시 */}
            <div className="keyword-box">{word}</div>

            {/* 선택된 증강 조건 표시 */}
            <div className="condition-box">{augmentations[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Choice;
