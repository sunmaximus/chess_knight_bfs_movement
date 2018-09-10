import collections
import numpy as np
from anytree import Node, RenderTree
import re

def check(grid, x, y, visited):
    m, n = len(grid), len(grid[0])
    if x >= 0 and x < m and y >= 0 and y < n \
              and (x, y) not in visited and not grid[x][y]:
        return True
    else:
        return False

def ShortestPath(grid, source, destination):
    tree_graph = {}
    root_node = Node(str((source.x, source.y, 0)))
    tree_graph[(source.x, source.y, 0)] = root_node

    queue = collections.deque([(source.x, source.y, 0)])
    visited = set()
    dirs = [
        (1,2),   #1
        (1,-2),  #2
        (-1,2),  #3
        (-1,-2), #4
        (2,1),   #5
        (2,-1),  #6
        (-2,1),  #7
        (-2,-2)  #8
    ]

    while queue:
        size = len(queue)
        for i in range(size):
            x, y, pathLen = queue.popleft()
            if x == destination.x and y == destination.y:                
                print(x, y, pathLen)
                # for pre, fill, node in RenderTree(root_node):
                #     print("%s%s" % (pre, node.name))
                return (root_node, tree_graph, pathLen)
            
            for dx, dy in dirs:
                nx = x + dx
                ny = y + dy

                if check(grid, x, y, visited):
                    if nx >= 0 and ny >= 0 and nx <= 7 and ny <= 7:
                        tree_graph[(nx, ny, pathLen + 1)] = Node(str((nx, ny, pathLen + 1)), parent=tree_graph[(x, y, pathLen)])

                    queue.append((nx, ny, pathLen + 1))
                    visited.add((nx, ny, pathLen + 1))

    return -1


class node:
    def __init__(self, x, y):
        self.x = x
        self.y = y
