let currentN = "0";
let storedN = {
    value: NaN,
    lastOp: null,
}
let memorizedN = 0;
let signFlag = false;
let memFlag = false;


eventSetup();




function display(){
    //display currentN and M flag
    let d;
    d = document.querySelector(".display");
    d.textContent = currentN;
    d = document.querySelector(".memory span");
    memorizedN != 0 ? d.textContent="M" : d.textContent="";
}

function keyPressed(e){
    //adds the digit to currentN and displays it
    let key;
    key=e.target;
    currentN = currentN === "0" ? key.textContent : currentN + key.textContent;
    display();
}

function toggleSign(){
    //toggles the "-" sign and redisplays currentN
    if(currentN.charAt(0) === "-"){
        currentN=currentN.slice(1,currentN.length);
    }else if (currentN!="0"){
        currentN=currentN.padStart(currentN.length+1, "-");
    }
    display();
}

function addDot(){
    //adds the dot if there isn't one already
    if(!currentN.includes(".")){
        currentN = currentN + "."
    }
    display();
}

function clearMemory(){
    memorizedN = 0;
    display();
}
function displayMemory(){
    currentN = memorizedN.toString();
    display();
}
function addToMemory(){
    memorizedN += parseFloat(currentN);
    display();
}
function clear(){
    currentN = "0";
    storedN.value = NaN;
    storedN.lastOp = null;
    display();
}
function del(){
    if(currentN === ""){
        currentN=storedN.value.toString();
        storedN.lastOp = null;
        storedN.value = NaN;
    }
    currentN = currentN.slice(0, currentN.length-1);
    display();
}

function opPressed(e){
    //if + - * /, display stored, store currentN, currentN=0
    let op;
    op=e.target.classList[1];
    switch (op){
        case "add":
            op = add;
            break;
        case "subtract":
            op = subtract;
            break;
        case "divide":
            op = divide;
            break;
        case "multiply":
            op = multiply;
            break;
    }
    exec(op);
}
function exec(op){
    let c;
    c=parseFloat(currentN);
    if(isNaN(storedN.value) && !storedN.lastOp){
        storedN.value=c;
        storedN.lastOp=op;
        currentN="0";
    } else if(!isNaN(storedN.value) && currentN==="0"){
        storedN.lastOp=op;
    } else if(!isNaN(storedN.value) && currentN===""){
        storedN.lastOp=op;
    } else if(!isNaN(storedN.value) && storedN.lastOp){
        storedN.value = storedN.lastOp(storedN.value, c);
        storedN.lastOp = op;
        displayOnce();
    }
}
function add(x,y){return x+y;}
function subtract(x,y){return x-y}
function multiply(x,y){return x*y}
function divide(x,y){return x/y}

function displayOnce(){
    let d;
    d = document.querySelector(".display");
    d.textContent = storedN.value;
    currentN = "0";
}
function operate(){
    //do last op
    exec();
    storedN.lastOp = null;
    currentN = "";
}

function eventSetup(){
    let evs;
    evs = document.querySelectorAll(".number");
    evs.forEach(item => item.addEventListener("click", keyPressed));

    document.querySelector(".sign").addEventListener("click", toggleSign);

    document.querySelector(".dot").addEventListener("click", addDot);

    document.querySelector(".memClear").addEventListener("click", clearMemory);

    document.querySelector(".memDisplay").addEventListener("click", displayMemory);

    document.querySelector(".memAdd").addEventListener("click", addToMemory);

    document.querySelector(".clear").addEventListener("click", clear);

    document.querySelector(".delete").addEventListener("click", del);

    document.querySelector(".divide").addEventListener("click", opPressed);

    document.querySelector(".multiply").addEventListener("click", opPressed);

    document.querySelector(".add").addEventListener("click", opPressed);

    document.querySelector(".subtract").addEventListener("click", opPressed);

    document.querySelector(".operate").addEventListener("click", operate);
}