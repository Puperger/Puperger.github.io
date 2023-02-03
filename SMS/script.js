window.onload = function(){

var c = document.getElementById("Board");
var ctx = c.getContext("2d");
ctx.lineWidth = 2;
ctx.font = "90px Arial";
var coins = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]

function drawBoard(){
    for (let i=0 ; i < 4 ; i++){
        for (let j=0 ; j < 4 ; j++){
            if ((i+j)%2==0){
                ctx.fillStyle = "#000000"
            }
            else{
                ctx.fillStyle = "#aaaaaa"
            }
            ctx.fillRect(200*i,200*j,200,200)
        }       
    }    
}

function drawCircle(x,y,type){
    if (type==0){
        ctx.fillStyle = "#dd2323";
    }
    else{
        ctx.fillStyle = "#2323dd"
    }
    ctx.beginPath();
    ctx.arc(200*x+100,200*y+100,80,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    if (type==0){
        ctx.fillStyle = "#111111"
        ctx.fillText("1", 200*x+72, 200*y+130)
    }
    if (type==1){
        ctx.fillStyle = "#111111"
        ctx.fillText("0", 200*x+72, 200*y+130)
    }
}

function flipCoin(x,y){
    var curCol = coins[x][y];
    drawCircle(x, y, !curCol);
    coins[x][y] = !curCol;
}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x,y]
}

drawBoard();
for (let i = 0 ; i < 4 ; i++){
    for (let j = 0 ; j < 4 ; j++){
        drawCircle(i, j, 0)
    }
}

c.addEventListener("mousedown", function(e)
{
    var pos = getMousePosition(c, e);
    if (pos[0] < 800 && pos[1] < 800){
        var x = Math.floor(pos[0]/200);
        var y = Math.floor(pos[1]/200);
        flipCoin(x, y);
    }
});
}
