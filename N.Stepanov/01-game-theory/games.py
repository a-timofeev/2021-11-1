from abc import ABC, abstractmethod
from typing import Generic, TypeVar, List, Callable, Tuple, Any
import re

from colorama import init, Fore
init()


T = TypeVar('T', bound="GameState")


class GameState(ABC):
    @abstractmethod
    def is_losing(self) -> bool:
        ...

    @abstractmethod
    def __str__(self) -> str:
        ...


class Transition(ABC, Generic[T]):
    def is_applicable(self, state: T) -> bool:
        return True

    @abstractmethod
    def translate(self, state: T) -> T:
        ...

    @abstractmethod
    def __str__(self) -> str:
        ...


class SimpleTransition(Transition):
    def __init__(self, transition: Callable[[T], T], symbol: str,
                 is_applicable: Callable[[T], bool] = None):
        self.transition = transition
        self.symbol = symbol
        if is_applicable is None:
            self._is_applicable = lambda x: True
        else:
            self._is_applicable = is_applicable

    def is_applicable(self, state: T) -> bool:
        return self._is_applicable(state)

    def translate(self, state: T) -> T:
        return self.transition(state)

    def __str__(self):
        return self.symbol


def true_len(s: str):
    esc = "\x1b"
    return len(re.sub(esc + r'\[\d+m', '', s))


def prefixed_first(prefix: List[Any], tail: List[List[Any]]) -> List[List[Any]]:
    result = [prefix + tail[0]]
    prefix_size = true_len("".join(prefix))
    for right in tail[1:]:
        result.append([" " * prefix_size] + right)
    return result


def red(s): return f"{Fore.RED}{s}{Fore.RESET}"


def green(s): return f"{Fore.GREEN}{s}{Fore.RESET}"


def yellow(s): return f"{Fore.YELLOW}{s}{Fore.RESET}"


def blue(s): return f"{Fore.BLUE}{s}{Fore.RESET}"


def analyze(initial_state: T, transitions: List[Transition[T]]):
    def analyze_recursively(state: T, prefix: List[str], first: bool) -> Tuple[bool, List[List[str]]]:
        if state.is_losing():
            return False, [prefix + [f"{red(state)}"]]

        transition_color = blue if first else yellow

        terminal = True
        winning_translation = None
        winning_protocol = None
        result = []

        for transition in transitions:
            if transition.is_applicable(state):
                terminal = False

                analysis_result = analyze_recursively(
                    transition.translate(state),
                    ["> "],
                    not first
                )

                if not analysis_result[0]:
                    winning_translation = transition
                    winning_protocol = analysis_result[1]
                    break

                result += prefixed_first(
                    prefix +
                    [f"{red(state)} --{transition_color(transition)}--"], analysis_result[1]
                )

        if winning_translation:
            return (
                True,
                prefixed_first(
                    prefix + [f"{green(state)} --{transition_color(winning_translation)}--"],
                    winning_protocol
                )
            )

        if terminal:
            return False, [prefix + [f"{red(state)} --{red('X')}-->"]]

        return False, result

    final_result = analyze_recursively(initial_state, [], True)

    verdict = green('winning') if final_result[0] else red('losing')
    print(f"Game is {verdict} for {blue('player one')}")
    for line in final_result[1]:
        print("".join(line))
