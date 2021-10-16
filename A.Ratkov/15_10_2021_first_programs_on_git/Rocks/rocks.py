# Andrew Ratkov 11-1 15.10.2021 rocks

if __name__ == '__main__':
    ROCKS_TO_WIN = 39
    INF = 10 ** 6
    list_of_lengths_of_game = [0 for i in range(ROCKS_TO_WIN)] # iое число показывает, какое оптимальное время будет длиться игра, если Вы ходите первым с i камнями
    list_of_lengths_of_game[0] = -1 # 0 камней в начале быть не может
    how_to_go_if_you_have_i_rocks = [INF for i in range(ROCKS_TO_WIN)] # оптимальный ход, если у Вас i камней. 1 - если += 1; 2 - если *= 2; 3 - если += 3. 
    how_to_go_if_you_have_i_rocks[0] = -1
    for rocks_start_number in range(ROCKS_TO_WIN - 1, 0, -1):
        next_value1 = rocks_start_number + 1
        next_value2 = rocks_start_number * 2
        next_value3 = rocks_start_number + 3
        next_values = [next_value1, next_value2, next_value3]
        if max(next_value1, next_value2, next_value3) >= ROCKS_TO_WIN:
            list_of_lengths_of_game[rocks_start_number] = 1
            how_to_go_if_you_have_i_rocks[rocks_start_number] = 2
        elif min(list_of_lengths_of_game[next_value1] % 2, list_of_lengths_of_game[next_value2] % 2, list_of_lengths_of_game[next_value3] % 2) == 0:
            list_of_lengths_of_game[rocks_start_number] = INF
            for (i, nv) in enumerate(next_values):
                if list_of_lengths_of_game[nv] % 2 == 0 and list_of_lengths_of_game[nv] + 1 < list_of_lengths_of_game[rocks_start_number]:
                    list_of_lengths_of_game[rocks_start_number] = list_of_lengths_of_game[nv] + 1
                    how_to_go_if_you_have_i_rocks[rocks_start_number] = i + 1
        else:
            list_of_lengths_of_game[rocks_start_number] = 0
            for (i, nv) in enumerate(next_values):
                if list_of_lengths_of_game[nv] + 1 > list_of_lengths_of_game[rocks_start_number]:
                    list_of_lengths_of_game[rocks_start_number] = list_of_lengths_of_game[nv] + 1
                    how_to_go_if_you_have_i_rocks[rocks_start_number] = i + 1

    print("Начальное количество камней -- Оптимальное количество ходов -- Победитель -- Оптимальный ход Пети")
    for rocks in range(1, ROCKS_TO_WIN):
        print(rocks, list_of_lengths_of_game[rocks], sep=": ", end=' ')
        if list_of_lengths_of_game[rocks] % 2 == 0:
            print("Vasya", end='; ')
        else:
            print("Petya", end='; ')
        print("type of next move is", how_to_go_if_you_have_i_rocks[rocks])
