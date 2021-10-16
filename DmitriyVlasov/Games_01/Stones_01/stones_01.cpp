#if 1

#define DEBUG 1

#include <iostream>
#include <fstream>
#include <vector>
#include <functional>
#include <map>

using namespace std;

typedef std::function<int(int)> Move;

struct State
{
  int nOfStones;
  int gameLen;
  bool isWin;
};

#if DEBUG
int runs = 1;
ifstream input("Stones_01/in.txt");
ofstream output("Stones_01/out.txt");
#else
int runs = 1;
istream &input = std::cin;
ostream &output = std::cout;
#endif

const int INF = (int)1e9;


bool isGameOverState(State st)
{
  return st.nOfStones >= 39;
}

void completeGemeOverState(State &st)
{
  st.gameLen = 0;
  st.isWin = false;
}

State getNextState(State &st, Move &mv)
{
  State next = st;
  next.nOfStones = mv(next.nOfStones);
  return next;
}

void completeState(State &cur, vector<Move> &moves, map<int, State> &memory)
{
  if (isGameOverState(cur))
  {
    completeGemeOverState(cur);
    return;
  }


  if (memory.find(cur.nOfStones) != memory.end())
  {
    cur = memory.find(cur.nOfStones)->second;
    return;
  }

  cur.isWin = false;
  int mx = -INF, mn = INF;
  for (Move mv : moves)
  {
    State next = getNextState(cur, mv);
    completeState(next, moves, memory);

    if (next.isWin == false)  // win
    {
      cur.isWin = true;
      mn = min(mn, next.gameLen + 1);
    }
    else                      // lose
      mx = max(mx, next.gameLen + 1);
  }

  cur.gameLen = mn * cur.isWin + mx * !cur.isWin;
  memory.insert({cur.nOfStones, cur});
}

int main()
{
  while (runs-- > 0)
  {
    vector<Move> moves = {
      [](int x) { return x + 1; },
      [](int x) { return x + 3; },
      [](int x) { return x * 2; }
    };

    map<int, State> memory;

    vector<int> ans;
    for (int i = 1; i < 39; i++)
    {
      State st = {i};
      completeState(st, moves, memory);
      if (st.gameLen == 4)
        ans.push_back(i);
    }

    for (int i = 0; i < ans.size(); i++)
      output << ans[i] << (i == ans.size() - 1 ? "\n" : " ");

  }

  return 0;
}


#endif
