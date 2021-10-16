def possible_moves(current_word, words_list):
    answer_set = set()
    for word in words_list:
        if word.startswith(current_word):
            answer_set.add(word[len(current_word)])
    return answer_set


def rec(words_list, current_word=''):
    if current_word in words_list:
        return {current_word,}
    
    if len(current_word) % 2 == 1: #  если ходит нечётный то ему для победы нужен вариант с нечётным количеством букв
        win_variants = set()
        lose_variants = set()
        for word in possible_moves(current_word, words_list):
            res = rec(words_list, current_word + word)
            if len(list(res)[0]) % 2 == 0:
                win_variants |= res
            else:
                lose_variants |= res
    else:
        win_variants = set()
        lose_variants = set()
        for word in possible_moves(current_word, words_list):
            res = rec(words_list, current_word + word)
            if len(list(res)[0]) % 2 == 1:
                win_variants |= res
            else:
                lose_variants |= res
    if win_variants:
        return win_variants
    else:
        return lose_variants


def who_has_win_strategy(words_list):
    return 1 - len(list(rec(words_list))[0]) % 2


