import collections


def check(self, grid, x, y, visited):
    m, n = len(grid), len(grid[0])
    if x >= 0 and x < m and y >= 0 and y < n \
                and (x, y) not in visited and not grid[x][y]:
        return True
    else:
        return False

def ShortestPath(grid, source, destination):

    queue = collections.deque([(source.x, source.y, 0)])

    m, n = len(grid), len(grid[0])
    visited = set()
    dirs = [
        (1,2),
        (1,-2),
        (-1,2),
        (-1,-2),
        (2,1),
        (2,-1),
        (-2,1),
        (-2,-2)
    ]


  
    while queue:
        size = len(queue)
        for i in range(size):
            x, y, pathLen = queue.popleft()
            if x == destination.x and y == destination.y:
                # print(queue)
                tx, ty, tpathLen = queue.popleft()
                # print(x, y, pathLen)
                # print(tx, ty, tpathLen)
                return pathLen
            
            for dx, dy in dirs:
                nx = x + dx
                ny = y + dy

                nb = False

                if x >= 0 and x < m and y >= 0 and y < n \
                        and (x, y) not in visited and not grid[x][y]:
                    nb = True

                if nb:
                    if nx >= 0 and ny >= 0 and nx <= 7 and ny <= 7:
                        print( (nx, ny, pathLen + 1), (x, y, pathLen) )

                    queue.append((nx, ny, pathLen + 1))
                    visited.add((nx, ny, pathLen + 1))

    return -1


class Node:
    def __init__(self, x, y):
        self.x = x
        self.y = y


source = Node(1,1)
target = Node(6,6)

t = [ [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ] ]

a = ShortestPath(t, source, target)
