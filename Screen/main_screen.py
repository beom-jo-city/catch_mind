import sys
import json
import pygame
from __init__.settings import *

# Pygame 초기화
pygame.init()

# 폰트 설정
font = pygame.font.Font(MAIN_FONT, MAIN_FONT_SIZE)

# 화면 클래스 정의
class MainScreen:
    def __init__(self, screen):
        self.screen = screen
        # 타이틀
        self.image = pygame.image.load("image/title.png")
        
        # 버튼
        self.b_start = pygame.Rect(MAIN_BUTTON_X1, MAIN_BUTTION_Y1, MAIN_BUTTON_WIDTH, MAIN_BUTTON_HEIGHT)  # start 버튼
        self.b_quit = pygame.Rect(MAIN_BUTTON_X2, MAIN_BUTTION_Y2, MAIN_BUTTON_WIDTH, MAIN_BUTTON_HEIGHT)  # quit 버튼
        self.b_maker = pygame.Rect(MAIN_BUTTON_X3, MAIN_BUTTION_Y3, MAIN_BUTTON_WIDTH, MAIN_BUTTON_HEIGHT)  # 만든 사람들 버튼
        
        # 랭킹/리더보드
        self.ranking = pygame.Rect(RANK_X, RANK_Y, RANK_TEXTBOX_WIDTH, RANK_TEXTBOX_HEIGHT)  # 출력 창 위치와 크기
        self.rank_canvas = pygame.Surface(self.ranking.size)  # 출력 창 용 Surface
        self.rank_canvas.fill(BACKGROUND_COLOR)  # 서피스 초기화
        with open("leaderboard/ranking_data.json", 'r') as f:
            self.text_dic = json.load(f)
        self.text_list = []
        self.rank_string()
    
    # 랭킹 정렬 및 전처리
    def rank_string(self):
        self.text_list.clear()  # 기존 리스트 초기화
        ls = sorted(self.text_dic.items(), key=lambda x: x[1], reverse=True)
        for idx, (key, value) in enumerate(ls):
            self.text_list.append(f"{idx+1}  |       {key}       ||    {value}")
    
    # 랭킹 출력
    def print_ranking(self):
        self.rank_canvas.fill(BACKGROUND_COLOR)  # 캔버스 초기화
        for i, line in enumerate(self.text_list[-self.ranking.height // RANK_TEXT_LINE_HEIGHT:]):  # 창에 맞는 텍스트만 렌더링
            text_surface = font.render(line, True, RANK_FONT_COLOR)
            self.rank_canvas.blit(text_surface, (RANK_START_PIXEL, i * RANK_TEXT_LINE_HEIGHT))
    
    def render(self):
        # 타이틀
        self.screen.blit(self.image, (TITLE_IMAGE_X,TITLE_IMAGE_Y))
        
        # 버튼
        pygame.draw.rect(self.screen, MAIN_BUTTON_COLOR, self.b_start)
        pygame.draw.rect(self.screen, MAIN_BUTTON_COLOR, self.b_quit)
        pygame.draw.rect(self.screen, MAIN_BUTTON_COLOR, self.b_maker)
        
        text_start = font.render("Start", True, MAIN_BUTTON_TEXT_COLOR)
        text_rect_start = text_start.get_rect(center=self.b_start.center)
        self.screen.blit(text_start, text_rect_start)
        
        text_quit = font.render("Quit", True, MAIN_BUTTON_TEXT_COLOR)
        text_rect_quit = text_quit.get_rect(center=self.b_quit.center)
        self.screen.blit(text_quit, text_rect_quit)
        
        text_maker = font.render("Producer", True, MAIN_BUTTON_TEXT_COLOR)
        text_rect_maker = text_maker.get_rect(center=self.b_maker.center)
        self.screen.blit(text_maker, text_rect_maker)
        
        # 랭킹/리더보드
        self.print_ranking()
        self.screen.blit(self.rank_canvas, self.ranking.topleft)  # 모델 예측값 text
        pygame.draw.rect(self.screen, RANK_OUTLINE_COLOR, self.ranking, 1)  # 그림판 테두리
        
    def handle_events(self, events):
        for event in events:
            # 버튼 위에서 좌클릭 했을 때
            if event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1 and self.b_start.collidepoint(event.pos):  # start 버튼
                    return "select_screen"
                elif event.button == 1 and self.b_quit.collidepoint(event.pos):  # quit 버튼
                    pygame.quit()
                    sys.exit()
                elif event.button == 1 and self.b_maker.collidepoint(event.pos):  # 만든사람들 버튼
                    return "creator_screen"  # 만든 사람 띄워주는 창으로 이동
                
        return "main_screen"  # 상태 유지
