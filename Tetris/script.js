

var GameField = document.getElementById("GameBoard");
var ctx = GameField.getContext("2d");



var Board = [];




var Pieces = [];

function FillBoard(){
    for (var i=0 ; i<20 ; i++){
        Board.push([]);
        for (var j=0 ; j<10 ; j++){
            Board[i].push(0);
        }
    }
}

function DrawBoard(){
    for (var i=0 ; i<20 ; i++){
        for (var j=20 ; j<20 ; j++){

        }
    }
}


function StartGame(){
    FillBoard()

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 150, 75);
}


