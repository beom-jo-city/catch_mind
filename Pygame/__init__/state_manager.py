import gc
from Screen.main_screen import MainScreen
from Screen.creator_screen import CreatorScreen
from Screen.select_screen import SelectScreen
from Screen.draw_screen import DrawScreen

class StateManager:
    def __init__(self, screen):
        self.screen = screen
        self.current_state = None

    def switch_state(self, state_name):
        # 현재 상태 객체 제거
        if self.current_state is not None:
            del self.current_state
            gc.collect()
            self.current_state = None

        # 새 상태 객체 생성
        if state_name == "main_screen":
            self.current_state = MainScreen(self.screen)
        elif state_name == "creator_screen":
            self.current_state = CreatorScreen(self.screen)
        elif state_name == "select_screen":
            self.current_state = SelectScreen(self.screen)
        elif state_name == "draw_screen":
            self.current_state = DrawScreen(self.screen)

        return self.current_state
