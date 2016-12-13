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
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

function showMoveAnimation(fromX, fromY, toX, toY) {
    var theNumCell = $("#number-cell-" + fromX + "-" + fromY);
    theNumCell.animate({
        top: getPosLeft(toX, toY),
        left: getPosTop(toX, toY)
    }, 200);
}
