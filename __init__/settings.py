# DEFAULT 
SCREEN_WIDTH = 1000  # 가로
SCREEN_HEIGHT = 600  # 세로
BACKGROUND_COLOR = (200, 200, 200)  # 전체 배경 색깔

# MAIN_SCREEN
MAIN_FONT = None  # 폰트 종류
MAIN_FONT_SIZE = 40  # 글자 크기

# MAIN_TITLE
TITLE_IMAGE_X = 198  # 이미지 가로 604 -> 500 - 302 = 198
TITLE_IMAGE_Y = 10  # 이미지 세로 (임의 지정)

# MAIN_BUTTON
MAIN_BUTTON_X1, MAIN_BUTTON_X2, MAIN_BUTTON_X3 = 600, 600, 600  # x축
MAIN_BUTTION_Y1, MAIN_BUTTION_Y2, MAIN_BUTTION_Y3 = 200, 325, 450  # y축
MAIN_BUTTON_WIDTH = 350  # main screen 버튼 가로
MAIN_BUTTON_HEIGHT = 75  # main screen 버튼 세로
MAIN_BUTTON_COLOR = (0, 0, 255)  # 버튼 색깔 (파랑)
MAIN_BUTTON_TEXT_COLOR = (0, 0, 0)  # 버튼 글자 색깔 (검정)

#MAIN_RANK
RANK_X = 50  # 순위표 x축
RANK_Y = 200  # 순위표 y축
RANK_TEXTBOX_WIDTH = 450  # 순위표 크기 (가로)
RANK_TEXTBOX_HEIGHT = 525  # 순위표 크기 (세로)
RANK_TEXT_LINE_HEIGHT = 30  # 줄 간격
RANK_START_PIXEL = 5  # 시작 픽셀 (가로)
RANK_FONT_COLOR = (0, 0, 0)  # 글자 색깔 (검정)
RANK_OUTLINE_COLOR = (0, 0, 0)  # 순위표 테두리 색깔 (검정)

#CREATOR_SCREEN
CREATOR_FONT = None  # 폰트 종류
CREATOR_FONT_SIZE = 40  # 글자 크기
CREATOR_BUTTON_X = 750  #x축
CREATOR_BUTTON_Y = 475  #y축
CREATOR_BUTTON_WIDTH = 220  # creator screen 버튼 가로
CREATOR_BUTTON_HEIGHT = 100  # creator screen 버튼 세로
CREATOR_BUTTON_COLOR = (255, 255, 255)  # 버튼 색깔 (하양)
CREATOR_BUTTON_TEXT_COLOR = (0, 0, 0)  # 버튼 글자 색깔 (검정)

# SELECT_SCREEN
SELECT_FONT = None  # 폰트 종류
SELECT_FONT_SIZE = 40  # 글자 크기
SELECT_BUTTION_X1, SELECT_BUTTION_X2, SELECT_BUTTION_X3 = 50, 360, 670  # x축
SELECT_BUTTON_Y1, SELECT_BUTTON_Y2, SELECT_BUTTON_Y3 = 100, 100, 100  # y축
SELECT_BUTTON_WIDTH = 280  # select screen 버튼 가로
SELECT_BUTTON_HEIGHT = 250  # select screen 버튼 세로
SELECT_BUTTON_COLOR = (0, 0, 255)  # 버튼 색깔 (파랑)
SELECT_BUTTON_TEXT_COLOR = (0, 0, 0)  # 버튼 글자 색깔 (검정)

# DRAWING_SCREEN
DRAW_X = 25
DRAW_Y = 75
DRAW_WIDTH = 500  # 그림판 가로
DRAW_HEIGHT = 500  # 그림판 세로
DRAWING_AREA_COLOR = (255, 255, 255)  # 그림판 배경 색깔 (하양)
DRAWING_OUTLINE_COLOR = (0, 0, 0)  # 그림판 테두리 색깔 (검정)
DRAWING_COLOR = (0, 0, 0)  # 펜 색깔 (검정)
PEN_SIZE = 5  # 펜 사이즈
ERASER_SIZE = 10  # 지우개 사이즈

# MODEL
PREDICT_X = 550  # 모델 예측값 표시 X
PREDICT_Y = 75  # 모델 예측값 표시 Y
PREDICT_TEXTBOX_WIDTH = 200  # 모델 예측값 표시 가로
PREDICT_TEXTBOX_HEIGHT = 500  # 모델 예측값 표시 세로
TEXT_LINE_HEIGHT = 30  # 텍스트 줄 간격
HIGHEST_COLOR = (255, 0, 0)  # 예측값 가장 높은 텍스트(맨 위) (빨강)
OTHER_COLOR = (0, 0, 0)  # 일반 텍스트 (검정)
START_PIXEL = 5  # 문자가 시작하는 위치 (가로 기준)

# GAUGE
GAUGE_WIDTH = 1000  # 가로
GAUGE_HEIGHT = 25  # 세로
DURATION = 20000  # timeout 시간 (밀리초)
DEFUALT_COLOR = (255, 255, 255)  # 빈 게이지 바 색깔 (하양)
FILL_COLOR = (255, 0, 0)  # 채워지는 게이지 바 색깔 (빨강)

# FRAME
FPS = 60  # 루프 속도 조절
