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