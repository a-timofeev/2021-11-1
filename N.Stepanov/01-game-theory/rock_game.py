from games import GameState, analyze, SimpleTransition


class State(GameState):
    def __init__(self, x: int):
        self.x = x

    def is_losing(self) -> bool:
        return self.x >= 39

    def __str__(self) -> str:
        return f"{self.x:>2}"


analyze(State(7), [
    SimpleTransition(lambda s: State(s.x * 2), "*2"),
    SimpleTransition(lambda s: State(s.x + 3), "+3"),
    SimpleTransition(lambda s: State(s.x + 1), "+1"),
])
