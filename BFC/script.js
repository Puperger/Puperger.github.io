function Sleep() {
    return new Promise(resolve => setTimeout(resolve, 50));
}


async function runCode() {
    let code = document.getElementById("code").value;
    let arr = document.getElementsByTagName("div");
    let ptr = 0;
    let isLooping = false;
    let loopStack = [];
    let innerLoops = 0;
    let input = document.getElementById("input");
    let output = document.getElementById("output");
  
    let inputPtr=0;
  
    for(i=0; i<arr.length;i++){
      arr[i].innerHTML=0;
      arr[i].style.background="#DDDDDD"
    }
    arr[0].style.background="#AAAAAA";
    output.innerHTML=""
    await Sleep();
    for (i = 0; i < code.length; i++) {
  
      const char = code[i];
  
      if (isLooping) {
        if (char === "[") innerLoops++;
        if (char === "]") {
          if (innerLoops === 0) isLooping = false;
          else innerLoops--;
        }
        continue;
      }
      switch (char) {
        case '+':
          arr[ptr].innerHTML=parseInt(arr[ptr].innerHTML)+1;
          break;
        case '-':
          arr[ptr].innerHTML=parseInt(arr[ptr].innerHTML)-1;
          break;
        case ',':
          if (inputPtr>input.value.length){
            console.error("Too much input requested");
            break;
          }
          arr[ptr].innerHTML = input.value[inputPtr].charCodeAt();
          inputPtr++;
          break;
        case '.':
          output.innerHTML=output.innerHTML+((String.fromCharCode(arr[ptr].innerHTML)));
          break;
        case '>':
          arr[ptr].style.background="#DDDDDD";
          ptr++;
          arr[ptr].style.background="#AAAAAA";
          arr[ptr].innerHTML = arr[ptr].innerHTML || 0;
          break;
        case '<':
          arr[ptr].style.background="#DDDDDD";
          ptr--;
          arr[ptr].style.background="#AAAAAA";
          arr[ptr].innerHTML = arr[ptr].innerHTML || 0;
          break;
        case '[':
          arr[ptr].innerHTML == "0"
            ? isLooping = true
            : loopStack.push(i);
          break;
        case ']':
          arr[ptr].innerHTML != "0"
            ? i = loopStack[loopStack.length - 1]
            : loopStack.pop();
          break;
        default:
          break;
      }
      await Sleep()
    }
  }