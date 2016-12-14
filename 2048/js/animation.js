/**
 * 动画效果逻辑
 * 部分主逻辑通过动画效果层传到 UI 层
 */

function showNumberWithAnimation(i, j, number) {

    var theNumCell = $("#number-cell-" + i + "-" + j);
    theNumCell.css("background-color", getNumberBackgroundColor(number));
    theNumCell.css("color", getNumberColor(number));
    theNumCell.text(number);

    theNumCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

function showMoveAnimation(fromX, fromY, toX, toY){
    var theNumberCell = $("#number-cell-" + fromX + "-" + fromY);
    theNumberCell.animate({
        top: getPosTop(toX, toY),
        left: getPosLeft(toX, toY)
    },200);
}

function updateScore(score) {

    $("#score").text(score);
}
