from games import GameState, analyze, Transition

whitelist = ["МОРОКА", "МОРС", "МОРОЗ", "ПЛАХА", "ПЛАТЬЕ", "ПЛОМБА"]


class State(GameState):
    def __init__(self, x: str):
        self.x = x

    def is_losing(self) -> bool:
        return self.x in whitelist

    def __str__(self) -> str:
        return "{0:_<{1}}".format(self.x, max(len(w) for w in whitelist))


class StringTransition(Transition):
    def __init__(self, word_index: int):
        self.word_index = word_index

    def is_applicable(self, state: State) -> bool:
        return whitelist[self.word_index].startswith(state.x)

    def translate(self, state: State) -> State:
        return State(state.x + whitelist[self.word_index][len(state.x)])

    def __str__(self) -> str:
        return "{0:^{1}}".format(whitelist[self.word_index], max(len(w) for w in whitelist))


analyze(State(""), [
    StringTransition(i) for i in range(len(whitelist))
])
