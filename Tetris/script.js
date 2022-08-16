window.onload = function(){

var GameField = document.getElementById("GameBoard");
var ctx = GameField.getContext("2d");

var currentColor = "#888888"


var Board = [];

var keyADown = false;
var keyDDown = false;

var ACounter = 0;
var DCounter = 0;


var Pieces = [
    ["06c0"],       //S-Piece
    ["02e0"],       //L-Piece
    ["0660"],       //O-Piece
    ["0630"],       //Z-Piece
    ["00f0"],       //I-Piece
    ["0470"],       //J-Piece
    ["04e0"],       //T-piece
];

function HexDigToBin(hex){
    switch (hex) {
        case "0": return [0,0,0,0]
        case "1": return [0,0,0,1] 
        case "2": return [0,0,1,0] 
        case "3": return [0,0,1,1] 
        case "4": return [0,1,0,0] 
        case "5": return [0,1,0,1] 
        case "6": return [0,1,1,0] 
        case "7": return [0,1,1,1] 
        case "8": return [1,0,0,0] 
        case "9": return [1,0,0,1]
        case "a": return [1,0,1,0] 
        case "b": return [1,0,1,1] 
        case "c": return [1,1,0,0] 
        case "d": return [1,1,0,1] 
        case "e": return [1,1,1,0] 
        case "f": return [1,1,1,1] 
        default:
            console.error("HexDigToBin - Bad Input")
            return [0,0,0,0]
    }
}

function DecodePiece(type,orientation){ //Inputs: 0-6, 0-3 else we will get error
    var out = []
    var piece = Pieces[type][orientation]
    for(var i = 0 ; i < 4 ; i++){
        var d
        d = HexDigToBin(piece[i])
        if(d[0]==1) out.push([i,0])
        if(d[1]==1) out.push([i,1])
        if(d[2]==1) out.push([i,2])
        if(d[3]==1) out.push([i,3])
        
    }
    return out
}

function GetCol(colIndex){
    var col;
    switch (colIndex) {
        case 1:
            col = "#FF0000";
            break;

        case 2:
            col = "#FF9900";
            break;

        case 3:
            col = "#FFFF00";
            break;
        
        case 4:
            col = "#00FF00";
            break;

        case 5:
            col = "#00FFFF";
            break;

        case 6:
            col = "#0000FF";
            break;

        case 7:
            col = "#FF00FF";
            break;

        case 8:
            col = currentColor;
            break;

        default:
            col = "#FFFFFF";
            break;
    }
    return col;
}

function TopOut(){ //Return True if the game has topoutted
    for(var i = 0 ; i <10 ; i++){
        if (Board[2][i]!=0) return true;
    }
    return false;
}

function NewPiece(){
    var PieceType = Math.floor(Math.random() * 7); //Piecetype range = 0-6 (inclusive)
    var offsets = DecodePiece(PieceType,0)
    for (var i = 0 ; i < 4 ; i++){
        currOffset = offsets[i]
        Board[0+currOffset[0]][3+currOffset[1]]=8
    }
    return PieceType
}

function FixBlocks(type){
    for (let i = 19; i >= 0 ; i--) {
        for(let j = 0 ; j < 10 ; j++){
            if(Board[i][j]==8){
                Board[i][j]=type;
            }
        }
    }
}

function checkRight(i,j){
    if(j+1>9){
        return false;
    }
    if(Board[i][j+1]!=0 && Board[i][j+1]!=8){
        return false;
    }
    return true;
}

function shiftRight(){
    for (let i = 0; i < 20; i++) {
        for(let j = 0 ; j < 10 ; j++){
            if (Board[i][j]==8){
                if (!checkRight(i,j)){
                    return false; //Return False if the Piece cannot be shifted
                }
            }
        }      
    }
    for (let i = 19; i >= 0 ; i--) {
        for(let j = 9 ; j >= 0 ; j--){
            if (Board[i][j]==8){
                Board[i][j+1]=8;
                Board[i][j]=0;
            }
        }      
    }
    return true;
} 


function checkLeft(i,j){
    if(j-1<0){
        return false;
    }
    if(Board[i][j-1]!=0 && Board[i][j-1]!=8){
        return false;
    }
    return true;
}

function shiftLeft(){
    for (let i = 0; i < 20; i++) {
        for(let j = 0 ; j < 10 ; j++){
            if (Board[i][j]==8){
                if (!checkLeft(i,j)){
                    return false; //Return False if the Piece cannot be shifted
                }
            }
        }      
    }
    for (let i = 19; i >= 0 ; i--) {
        for(let j = 0 ; j < 10 ; j++){
            if (Board[i][j]==8){
                Board[i][j-1]=8;
                Board[i][j]=0;
            }
        }      
    }
    return true;
} 


function CheckBelow(i,j){
    if(i+1>19){
        return false;
    }
    
    if(Board[i+1][j]!=0 && Board[i+1][j]!=8){
        return false;
    }
    return true;
}


function DropPiece(){
    for (let i = 0; i < 20; i++) {
        for(let j = 0 ; j < 10 ; j++){
            if (Board[i][j]==8){
                if (!CheckBelow(i,j)){
                    return false; //Return False if the Piece cannot be dropped
                }
            }
        }      
    }
    for (let i = 19; i >= 0 ; i--) {
        for(let j = 0 ; j < 10 ; j++){
            if (Board[i][j]==8){
                Board[i+1][j]=8;
                Board[i][j]=0;
            }
        }      
    }
    return true;
}

function FillBoard(){
    for (var i=0 ; i<20 ; i++){
        Board.push([]);
        for (var j=0 ; j<10 ; j++){
            Board[i].push(0);
        }
    }

}

function DrawPiece(x, y, col){
    ctx.fillStyle = col;
    ctx.fillRect(x*20+10,y*20+10,x*20+30,y*20+30);
}

function DrawBoard(){
    for (var i=0 ; i<20 ; i++){
        for (var j=0 ; j<20 ; j++){

            DrawPiece(j,i,GetCol(Board[i][j]));
        }
    }

    //Draw the Border
    ctx.fillStyle="#000000"
    ctx.fillRect(0,0,220,10)
    ctx.fillRect(0,0,10,420)
    ctx.fillRect(210,0,220,420)
    ctx.fillRect(0,410,220,420)
}


function StartGame(){
    FillBoard();
    var TickTimer = 0;
    var Type = NewPiece();
    currentColor = GetCol(Type+1);
    DrawBoard();
    var GameTimer = setInterval(function(){
        if (TickTimer==10){
            TickTimer=0;
            if(!DropPiece()){
                if(TopOut()){
                    clearInterval(GameTimer)
                    return
                }
                FixBlocks(Type+1)
                Type = NewPiece();
                currentColor = GetCol(Type+1);
            }
        }
        if (keyADown){
            ACounter++
            if (ACounter==2){
                ACounter=0
                shiftLeft()
                //SHIFT PIECE
            }
        }
        if (keyDDown){
            DCounter++
            if (DCounter==2){
                DCounter=0
                shiftRight()
                //SHIFT PIECE
            }
        }
        TickTimer++;
        DrawBoard();
      }, 50);
}
    //HOLY iNTENET, I THANK YOU, AM
  // Add event listener on keydown
window.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name === 'a') {
        shiftLeft()
        keyADown=true;
        return;
    }
    if (name === 'd') {
        shiftRight()
        keyDDown=true;
        return;
    }

}, false);
  // Add event listener on keyup
  window.addEventListener('keyup', (event) => {
    var name = event.key;
    if (name === 'a') {
        keyADown=false;
        ACounter = 0
        return;
    }
    if (name === 'd') {
        keyDDown=false;
        DCounter=0
        return;
    }
  }, false);

StartGame();
}