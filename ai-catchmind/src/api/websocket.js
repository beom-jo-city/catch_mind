// WebSocketClient 클래스: WebSocket 연결과 통신을 관리
export class WebSocketClient {
    constructor(url) {
      this.url = url; // WebSocket 서버 URL
      this.socket = null; // WebSocket 객체
      this.isConnected = false; // 연결 상태 추적
      this.callbacks = {
        onOpen: () => {}, // WebSocket 연결 성공 시 실행할 콜백
        onMessage: () => {}, // 서버에서 메시지 수신 시 실행할 콜백
        onClose: () => {}, // WebSocket 연결 종료 시 실행할 콜백
        onError: () => {}, // WebSocket 오류 발생 시 실행할 콜백
      };
    }
  
    // WebSocket 연결
    connect() {
      this.socket = new WebSocket(this.url); // WebSocket 객체 생성
  
      // 연결 성공 시 실행
      this.socket.onopen = () => {
        this.isConnected = true; // 연결 상태 업데이트
        console.log("WebSocket connected."); // 연결 확인 로그
        this.callbacks.onOpen(); // 연결 성공 콜백 호출
      };
  
      // 서버에서 메시지 수신 시 실행
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data); // 서버에서 받은 JSON 데이터
        console.log("WebSocket message received:", data); // 수신 데이터 로그
        this.callbacks.onMessage(data); // 메시지 수신 콜백 호출
      };
  
      // WebSocket 연결 종료 시 실행
      this.socket.onclose = () => {
        this.isConnected = false; // 연결 상태 업데이트
        console.log("WebSocket disconnected."); // 연결 종료 로그
        this.callbacks.onClose(); // 연결 종료 콜백 호출
      };
  
      // WebSocket 오류 발생 시 실행
      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error); // 오류 로그
        this.callbacks.onError(error); // 오류 발생 콜백 호출
      };
    }
  
    // 데이터를 서버로 전송
    send(data) {
      if (this.isConnected) {
        this.socket.send(JSON.stringify(data)); // JSON 데이터 전송
      } else {
        console.error("WebSocket is not connected."); // 연결 오류 로그
      }
    }
  
    // WebSocket 연결 종료
    close() {
      if (this.socket) {
        this.socket.close(); // WebSocket 닫기
      }
    }
  
    // 특정 이벤트의 콜백 설정
    on(event, callback) {
      if (this.callbacks[event]) {
        this.callbacks[event] = callback; // 해당 이벤트의 콜백 업데이트
      }
    }
  }
  