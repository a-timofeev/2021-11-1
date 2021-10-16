from operator import add, mul
from functools import cache
from types import FunctionType




def do_operation(first, operation):
    return operation[0](first, operation[1])


def reverse_operation(first, operation):
    if operation[0] == mul and first % operation[1]:
        raise ArithmeticError()
    if operation[0] == mul:
        return first // operation[1]
    return first - operation[1]

@cache
def recursive(who_turn, rocks_number, max_rocks, who_must_wins, tuples_of_operations, optimal_opponent_game=True, min_rocks=float('inf'), depth=0):
    a = (max_rocks, who_must_wins, tuples_of_operations, optimal_opponent_game, min_rocks, depth + 1)
    if rocks_number >= max_rocks:
        if rocks_number <= min_rocks:
            return depth if who_turn != who_must_wins else -1
        else:
            return  depth if who_turn == who_must_wins else -1
    
    
    if who_turn == who_must_wins:
        is_win = False
        _depth = float('inf')
        for op in tuples_of_operations:
            res = recursive(1 - who_turn, do_operation(rocks_number, op), *a)
            if res != -1:
                is_win = True
                _depth = min(_depth, res)
    else:
        if optimal_opponent_game:
            is_win = True
            _depth = 0
            for op in tuples_of_operations:
                res = recursive(1 - who_turn, do_operation(rocks_number, op), *a)
                if res != -1:
                    _depth = max(_depth, res)
                else:
                    is_win = False
                    _depth = max(_depth, res)
                    break
        else:
            is_win = False
            _depth = 0
            for op in tuples_of_operations:
                res = recursive(1 - who_turn, do_operation(rocks_number, op), *a)
                if res != -1:
                    _depth = max(_depth, res)
                    is_win = True
                else:
                    _depth = max(_depth, res)
                    break

    return _depth if is_win else -1

def get_S(tuples_of_operations: tuple[tuple[FunctionType, int]], max_rocks, who_wins, max_turns_count=float('inf'), min_turns_count=0, optimal_opponent_game=True, min_rocks=float('inf')):
    all_s = set()
    for S in range(1, max_rocks):  # перебираем все начальные состояния
        res = recursive(0, S, max_rocks, who_wins, tuples_of_operations, optimal_opponent_game, min_rocks)
        if min_turns_count <= res <= max_turns_count:
            all_s.add(S)
    
    return all_s

def how_who_wining_strategy(tuples_of_operations, max_rocks, min_rocks, S):
    answer_list = []
    for s in S:
        if -1 == recursive(0, s, max_rocks, 0, tuples_of_operations, min_rocks=min_rocks):
            answer_list.append(1)
        else:
            answer_list.append(0)
    return answer_list




if __name__ == '__main__':
    strings_operations = input().split()  # данные принимаются в формате "+1 *2 +4"
    max_rocks = int(input())
    who_must_wins = 0 if input()[0] == "П" else 1


    tuples_of_operations = tuple(
        map(
            lambda value: ({"+": add, "*": mul}[value[0]], int(value[1:])),
            strings_operations,
        )
    )
    get_S(tuples_of_operations, max_rocks, who_must_wins)
