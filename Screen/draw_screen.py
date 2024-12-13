import pygame
from __init__.settings import *

import string # 테스트용 추후 삭제!!
import random  # 테스트용 추후 삭제!!


# Pygame 초기화
pygame.init()

# 폰트 설정
font = pygame.font.Font(None, 20)

# 화면 클래스 정의
class DrawScreen:
    def __init__(self, screen):
        self.screen = screen
        
        # Draw 
        self.drawing_area = pygame.Rect(DRAW_X, DRAW_Y, DRAW_WIDTH, DRAW_HEIGHT)
        self.canvas = pygame.Surface((DRAW_WIDTH, DRAW_HEIGHT))  # 그림판용 서피스
        self.canvas.fill(DRAWING_AREA_COLOR)  # 서피스 초기화
        
        self.drawing = False
        self.erasing = False
        self.last_pos = None
        
        # model_predict
        self.predict_area = pygame.Rect(PREDICT_X, PREDICT_Y, PREDICT_TEXTBOX_WIDTH, PREDICT_TEXTBOX_HEIGHT)  # 출력 창 위치와 크기
        self.model_canvas = pygame.Surface(self.predict_area.size)  # 출력 창용 Surface
        self.model_canvas.fill(BACKGROUND_COLOR)  # 서피스 초기화
        self.text_list = []
        
        # 랜덤 시드(테스트용 추후 삭제)
        random.seed(a=None, version=2)
        
        #timeout_gauge
        self.gauge_rect = pygame.Rect((0, 0), (GAUGE_WIDTH, GAUGE_HEIGHT))  # 게이지 바 위치와 크기
        self.start_time = pygame.time.get_ticks()  # 시작 시간 기록
        self.duration = DURATION  # 20초 (밀리초)
        self.gauge_fill_width = 1
        
    def timeout_checker(self):
        # 현재 시간 계산
        elapsed_time = pygame.time.get_ticks() - self.start_time
        progress = min(elapsed_time / self.duration, 1)  # 진행률 (0~1 사이 값)

        # 게이지바 길이 계산
        self.gauge_fill_width = int(GAUGE_WIDTH * progress)
        
        return elapsed_time
    

    def render(self):
        self.screen.blit(self.canvas, (DRAW_X, DRAW_Y))  # 그림판 
        self.screen.blit(self.model_canvas, self.predict_area.topleft)  # 모델 예측값 text
        pygame.draw.rect(self.screen, DRAWING_OUTLINE_COLOR, self.drawing_area, 1)  # 그림판 테두리
        
        pygame.draw.rect(self.screen, DEFUALT_COLOR, self.gauge_rect)  # 게이지 바 배경
        pygame.draw.rect(self.screen, FILL_COLOR, (self.gauge_rect.x, self.gauge_rect.y, self.gauge_fill_width, GAUGE_HEIGHT))  # 게이지 바 진행
        

    def handle_events(self, events):
        for event in events: 
            # 마우스 클릭
            if event.type == pygame.MOUSEBUTTONDOWN: 
                # 좌클릭 + 그림판 박스 내부일 때 ==> 펜
                if event.button == 1 and self.drawing_area.collidepoint(event.pos):
                    self.drawing = True
                    self.last_pos = (event.pos[0] - DRAW_X, event.pos[1] - DRAW_Y)
                
                # 우클릭 + 그림판 박스 내부일 때 ==> 지우개
                if event.button == 3 and self.drawing_area.collidepoint(event.pos):
                    self.erasing = True
                    self.last_pos = (event.pos[0] - DRAW_X, event.pos[1] - DRAW_Y)
            
            # 마우스 클릭 끝
            elif event.type == pygame.MOUSEBUTTONUP:
                if event.button in (1, 3):
                    # 그림 그리기 상태 해제
                    self.drawing = False
                    self.erasing = False
                    
                    # 모델 예측값 출력
                    self.model_canvas.fill(BACKGROUND_COLOR)  # model_canvas 초기화
                    # 테스트용 랜덤값 입력
                    for i in range(10):
                        string_pool = string.ascii_uppercase
                        result = ""
                        for i in range(5):
                            result += random.choice(string_pool)
                        self.text_list.append(result)

                    for i, line in enumerate(self.text_list[-self.predict_area.height // TEXT_LINE_HEIGHT:]):  # 창에 맞는 텍스트만 렌더링
                        color = HIGHEST_COLOR if i == 0 else OTHER_COLOR  # 맨 위의 텍스트만 빨갛게 표시
                        text_surface = font.render(line, True, color)
                        self.model_canvas.blit(text_surface, (START_PIXEL, i * TEXT_LINE_HEIGHT))
            
            # 마우스를 움직일 때
            elif event.type == pygame.MOUSEMOTION:
                new_pos = (event.pos[0] - DRAW_X, event.pos[1] - DRAW_Y)
                
                # 마우스 좌클릭 중일 때 ==> 펜
                if self.drawing:
                    pygame.draw.line(self.canvas, DRAWING_COLOR, self.last_pos, new_pos, PEN_SIZE)
                # 마우스 우클릭 중일 때 ==> 지우개
                elif self.erasing:
                        pygame.draw.line(self.canvas, DRAWING_AREA_COLOR, self.last_pos, new_pos, ERASER_SIZE)
                
                self.last_pos = new_pos
                
        return "draw_screen"  # 상태 유지
