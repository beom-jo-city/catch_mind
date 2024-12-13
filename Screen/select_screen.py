import pygame
from __init__.settings import *

# Pygame 초기화
pygame.init()

# 폰트 설정
font = pygame.font.Font(SELECT_FONT, SELECT_FONT_SIZE)

# 화면 클래스 정의
class SelectScreen:
    def __init__(self, screen):
        self.screen = screen
        self.select1 = pygame.Rect(SELECT_BUTTION_X1, SELECT_BUTTON_Y1, SELECT_BUTTON_WIDTH, SELECT_BUTTON_HEIGHT)  # 증강 버튼 1
        self.select2 = pygame.Rect(SELECT_BUTTION_X2, SELECT_BUTTON_Y2, SELECT_BUTTON_WIDTH, SELECT_BUTTON_HEIGHT)  # 증강 버튼 2
        self.select3 = pygame.Rect(SELECT_BUTTION_X3, SELECT_BUTTON_Y3, SELECT_BUTTON_WIDTH, SELECT_BUTTON_HEIGHT)  # 증강 버튼 3

    def render(self):
        pygame.draw.rect(self.screen, SELECT_BUTTON_COLOR, self.select1)
        pygame.draw.rect(self.screen, SELECT_BUTTON_COLOR, self.select2)
        pygame.draw.rect(self.screen, SELECT_BUTTON_COLOR, self.select3)
        
        text_s1 = font.render("class1", True, SELECT_BUTTON_TEXT_COLOR)
        text_rect_s1 = text_s1.get_rect(center=self.select1.center)
        self.screen.blit(text_s1, text_rect_s1)
        
        text_s2 = font.render("class2", True, SELECT_BUTTON_TEXT_COLOR)
        text_rect_s2 = text_s2.get_rect(center=self.select2.center)
        self.screen.blit(text_s2, text_rect_s2)
        
        text_s3 = font.render("class3", True, SELECT_BUTTON_TEXT_COLOR)
        text_rect_s3 = text_s3.get_rect(center=self.select3.center)
        self.screen.blit(text_s3, text_rect_s3)

    def handle_events(self, events):
        for event in events:
            # 제시어만 다르고 이동은 똑같게 함 (제시어 아직 구현 못함)
            if event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1 and self.select1.collidepoint(event.pos):
                    return "draw_screen"
                elif event.button == 1 and self.select2.collidepoint(event.pos):
                    return "draw_screen"
                elif event.button == 1 and self.select3.collidepoint(event.pos):
                    return "draw_screen"
                
        return "select_screen"  # 상태 유지
