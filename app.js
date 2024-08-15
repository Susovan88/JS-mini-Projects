// generate a random color- 
let h1= document.querySelector("h1");
let boxColor= document.querySelector(".color-box");
let btn=document.querySelector(".color-btn");
btn.addEventListener("click",function(){
    let r=Math.floor(Math.random()*255);
    let g=Math.floor(Math.random()*255);
    let b=Math.floor(Math.random()*255);
    let color=`rgb(${r},${g},${b})`;
    h1.innerText=color;
    boxColor.style.backgroundColor=color;
    h1.style.color=color;
    para.style.color=color;
    console.log("color updated!");
});


// text editor...
let inp=document.querySelector("#text");
let para=document.querySelector("p");
inp.addEventListener("input",function(){
    para.innerText= this.value;
    console.log(this.value);
});


// // color Scheme Switcher...
let main=document.querySelector("main");
let clrBtns=document.querySelectorAll(".clr");
let collection=document.querySelector(".collection");
for(btn of clrBtns){
    btn.addEventListener("click",function(){
        let backColor=this.getAttribute("id");
        console.log(backColor);
        main.style.backgroundColor=backColor;
    })
}
// // or,
// collection.addEventListener("click",function(ev){    // ev -> pointerEvent object
//     if(ev.target.nodeName="BUTTON"){
//         let backColor=ev.target.style.backgroundColor;
//         main.style.backgroundColor=backColor;
//     }
// })



// ToDo List ....
let req=document.querySelector(".req");
let enter=document.querySelector(".enter");
let ul=document.querySelector(".ul");
let h4=document.querySelector("h4");
//add...
enter.addEventListener("click",function(){
    if(req.value==""){
        h4.innerText="Please enter your item!";
        setTimeout(function(){
            h4.innerText="";
        },3000);
    }
    else{
        let item= document.createElement("li");
        item.classList.add("list");
        item.innerText=req.value;
        ul.appendChild(item);
        let delBtn= document.createElement("button");
        delBtn.innerText="Delete";
        delBtn.classList.add("delete");
        delBtn.classList.add("btn");
        item.appendChild(delBtn);
        req.value="";
    }
});
//delete...
ul.addEventListener("click",function(event){
    if(event.target.nodeName=="BUTTON"){
        let listItem=event.target.parentElement;
        listItem.remove();
        console.log("delete");
    }
});



// BMI Calculator
let form=document.querySelector("#enter");
let bmi=document.querySelector(".bmi");
let todo=document.querySelector(".todo");
let option=document.querySelector(".option");
let submit=document.querySelector(".submit");
form.addEventListener("submit",function(ev){
    ev.preventDefault();
    let w=form[0].value;
    let h=Math.pow(((form[1].value)/100),2);
    let ans=w/h;
    console.log(ans);
    bmi.innerText=`Your BMI is = ${ans}`;
    if (ans<18.6){
        option.innerText="Under Weight!";
        option.style.color="yellow";
        todo.innerText=` Eating more frequently. Slowly begin to eat 5 to 6 smaller meals during the day,Choosing food with lots of nutrients,Top it off,Try smoothies and shakes,But watch what and when you drink,Exercise.`;
    }else if(ans<=24.9){
        option.innerText="Normal Weight!";
        option.style.color="green";
        todo.innerText=` Staying active is a great place to start. Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week. And don't forget to fuel your body with a balanced diet and, of course, stay hydrated.`;
    }else{
        option.innerText="OverWeight!";
        option.style.color="red";
        todo.innerText=` Eat a balanced, calorie-controlled diet as recommended by your GP or weight loss management health professional,join a local weight loss group,take up activities such as fast walking, jogging, swimming or tennis for 150 to 300 minutes (two-and-a-half to five hours) a week.`;
    }

})



// Simon Says Game...
let gameSeq=[];
let userSeq=[];
let boxList=["red","green","yellow","blue"];
let start=false;
let level=0;
let h2=document.querySelector("h2");
let game=document.querySelector(".game");

game.addEventListener("dblclick",function(){
    if(start==false){
        console.log("started!");
        start=true;
        levelUp();
    }
});

function gameFlash(box){
    box.classList.add("gameflash");
    setTimeout(function(){
        box.classList.remove("gameflash");
    }, 300);
}

function userFlash(box){
    box.classList.add("userFlash");
    setTimeout(function(){
        box.classList.remove("userFlash");
    },300);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    // random box choose...
    let randIndx=Math.floor(Math.random()*4);
    let randColor=boxList[randIndx];
    let randBox=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBox);
}

function checkBox(indx){
    if(userSeq[indx]===gameSeq[indx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(function(){
                levelUp();
            }, 1500);
            game.style.backgroundColor="greenyellow";
            setTimeout(function(){
                game.style.backgroundColor="white"
            }, 500);
        }
    }
    else{
        h2.innerText=`Game Over! Double Click any key to start again.`;
        console.log("game over!");
        game.style.backgroundColor="red";
        setTimeout(function(){
            game.style.backgroundColor="white"
        }, 500);
        reset();
    }
}

function boxPress(){
    let box=this;
    userFlash(box);
    let userColor=box.getAttribute("id");
    userSeq.push(userColor);
    let indx=userSeq.length-1;
    checkBox(indx);
}

let allBox=document.querySelectorAll(".box");
for(box of allBox){
    box.addEventListener("click", boxPress);
}

function reset(){
    gameSeq=[];
    userSeq=[];
    start=false;
    level=0;
}