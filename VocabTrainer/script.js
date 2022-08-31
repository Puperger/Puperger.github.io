

window.onload =function(){

    document.getElementById('form').addEventListener("submit", (event) => {
        CheckAnswer();
        event.preventDefault();
    }, false);

     var dict = {
        "Ein Baguette": "une baguette",
        "Ein Hund": "un chien"
     };
    var words = [
        "Ein Baguette","Ein Hund"    
    ];


    function CheckAnswer(){
        var answer = document.getElementById("answer");
        var question = document.getElementById("question")
        console.log(question.innerHTML);
        if(answer.value==dict[question.innerHTML]){
            console.log("NICE");
            question.innerHTML="POG";
            var nextword = Math.floor(Math.random()*2);
            question.innerHTML=words[nextword]
            document.getElementById("solution").innerHTML="";
        }
        else{
            console.log("F");
            document.getElementById("solution").innerHTML=dict[question.innerHTML];
        }
        answer.value = "";
}
}
