import pygame
from __init__.settings import *

# Pygame 초기화
pygame.init()

# 폰트 설정
font = pygame.font.Font(CREATOR_FONT, CREATOR_FONT_SIZE)

# 화면 클래스 정의
class CreatorScreen:
    def __init__(self, screen):
        self.screen = screen
        self.backtomain = pygame.Rect(CREATOR_BUTTON_X, CREATOR_BUTTON_Y, CREATOR_BUTTON_WIDTH, CREATOR_BUTTON_HEIGHT)  # 메뉴로 돌아가기
        self.image = pygame.image.load("image\creators.png")
        
    # 화면에 띄우는 함수
    def render(self):
        self.screen.blit(self.image, (0,0))
        pygame.draw.rect(self.screen, CREATOR_BUTTON_COLOR, self.backtomain)
        
        text_back = font.render("BACK TO MAIN", True, CREATOR_BUTTON_TEXT_COLOR)
        text_rect_back = text_back.get_rect(center=self.backtomain.center)
        self.screen.blit(text_back, text_rect_back)
        
    def handle_events(self, events):
        for event in events:
            # 버튼 위에서 좌클릭 했을 때
            if event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1 and self.backtomain.collidepoint(event.pos):  # start 버튼
                    return "main_screen"
                
        return "creator_screen"  # 상태 유지
