function yay(t) {
    if (t == 0) {
        document.getElementById('yay').play()
    } else {
        window.location.href = "https://puperger.ch/ASMR/yay.html";
    }
}

function ach(t) {
    if (t == 0) {
        let id = 'ach' + Math.ceil(Math.random()*6);
        document.getElementById(id).play();
    } else {
        window.location.href = "https://puperger.ch/ASMR/ach.html";
    }
}