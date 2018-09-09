from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import numpy as np
from chess import node, ShortestPath, RenderTree
import re

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/shortestpath', methods=['GET'])
def shortestpath():
    print(request.args)
    if 'start' in request.args and 'end' in request.args: 
        start = eval(request.args['start'])
        end = eval(request.args['end'])

        # start node x and y coordinate
        sx = start[0]
        sy = start[1]
        
        # end node x and y coordindate
        tx = end[0]
        ty = end[1]

        source = node(sx, sy)
        target = node(tx, ty)

        chess_board_of_zeros = np.zeros((8,8), dtype=int).tolist()
        tree_graph, tree_dict, pathLen = ShortestPath(chess_board_of_zeros, source, target)

        pattern = r"'(.+?)'"
        paths = str(tree_dict[(tx, ty, pathLen)])
        list_of_paths = re.findall(pattern, paths)[0][1:].replace('(', '[').replace(')', ']').split('/')
        list_of_paths = list(map(lambda x: eval(x), list_of_paths))
        
        for pre, fill, nde in RenderTree(tree_graph):
            print("%s%s" % (pre, nde.name))

        print('start to finsh:', start, end)
        print('list of paths', list_of_paths)

        return jsonify(steps=list_of_paths, numberOfPaths=pathLen)
        
    return 'error'