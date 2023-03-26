const track = document.getElementById("PostSlider");
var allowSliding = true;

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {

    if(track.dataset.mouseDownAt==="0") return;
    if(!allowSliding) return;

    const mouseDelta=parseFloat(track.dataset.mouseDownAt)-e.clientX,
        maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
        nextPercentage = Math.max(Math.min(0,nextPercentage),-100);

    track.dataset.percentage = nextPercentage;

    track.animate({ 
        transform: `translate(${nextPercentage}%, -50%)`
    }, {duration: 1200, fill: "forwards"});
    for(const image of track.getElementsByClassName("post")){
        image.animate({
            objectPosition: `${nextPercentage+100}% 50%`,
        }, {duration: 1200, fill:"forwards"});
    }
}

function openPost(id){
    if(allowSliding){
        for(const currentpost of track.getElementsByClassName("post")){
            currentpost.animate({
                width: `0`,
                height: `0`
            }, {duration: 1200, fill:"forwards"});
        }
        let previewPost = track.getElementsByClassName("post")[id];
        previewPost.animate({
            width: `85vmin`,
            height: `85vmin`
        }, {duration: 1200, fill:"forwards"});
         track.animate({ 
            transform: `translate(-50%, -50%)`,
             gap: 0
        }, {duration: 1200, fill: "forwards"});
       
        allowSliding=false;
    }
    else{
        for(const currentpost of track.getElementsByClassName("post")){
            currentpost.animate({
                width: `40vmin`,
                height: `56vmin`
            }, {duration: 1200, fill:"forwards"});
        }       
        track.animate({ 
            transform: `translate(${track.dataset.percentage}%, -50%)`,
            gap: `4vmin`
        }, {duration: 1200, fill: "forwards"});

        allowSliding=true;
    }
}
