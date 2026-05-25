function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//from: https://stackoverflow.com/a/39914235/14251221

var str = "Physics" + ' ' + "Student @ ETH Zürich";
var animate = document.getElementById('animate-title');
async function typewriteTitle() {
  var currentText = "";
  for (let i = 0; i < str.length; i++) {
    currentText += str.charAt(i);
    if ((i%10) < 5)
    animate.innerText = currentText + '_';
    else 
    animate.innerText = currentText + ' ';
    await sleep(50 + Math.random() * 100);
  }
    for (let i = 0; i < 5; i++){
        if (i % 2 == 0){
            animate.innerText = currentText + ' ';
        }
        else{
            animate.innerText = currentText + '_';
        }
        await sleep(500);
    }
}
typewriteTitle();
