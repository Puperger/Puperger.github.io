Object.prototype.copy=function () {c = this.constructor();for (var a in this) {if (this.hasOwnProperty(a)) c[a] = this[a];}return c;}


function updateScroll(){
  var element = document.getElementById("terminal");
  element.scrollTop = element.scrollHeight;
}
  //function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
  let sleep = t => new Promise(r=>setTimeout(r,t));
  const FS = {
    "/": {
      "home/": { 
        "puperger/": {
          "test.txt": "Hello, World!", 
          "projects/": {
            "Tetris":`To Check out Tetris, run <span>Tetris</span>`,
            "BFC": "To Check out BFC, run <span>BFC</span>"
          },
          "blogs/": {
            "test.txt": "Hi",
          },
        },
      },
      "usr/": {},
      "bin/": {}
    }
  }

let CURRENT_DIR = ["/", "home/", "puperger/"];
const Path = _ => {
    let t = FS.copy();
    for (var i of CURRENT_DIR) {
      t = t[i];
    }
    return t;
}
const COMMANDS = {
  "clear": _ => {
    document.querySelectorAll("code")[0].innerHTML = '';
    return "";
  },
  "cat": f =>  {
    let t = Path();  
    for(i of Object.keys(t)) {
      if(i.replace("/",'') == f) {
        if(i.endsWith("/")) return `cat: ${f}: Is a directory`;
        return t[i]
      }
    }
    return `cat: ${f}: No such file or directory`
  },
  "cd": f => {
    f=f.replace("/",'');
    if(!f) return 'cd: Requires an argument'
    if(f == ".") return '';
    if(f == "..") {
      if(CURRENT_DIR.length<2) return ''
      CURRENT_DIR.pop();
      return "";

    }
    else {
      let t = Path();
       for(i of Object.keys(t)) {
        if(i.replace("/",'') == f) {
        if(!i.endsWith("/")) return `cd: ${f}: Not a directory`;
        CURRENT_DIR.push(i);
        return ''
      }
    }
    return `cd: ${f}: No such file or directory`
    }
  },
  "ls": _ => {
    return Object.keys(Path()).map(x=>x.replace("/", '')).join("<br>");
  },
  "neofetch": _ => {
    return `This is me. I'm a 16 year old boy with
          a love for <span class="important">
          math, physics and informatics.</span>
          I am currently in my 11th School year
          and have done some project that involved coding.
          On this site you can find some projects
          as well as other stuff about me.
          Coding languages that I'm familiar with are:
          <ul><li>C++</li><li>Python</li>
          <li>HTML, CSS, JS</li></ul>
          If you want to discover some more stuff try
          using ls to see which files are and cat to 
          read a specified file.`;  }

}
let PS1 = _ => {
  let path_str = CURRENT_DIR.join``;
  if(path_str != "/") path_str = path_str.slice(0,-1);
  return '<span class="usr">Puperger@Web</span>:<span class="path">' + path_str + "</span>$ ";
}

let command = "";
let code = null;
let cmd = null;
window.onload = _ => {
  code = document.querySelectorAll("code")[0];
  cmd = document.querySelectorAll("code")[1]
  code.innerHTML += PS1() + "neofetch<BR>" + `This is me. 
          I'm a 16 year old boy with a love for <span class="important">
          math, physics and informatics</span>.
          I am currently in my 11th School year
          and have done some project that involved coding.
          On this site you can find some projects as well as
          other stuff about me.
          Coding languages that I'm familiar with are:
          <ul><li>C++</li><li>Python</li><li>HTML, CSS, JS
          </li></ul>
          If you want to discover some more stuff try
          using ls to see which files are and cat to 
          read a specified file.` + "<BR>" + PS1();
  
}
let CMD_HISTORY = [];
let hist_pos = 0;
window.onkeydown = key => {
    updateScroll();
  if(" qwertyuiopQWERTYUIOPasdfghjklASDFGHJKLzxcvbnmZXCVBNM/.,?><';:\"']}[{\\|+_=-0987654321@#$%^&*()`~".includes(key.key)){
  cmd.innerText += key.key;
  command += key.key;
  }
  if(key.key == "Backspace") {
    cmd.innerText = cmd.innerText.slice(0,-1)
    command = command.slice(0,-1)
  }
  
  if(key.key == "ArrowUp") {
    if(hist_pos<CMD_HISTORY.length) {
      hist_pos++;
      command = CMD_HISTORY[hist_pos-1];
      cmd.innerText = CMD_HISTORY[hist_pos-1];
    }
  }
  if(key.key == "ArrowDown") {
    
     if(hist_pos>0) {
      hist_pos--;
      if(hist_pos == 0) {
        command = '';
        cmd.innerText = '';
      }
      else {
        command = CMD_HISTORY[hist_pos-1];
        cmd.innerText = CMD_HISTORY[hist_pos-1];
      }
     }
  }
 
  if(key.key == "Enter") {
    CMD_HISTORY.unshift(command);
    hist_pos = 0;
    code.innerHTML += command + "<br>";
    if(command == '') return code.innerHTML += PS1()
    if(command == 'Tetris') window.open("./Tetris/index.html", "_self");
    else if(command == 'BFC') window.open("./BFC/index.html", "_self");
    else if(Object.keys(COMMANDS).includes(command.split(" ")[0])) {
      let args = command.split(" ");
      let arg0 = args.shift();
      if(args.length<1)args.push('');
      let out = COMMANDS[arg0](...args);
      code.innerHTML += out;
      if(out!="") code.innerHTML += "<br>"
    } else {
      code.innerHTML += `${command}: command not found<br>`
    }
    code.innerHTML += PS1()
    command = '';
    cmd.innerText = '';
    //code.innerHTML += command + "<br>";
    updateScroll();
  }
  
}
