function myFunction() {
    var x = document.getElementById("header");
    if (x.className === "head") {
      x.className += " responsive";
    } else {
      x.className = "head";
    }
  } 


document.addEventListener('DOMContentLoaded', () => {
  let mousePosX = 0,mousePosY = 0,
      mouseCircle = document.getElementById('mouse-light');

  document.onmousemove = (e) => {
      mousePosX = e.pageX-128;
      mousePosY = e.pageY-128;
  }

  let delay = 6,
      revisedMousePosX = 0,
      revisedMousePosY = 0;

  function delayMouseFollow() {
      requestAnimationFrame(delayMouseFollow);

      revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
      revisedMousePosY += (mousePosY - revisedMousePosY) / delay; 

      mouseCircle.style.top = revisedMousePosY + 'px';
      mouseCircle.style.left = revisedMousePosX + 'px';
  }
  delayMouseFollow();
});