function codeAddress(){
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    updateSize(newWidth,newHeight)
}


window.addEventListener('resize', function(event){
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    updateSize(newWidth,newHeight);
});


updateSize = function(w,h){
    var boxes = document.getElementsByClassName("Box")
    var boxW = parseInt((w-40)/2)
    for (let i = 0 ; i < boxes.length ; i++){
        boxes[i].style.height = boxW.toString()+"px";
        boxes[i].style.width = boxW.toString()+"px";
        console.log(boxW.toString+"px");
    }
    var thumbnails = document.getElementsByClassName("Thumbnail")
    for (let i = 0 ; i < thumbnails.length ; i++){
        thumbnails[i].style.height = (boxW*2/3).toString()+"px";
        thumbnails[i].style.width = boxW.toString()+"px";
    }
    var titles = document.getElementsByClassName("title")
    //Decide on Font Size based on screen size
    if (w < 300){
        for (let i = 0 ; i < titles.length ; i++){
            titles[i].style.fontSize = "10px";
            titles[i].style.fontSize = "10px";
        }
    }
    else if (w < 450){
        for (let i = 0 ; i < titles.length ; i++){
            titles[i].style.fontSize = "20px";
            titles[i].style.fontSize = "20px";
        }
    }
    else if(w < 900){
        for (let i = 0 ; i < titles.length ; i++){
            titles[i].style.fontSize = "30px";
            titles[i].style.fontSize = "30px";
        }
    }
    else if(w < 1800){
        for (let i = 0 ; i < titles.length ; i++){
            titles[i].style.fontSize = "50px";
            titles[i].style.fontSize = "50px";
        }
    }
    else if(w < 9000){
        for (let i = 0 ; i < titles.length ; i++){
            titles[i].style.fontSize = "75px";
            titles[i].style.fontSize = "75px";
        }
    }
}


window.onload = codeAddress