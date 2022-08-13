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
    var boxW = parseInt((w-80)/2)
    for (let i = 0 ; i < boxes.length ; i++){
        boxes[i].style.height = boxW.toString()+"px";
        boxes[i].style.width = boxW.toString()+"px";
        console.log(boxW.toString+"px");
    }
    var thumbnails = document.getElementsByClassName("Thumbnail")
    for (let i = 0 ; i < thumbnails.length ; i++){
        thumbnails[i].style.height = ((boxW-10)*2/3).toString()+"px";
        thumbnails[i].style.width = (boxW-10).toString()+"px";
    }
    var titles = document.getElementsByClassName("title")
    //Decide on Font Size based on screen size
        for (let i = 0 ; i < titles.length ; i++){
            titles[i].style.marginTop = (boxW/12).toString()+"px";
        }
}


window.onload = codeAddress