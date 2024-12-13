import pygame
from __init__.settings import *
from __init__.state_manager import StateManager

# Pygame 초기화
pygame.init()

# 화면 크기 설정
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))

#화면 타이틀 설정
pygame.display.set_caption("Doki-Doki Catch my mind")

# stage 관리
state_manager = StateManager(screen)

# 상태 초기화
current_state_name = "main_screen"
current_state = state_manager.switch_state(current_state_name)

# 프레임 고정
clock = pygame.time.Clock()

# 메인 루프
running = True
while running:
    events = pygame.event.get()
    for event in events:
        if event.type == pygame.QUIT:
            running = False    
    
    # 현재 상태에 따라 화면 렌더링 및 이벤트 처리
    screen.fill(BACKGROUND_COLOR)  # 기본 배경 초기화
    current_state.render()
    next_state_name = current_state.handle_events(events)
    
    # Draw 전용 게이지바 (select_screen에도 쓸 수 있을거 같음)
    if current_state_name == "draw_screen":
        elapsed_time = current_state.timeout_checker()
        if elapsed_time >= current_state.duration:
            next_state_name = "select_screen"

    # 상태 전환
    if next_state_name != current_state_name:
        current_state_name = next_state_name
        current_state = state_manager.switch_state(current_state_name)

    pygame.display.update()
    clock.tick(FPS)
    
pygame.quit()
