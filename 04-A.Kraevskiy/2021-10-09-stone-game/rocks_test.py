import unittest
from operator import add, mul
import rocks

class TestRock(unittest.TestCase):

    def test_do_operation(self):
        self.assertEqual(rocks.do_operation(10, (add, 5)), 15)
        self.assertEqual(rocks.do_operation(9, (mul, 3)), 27)
        self.assertEqual(rocks.do_operation(1, (add, 1)), 2)
        self.assertEqual(rocks.do_operation(5, (mul, 5)), 25)

    def test_reverse_operation(self):        
        self.assertEqual(rocks.reverse_operation(10, (add, 5)), 5)
        self.assertRaises(ArithmeticError, rocks.reverse_operation, 10, (mul, 3))
        self.assertEqual(rocks.reverse_operation(10, (add, 3)), 7)
        self.assertEqual(rocks.reverse_operation(10, (mul, 5)), 2)
        self.assertEqual(rocks.reverse_operation(2, (add, 1)), 1)
        self.assertEqual(rocks.reverse_operation(25, (mul, 5)), 5)

    def test_recursive(self):
        tuples_of_operations = ((add, 1), (add, 2), (mul, 3))
        self.assertEqual(rocks.recursive(0, 34, 35, 0, tuples_of_operations), 1)
        tuples_of_operations1 = ((add, 1), (mul, 3))
        self.assertEqual(rocks.recursive(0, 11, 35, 0, tuples_of_operations1), -1)
        self.assertEqual(rocks.recursive(0, 11, 35, 1, tuples_of_operations1), 2)
        self.assertEqual(rocks.recursive(0, 12, 35, 0, tuples_of_operations1), 1)

    def test_get_S(self):
        tuples_of_operations = ((add, 1), (mul, 2))
        max_rocks = 6
        who_wins = 0
        max_turns_count = 10
        self.assertEqual(min(rocks.get_S(tuples_of_operations, 6, who_wins, max_turns_count)), 1)
        self.assertEqual(min(rocks.get_S(tuples_of_operations, 9, who_wins, max_turns_count)), 2)
        
        # тесты отсюда https://at.pml30.ru/data/ege-inf/petya-i-vanya-statements.png
        tuples_of_operations2 = ((add, 1), (add, 3), (mul, 2))
        self.assertEqual(rocks.get_S(tuples_of_operations2, 39, who_wins, 1), set(range(20, 38 + 1))) #  тест из условия на сайте 1.1
        self.assertTrue(19 in rocks.get_S(tuples_of_operations2, 39, 1, 2)) #  тест из условия на сайте 1.2
        self.assertEqual(rocks.get_S(tuples_of_operations2, 39, 0, 3, 3), {16, 18}) #  тест из условия на сайте 2.1
        
        
        win_first_or_second_turn_when_opponen_playes_not_optimal = rocks.get_S(tuples_of_operations2, 39, 1, 4, 2, False)
        win_second_turn_when_opponent_playes_optimal = rocks.get_S(tuples_of_operations2, 39, 1, 4, 4, True)
        combine = win_first_or_second_turn_when_opponen_playes_not_optimal.intersection(win_second_turn_when_opponent_playes_optimal)
        self.assertEqual(combine, {15, 17}) #  тест из условия на сайте 3.1


        # тесты отсюда https://at.pml30.ru/2020-inf-gia/2020-10-03-inf-demo-2017-problem-26.png
        tuples_of_operations3 = ((add, 1), (mul, 2))
        max_rocks = 20
        min_rocks = 30
        # 1.a.1
        self.assertEqual(rocks.get_S(tuples_of_operations, max_rocks, 0, 1, 1, True, min_rocks), set(range(10, 15 + 1)).union({19}))

    def test_who_has_wining_strategy(self):
        
        # тесты отсюда https://at.pml30.ru/2020-inf-gia/2020-10-03-inf-demo-2017-problem-26.png
        # 1.b.1
        tuples_of_operations = ((add, 1), (mul, 2))
        max_rocks = 20
        min_rocks = 30
        S = [18, 17, 16]
        self.assertEqual(rocks.how_who_wining_strategy(tuples_of_operations, max_rocks, min_rocks, S), [1, 0, 1]) #  Валя, Паша, Валя

        # 2.1
        S = [9, 8]
        self.assertEqual(rocks.how_who_wining_strategy(tuples_of_operations, max_rocks, min_rocks, S), [0, 0]) #  Паша, Паша

        # 3.1
        S = [7]
        self.assertEqual(rocks.how_who_wining_strategy(tuples_of_operations, max_rocks, min_rocks, S), [1]) #  Валя

        

if __name__ == '__main__':
    unittest.main()