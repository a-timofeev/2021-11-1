def str2list(s):
    a = []
    total_number = ''
    for el in s:
        if el == '\t' or el == ' ':
            a.append(int(total_number))
            total_number = ''
        else:
            total_number += el
    if len(total_number) > 0:
        a.append(int(total_number))
    return a


def make_a_matrix(input_file):
    f = open(input_file)
    arr = []
    for line in f:
        arr.append(str2list(line))
    return arr


if __name__ == '__main__':
    arr = make_a_matrix('table_from_excel_converted_into_txt.txt')
    for el in arr:
        print(*el)
