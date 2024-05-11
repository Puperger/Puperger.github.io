function myFunction() {
    var x = document.getElementById("header");
    if (x.className === "head") {
      x.className += " responsive";
    } else {
      x.className = "head";
    }
  } 
