import { useRef, useEffect, useState } from "react";

// 캔버스 드로잉 관리 커스텀 훅
export const useCanvas = (sendCanvasDataToWebSocket) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 캔버스 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    const size = 400; // 캔버스 크기(정방향)
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    context.strokeStyle = "black"; // 선 색상
    context.lineWidth = 2; // 선 굵기
    contextRef.current = context;
  }, []);

  // 드로잉 시작
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // 드로잉 중
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  // 드로잉 종료
  const finishDrawing = () => {
    setIsDrawing(false);
    contextRef.current.closePath();
    sendCanvasDataToWebSocket(); // WebSocket으로 캔버스 데이터 전송
  };

  return { canvasRef, startDrawing, draw, finishDrawing };
};
