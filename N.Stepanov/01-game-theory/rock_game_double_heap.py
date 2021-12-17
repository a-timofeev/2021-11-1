from typing import Optional

from games import GameState, analyze, SimpleTransition


class State(GameState):
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def is_losing(self) -> bool:
        return self.x + self.y >= 77

    def __str__(self) -> str:
        return f"{self.x:0>2};{self.y:0>2}"


analyze(State(7, 5), [
    SimpleTransition(lambda s: State(s.x * 2, s.y), "x*2"),
    SimpleTransition(lambda s: State(s.x, s.y * 2), "y*2"),
    SimpleTransition(lambda s: State(s.x + 1, s.y), "x+1"),
    SimpleTransition(lambda s: State(s.x, s.y + 1), "y+1"),
])
