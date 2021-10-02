import unittest
import words


class TestRock(unittest.TestCase):
    def test_possible_moves(self):
        words_list = ["МАК", "МЫЛО", "РАМА", "РАК"]
        self.assertEqual(words.possible_moves("М", words_list), {"А", "Ы"})
        self.assertEqual(words.possible_moves("РА", words_list), {"М", "К"})
        self.assertEqual(words.possible_moves("МЫ", words_list), {"Л"})
        self.assertEqual(words.possible_moves("", words_list), {"М", "Р"})

    def test_rec(self):
        words_list = ["МАК", "МЫЛО", "РАМА", "РАК"]
        self.assertEqual(words.rec(words_list), {"РАК"})
        self.assertEqual(words.rec({"ВАРЕНЬЕ", "КОРОВА"}), {"ВАРЕНЬЕ"})
        self.assertEqual(words.rec({"НУБ" * 55, "PUMA" * 32}), {"НУБ" * 55})
        self.assertEqual(
            words.rec({"МОРОКА", "МОРС", "МОРОЗ", "ПЛАХА", "ПЛАТЬЕ", "ПЛОМБА"}),
            {"ПЛАТЬЕ", "ПЛОМБА", "МОРС"},
        )

    def test_who_has_win_strategy(self):

        self.assertEqual(words.who_has_win_strategy({"МАК", "МЫЛО", "РАМА", "РАК"}), 0)
        self.assertEqual(words.who_has_win_strategy({"ВАРЕНЬЕ", "КОРОВА"}), 0)
        self.assertEqual(words.who_has_win_strategy({"НУБ" * 55, "PUMA" * 32}), 0)
        self.assertEqual(
            words.who_has_win_strategy({"МОРОКА", "МОРС", "МОРОЗ", "ПЛАХА", "ПЛАТЬЕ", "ПЛОМБА"}), 1
        )


if __name__ == "__main__":
    unittest.main()
