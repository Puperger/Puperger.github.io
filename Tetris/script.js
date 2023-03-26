window.onload = function(){

var GameField = document.getElementById("GameBoard");
var ctx = GameField.getContext("2d");

var currentColor = "#888888"

var CurrentType

var currentOffset = [0,3]

var currentRotation=0;

var Board = [];

//J = CCW // L = CW

var Pieces = [
    ["06c0","0462","0360","4620"],       //S-Piece
    ["02e0","0622","0740","4460"],       //L-Piece
    ["0660","0660","0660","0660"],       //O-Piece
    ["0630","2640","0c60","0264"],       //Z-Piece
    ["00f0","2222","0f00","4444"],       //I-Piece
    ["0470","2260","0e20","0644"],       //J-Piece
    ["04e0","04c4","00e4","0464"],       //T-piece
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
    switch (colIndex) {
        case 1: return "#FF0000";
        case 2: return "#FF9900";
        case 3: return "#FFFF00";
        case 4: return "#00FF00";
        case 5: return "#00FFFF";
        case 6: return "#0000FF";
        case 7: return "#FF00FF";
        case 8: return currentColor;
        default: return "#FFFFFF";
    }
}

function TopOut(){ //Return True if the game has topoutted
    for(var i = 0 ; i <10 ; i++){
        if (Board[2][i]!=0) return true;
    }
    return false;
}


function ClearRow(){
    for(var i = 0 ; i < 20 ; i++){
        var clear=true;
        for (var j=0 ; j < 10 ; j++){
            if (Board[i][j]==0){
                clear=false;
            }
        }
        if (clear==true){
            for(var y = i-1 ; y >= 0 ; y--){
                for (var x = 0 ; x < 10 ; x++){
                    Board[y+1][x]=Board[y][x]
                }
            }
        }
    }
}

function NewPiece(){
    currentOffset=[0,3]
    var PieceType = Math.floor(Math.random() * 7); //Piecetype range = 0-6 (inclusive)
    var offsets = DecodePiece(PieceType,0)
    for (var i = 0 ; i < 4 ; i++){
        currBlockOffset = offsets[i]
        Board[0+currBlockOffset[0]][3+currBlockOffset[1]]=8
    }
    return PieceType
}

function RotateCW(Piece){
    var newRotation = (currentRotation-1)
    if (newRotation < 0) newRotation+=4;
    var blockOffsets=DecodePiece(Piece, newRotation)
    for (var i = 0 ; i < 4 ; i++){
        var currBlockOffset=blockOffsets[i]
        var y = currentOffset[0]+currBlockOffset[0]
        var x = currentOffset[1]+currBlockOffset[1]
        if (x<0 || x>9 || y<0 ||y>19){
            return //Piece would be OOB
        }
        if (Board[y][x]!=8 && Board[y][x]!=0){
            return //Piece would collide with another one
        }
    }
    //Clear all 8s
    for(var i = 0 ; i<20 ; i++){
        for (var j=0 ; j<20 ; j++){
            if (Board[i][j]==8){
                Board[i][j]=0;
            }
        }    
    }
    for (var i = 0 ; i < 4 ; i++){
        var currBlockOffset=blockOffsets[i]
        var y = currentOffset[0]+currBlockOffset[0]
        var x = currentOffset[1]+currBlockOffset[1]
        Board[y][x]=8
    }
    currentRotation=newRotation
}

function RotateCCW(Piece){
    var newRotation = (currentRotation+1)
    if (newRotation > 3) newRotation-=4;
    var blockOffsets=DecodePiece(Piece, newRotation)
    for (var i = 0 ; i < 4 ; i++){
        var currBlockOffset=blockOffsets[i]
        var y = currentOffset[0]+currBlockOffset[0]
        var x = currentOffset[1]+currBlockOffset[1]
        if (x<0 || x>9 || y<0 ||y>19){
            return //Piece would be OOB
        }
        if (Board[y][x]!=8 && Board[y][x]!=0){
            return //Piece would collide with another one
        }
    }
    //Clear all 8s
    for(var i = 0 ; i<20 ; i++){
        for (var j=0 ; j<20 ; j++){
            if (Board[i][j]==8){
                Board[i][j]=0;
            }
        }    
    }
    for (var i = 0 ; i < 4 ; i++){
        var currBlockOffset=blockOffsets[i]
        var y = currentOffset[0]+currBlockOffset[0]
        var x = currentOffset[1]+currBlockOffset[1]
        Board[y][x]=8
    }
    currentRotation=newRotation
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
    currentOffset[1]++;
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
    currentOffset[1]--;
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
    currentOffset[0]++;
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
    CurrentType = NewPiece();
    currentColor = GetCol(CurrentType+1);
    DrawBoard();
    var GameTimer = setInterval(function(){
        if (TickTimer==10){
            TickTimer=0;
            if(!DropPiece()){
                if(TopOut()){
                    clearInterval(GameTimer)
                    return
                }
                FixBlocks(CurrentType+1)
                ClearRow()
                currentRotation=0;
                CurrentType = NewPiece();
                currentColor = GetCol(CurrentType+1);
                
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
    if (name === 'a' || name === 'A') {
        shiftLeft()
        keyADown=true;
        return;
    }
    if (name === 'd' || name === "D") {
        shiftRight()
        keyDDown=true;
        return;
    }
    if (name === 'j' || name === "J") {
        RotateCCW(CurrentType)
        return;
    }
    if (name === "l" || name === "L") {
        RotateCW(CurrentType)
        return;
    }
    if (name === "s" || name === "S"){
	    DropPiece();
	    return;
	}
    if (name === " "){
        for(var i = 0 ; i < 20 ; i++){
            DropPiece();
        }
    }
}, false);

StartGame();
}
