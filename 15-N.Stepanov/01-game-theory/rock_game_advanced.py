from typing import Optional

from games import GameState, analyze, SimpleTransition


class State(GameState):
    def __init__(self, x: Optional[int]):
        self.x = x

    def is_losing(self) -> bool:
        return self.x is None or 30 >= self.x >= 20

    def __str__(self) -> str:
        if self.x is not None:
            return f"{self.x:>2}"
        else:
            return "!!"


analyze(State(1), [
    SimpleTransition(lambda s: State(None), "--", lambda s: s.x > 30),
    SimpleTransition(lambda s: State(s.x * 2), "*2", lambda s: s.x < 30),
    SimpleTransition(lambda s: State(s.x + 1), "+1", lambda s: s.x < 30),
])
