# https://stackoverflow.com/questions/39607721/number-of-shortest-paths
# http://www.techiedelight.com/chess-knight-problem-find-shortest-path-source-destination/
dist = {}
ways = {}

def bfs():
  start = 1,1
  goal = 6,6

  queue = [start]
  dist[start] = 0
  ways[start] = 1

  while len(queue):
    cur = queue[0]
    queue.pop(0)
    if cur == goal:
      print ("reached goal in %d moves and %d ways" % (dist[cur],ways[cur]))
      return

    for move in [ (1,2),(2,1),(-1,-2),(-2,-1),(1,-2),(-1,2),(-2,1),(2,-1) ]:
      next_pos = cur[0]+move[0], cur[1]+move[1]
      if next_pos[0] > goal[0] or next_pos[1] > goal[1] or next_pos[0] < 1 or next_pos[1] < 1:
        pass
      if next_pos in dist and dist[next_pos] == dist[cur]+1:
        ways[next_pos] += ways[cur]
      if next_pos not in dist:
        dist[next_pos] = dist[cur]+1
        ways[next_pos] = ways[cur]
        queue.append(next_pos)

bfs()