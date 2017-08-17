# -*- coding: utf-8 -*-
# @Author: Lich_Amnesia
# @Date:   2017-08-17 13:59:29
# @Email: alwaysxiaop@gmail.com
# @Last Modified by:   Lich_Amnesia
# @Last Modified time: 2017-08-17 14:45:47

import argparse
import sys
import os
import re
from pathlib import Path

def convertFile(file_path):
    contents = Path(file_path).read_text()
    # print(contents)
    # find $ $ and replace 
    line_matches = re.findall(r'\$([^$]+)?\$', contents)
    for formula in line_matches:
        if len(formula) == 0:
            continue
        new_formula = formula.replace('_', '\_')
        new_formula = new_formula.replace('*', '\*')
        res = re.findall(r"P(x_\{t\+1\} \\vert x_t)", contents)
        print(repr(formula), res)
        break
    print(line_matches)
    # Path(file_path).write_text(contents)
    # write_text
    return

def main():
    parser = argparse.ArgumentParser(description='Give file path')
    parser.add_argument('-f', nargs='+',
                       help='the file to convert')

    args = parser.parse_args()
    try:
        for file_path in vars(args)['f']:
            convertFile(file_path)
    except:
        print("file list error")
        raise

if __name__ == '__main__':
    main()
