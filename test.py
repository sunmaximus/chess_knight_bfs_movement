import numpy as np
from chess import node, ShortestPath
import re

source = node(1,1)
target = node(6,6)

chess_board_of_zeros = np.zeros((8,8), dtype=int).tolist()
bin_tree, tree_dict, pathLen = ShortestPath(chess_board_of_zeros, source, target)

paths = str(tree_dict[(6,6,pathLen)])
pattern = r"'(.+?)'"
list_of_paths = re.findall(pattern, paths)[0][1:].replace('(', '[').replace(')', ']').split('/')
list_of_paths = list(map(lambda x: eval(x), list_of_paths))

print(list_of_paths)

# chess_board_of_zeros = [
#   [0, 0, 0, 0, 0, 0, 0, 0],
#   [0, 0, 0, 0, 0, 0, 0, 0],
#   [0, 0, 0, 0, 0, 0, 0, 0],
#   [0, 0, 0, 0, 0, 0, 0, 0],
#   [0, 0, 0, 0, 0, 0, 0, 0],
#   [0, 0, 0, 0, 0, 0, 0, 0],
#   [0, 0, 0, 0, 0, 0, 0, 0],
#   [0, 0, 0, 0, 0, 0, 0, 0]
# ]
