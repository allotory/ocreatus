/**
 * 支撑逻辑
 * 包含一些供游戏运转的底层逻辑，用于主模块和数据模块沟通
 *
 * main: 500px * 500px  => 100%
 * width-height: 460px  => 92%
 * cell: 100px * 100px  => 18%
 * padding: 20px        => 4%
 */
// 当前设备屏幕可以使用宽度
var documentWidth = window.screen.availWidth;
// grid container
var gridContainerWidth = 0.92 * documentWidth;
// 小方块边长
var cellSideLength = 0.18 * documentWidth;
// 每一个小方块之间的间距
var cellSpace = 0.04 * documentWidth;

function getPosTop(i, j) {
    return cellSpace + i * (cellSideLength + cellSpace);
}

function getPosLeft(i, j) {
    return cellSpace + j * (cellSideLength + cellSpace);
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da"; break;
        case 4:
            return "#ede0c8"; break;
        case 8:
            return "#f2b179"; break;
        case 16:
            return "#f59563"; break;
        case 32:
            return "#f67c5f"; break;
        case 64:
            return "#f65e3b"; break;
        case 128:
            return "#edcf72"; break;
        case 256:
            return "#edcc61"; break;
        case 512:
            return "#9c0"; break;
        case 1024:
            return "#eeb5e5"; break;
        case 2048:
            return "#09c"; break;
        case 4096:
            return "#a6c"; break;
        case 8192:
            return "#93c"; break;
        case 16384:
            return "#93c"; break;
        case 32768:
            return "#93c"; break;
    }
    return "black";
}

function noSpace(board) {
    for (var i = 0; i < 4; i ++) {
        for (var j = 0; j < 4; j ++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }

    return true;
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i ++) {
        // 不用考虑第一列
        for (var j = 1; j < 4; j ++) {
            // 存在元素
            if (board[i][j] != 0) {
                // 前一列为空或当前数字与前一列相等（合并）
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i ++) {
        // 不考虑最后一列
        for (var j = 2; 0 <= j; j --) {
            // 存在元素
            if (board[i][j] != 0) {
                // 后一列为空或当前与后一列相等
                if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    // 不考虑第一行
    for (var i = 1; i < 4; i ++) {
        for (var j = 0; j < 4; j ++) {
            if (board[i][j] != 0) {
                // 上一行为空或当前与上一行相等
                if (board[i - 1][j] == 0 || board[i][j] == board[i - 1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    // 不考虑最后一列
    for (var i = 2; 0 <= i; i --) {
        for (var j = 0; j < 3; j ++) {
            if (board[i][j] != 0) {
                // 下一行为空或者当前与下一行想的
                if (board[i + 1][j] == 0 || board[i][j] == board[i + 1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 第 i 行从 k 到 j 没有其他元素（障碍物）
function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i ++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}

// 第 col 列从 row1 到 row2 没有其他元素（障碍物）
function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i ++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}

function noMove(board) {
    if (canMoveDown(board) || canMoveUp(board) || canMoveLeft(board) || canMoveRight(board)) {
        return false;
    }
    return true;
}