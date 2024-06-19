function myFunction() {
    var x = document.getElementById("header");
    if (x.className === "head") {
      x.className += " responsive";
    } else {
      x.className = "head";
    }
  } 

  $('#projects').slick({
    dots: false,
    arrows: true,
    mobileFirst: true,
    responsive: [
        {
          breakpoint: 600,
          settings: "unslick",
        }
      ]
    });