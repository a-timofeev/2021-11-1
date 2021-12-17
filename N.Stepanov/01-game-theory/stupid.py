whitelist = ["МОРОКА", "МОРС", "МОРОЗ", "ПЛАХА", "ПЛАТЬЕ", "ПЛОМБА"]


def analyze(s, pref):
    if s in whitelist:
        return False, [f"{pref:<6} {s} - LOSING"]

    results = []
    for word in whitelist:
        if word.startswith(s):
            result = analyze(s + word[len(s)], f"{pref:<6} --{word:<6}-->")
            if not result[0]:
                return True, result[1]
            results += result[1]

    return False, results


for line in analyze("", "")[1]:
    print(line)
