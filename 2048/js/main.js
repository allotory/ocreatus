/**
 * 游戏主逻辑
 * 主要用来操作游戏的数据
 */

var board = new Array();
var score = 0;

$(document).ready(function() {
    newGame();
});

function newGame() {

    // 初始化棋盘格
    init();
    // 随机在两个棋盘格生成数字
    // generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i ++) {
        // 声明表格数组
        board[i] = new Array();
        for (var j = 0; j < 4; j ++) {
            // 初始化棋盘格样式
            var gridCell = $("#grid-cell-" + i +"-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));

            // 初始化数组
            board[i][j] = 0;
        }
    }

    // 根据 board 里面的值，更新 number-cell 数字
    updateBoardView();
}

function updateBoardView() {

    $(".number-cell").remove();

    for (var i = 0; i < 4; i ++) {
        for (var j = 0; j < 4; j ++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i +"-" + j + "'></div>");
            var theNumCell = $("#number-cell-" + i + "-" + j)

            if (board[i][j] == 0) {
                theNumCell.css("width", "0px");
                theNumCell.css("height", "0px");
                theNumCell.css("top", getPosTop(i, j) + 50);
                theNumCell.css("left", getPosLeft(i, j) + 50);
            } else {
                theNumCell.css("width", "100px");
                theNumCell.css("height", "100px");
                theNumCell.css("top", getPosTop(i, j));
                theNumCell.css("left", getPosLeft(i, j));

                // 根据数字更改前景色和背景色
                theNumCell.css("color", getNumberColor(board[i][j]));
                theNumCell.css("background-color", getNumberBackgroundColor(board[i][j]));

                theNumCell.text(board[i][j]);
            }
        }
    }
}

function generateOneNumber() {
    if (noSpace(board)) {
        return false;
    }

    // 随机生成一个位置
    var randomX = parseInt(Math.floor(Math.random() * 4));
    var randomY = parseInt(Math.floor(Math.random() * 4));

    while (true) {
        // 位置为空
        if (board[randomX][randomY] == 0) {
            break;
        }
        // 位置不为空，重新生成新位置
        randomX = parseInt(Math.floor(Math.random() * 4));
        randomY = parseInt(Math.floor(Math.random() * 4));
    }

    // 随机生成一个数字
    var randomNumber = Math.random() < 0.5? 2: 4;

    // 在随机位置显示随机数字
    board[randomX][randomY] = randomNumber;
    showNumberWithAnimation(randomX, randomY, randomNumber);

    return true;
}

$(document).keydown(function(event){
    switch (event.keyCode) {
        case 37:
            // left
            if (moveLeft()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 38:
            // up
            if (moveUp()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 39:
            // right
            if (moveRight()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 40:
            // down
            if (moveDown()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        default:
            break;
    }
});

function isGameOver() {

}

function moveLeft() {
    if (! canMoveLeft(board)) {
        return false;
    }

    // move left
    for (var i = 0; i < 4; i ++) {
        // 不用考虑第一列
        for (var j = 1; j < 4; j ++) {
            // 存在元素
            if (board[i][j] != 0) {

                for (var k = 0; k < j; k ++) {
                    // 当前元素为零，并且第 i 行从 k 到 j 没有其他元素（障碍物）
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        // 移动，从 [i][j] 移动到 [i][k]
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        // 元素相等，且中间没有其他元素
                        // 移动
                        showMoveAnimation(i, j, i, k);

                        // 元素叠加
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight() {
    if (! canMoveRight(board)) {
        return false;
    }

    // move right
    for (var i = 0; i < 4; i ++) {
        // 不用考虑第一列
        for (var j = 2; 0 <= j; j --) {
            // 存在元素
            if (board[i][j] != 0) {

                for (var k = 3; j < k; k --) {
                    // 当前元素为零，并且第 i 行从 j 到 k 有其他元素（障碍物）
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        // 移动，从 [i][j] 移动到 [i][k]
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        // 元素相等，且中间没有其他元素
                        // 移动
                        showMoveAnimation(i, j, i, k);

                        // 元素叠加
                        board[i][k] *= 2;
                        board[i][j] = 0;

                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (! canMoveUp(board)) {
        return false;
    }

    // move up
    for (var j = 0; j < 4; j ++)  {
        // 不用考虑第一行
        for (var i = 1; i < 4; i ++) {
            // 存在元素
            if (board[i][j] != 0) {

                for (var k = 0; k < i; k ++) {
                    // 当前元素为零，并且第 j 列从 k 到 i 行没有其他元素（障碍物）
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        // 移动，从 [i][j] 移动到 [k][j]
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)) {
                        // 元素相等，且中间没有其他元素
                        // 移动
                        showMoveAnimation(i, j, k, j);

                        // 元素叠加
                        board[k][j] *= 2;
                        board[i][j] = 0;

                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown() {
    if (! canMoveDown(board)) {
        return true;
    }

    for (var j = 0; j < 4; j ++)  {
        // 不用考虑最后
        for (var i = 2; 0 <= i; i --) {
            // 存在元素
            if (board[i][j] != 0) {

                for (var k = 3; i < k; k --) {
                    // 当前元素为零，并且第 j 列从 i 到 k 没有其他元素（障碍物）
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        // 移动，从 [i][j] 移动到 [k][j]
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)) {
                        // 元素相等，且中间没有其他元素
                        // 移动
                        showMoveAnimation(i, j, k, j);

                        // 元素叠加
                        board[k][j] *= 2;
                        board[i][j] = 0;

                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
