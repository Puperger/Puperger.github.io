function myFunction() {
    var x = document.getElementById("header");
    if (x.className === "head") {
      x.className += " responsive";
    } else {
      x.className = "head";
    }
  } 


/*window.onload = (event) => {
    const conn1 = document.getElementById("connection1");
    const ctx1 = conn1.getContext("2d");

    ctx1.fillStyle = "red";
    ctx1.fillRect(497,0,6,150);

    ctx1.beginPath();
    ctx1.strokeStyle = "red"
    ctx1.lineWidth = 6
    ctx1.moveTo(497,150);
    ctx1.arc(480, 150, 20, 0, Math.PI/2)
    ctx1.stroke();
    
    ctx1.fillRect(270,167,210,6)

    ctx1.beginPath();
    ctx1.moveTo(250,190);
    ctx1.arc(270,190, 20, Math.PI , -Math.PI/2)
    ctx1.stroke();

    ctx1.fillRect(247,190,6,310)
}*/
