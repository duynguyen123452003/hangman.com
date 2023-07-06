var catagoryName = document.getElementById('catagoryName');
var hold = document.getElementById('hold');
var holdItem = document.getElementsByClassName('hold_item');
var mylives = document.getElementById('mylives');
var lis = document.getElementsByClassName('letter');
var clue = document.getElementById('clue');
var reset = document.getElementById('reset');
var button = document.getElementById('buttons');
var hint = document.getElementById('hints');
var stickman = document.getElementById('stickman');
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z'];

categories = [
    ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
    ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
    ["manchester", "milan", "madrid", "amsterdam", "prague"]
];

hints = [
    ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
    ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
    ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
];

function start(){
    var ul = document.createElement('ul');
    ul.id = 'alphabet';
    for(var i = 0 ; i < alphabet.length ; i++){
       ul.insertAdjacentHTML("beforeend",`<li class="letter">${alphabet[i]}</li>`);
    }
    button.appendChild(ul);
}
start();

var i = Math.floor(Math.random()*categories.length);
var j = Math.floor(Math.random()*categories[i].length);
var cate = chooseCatagory(categories,i,j);
holds(cate);
changeCharactor(holdItem);
chooseAnswer(cate,holdItem);
mylive();

function chooseCatagory(categories,i,j){
    var categorie = categories[i][j];
    if(i == 0 ){
        catagoryName.innerHTML = 'The Chosen Category Is Premier League Football Teams';
    }else if(i == 1){
        catagoryName.innerHTML = 'The Chosen Category Is Films';
    }else{
        catagoryName.innerHTML = 'The Chosen Category Is Cities';
    }
    return categorie;
}

function holds(categorie){
    var ul = document.createElement('ul');
    ul.id = 'my-word';
    Array.from(categorie).forEach(function(item){
        ul.insertAdjacentHTML("beforeend",`<li class="hold_item">${item}</li>`);
    })
    hold.appendChild(ul);
}

function changeCharactor(holdItem){
    Array.from(holdItem).forEach(function(element){
        if(element.outerText == '-'){
            return;
        }else{
            element.innerText = '_';
        }
    })
}

function chooseAnswer(cates,holdItem){
    var d = [];
    Array.from(lis).forEach(function(li){
        li.addEventListener('click',function(e){
            d = [];
            var i = 0;
            // e.target.classList.add('active');
            Array.from(cates).forEach(function(cate){
                if(e.target.outerText == cate){
                    d.push(i);
                }
                i++;
            })
            d.forEach(function(dItem){
                holdItem[dItem].innerHTML = e.target.outerText;
            })
        })
    })
}

function mylive(){
    var lives = 10;
    Array.from(lis).forEach(function(li){
        var boolen = false;
        li.addEventListener('click',function(e){
            if(li.className === 'letter active')
            {
                return
            }
            e.target.classList.add('active');
            Array.from(cate).forEach(function(cate){
                if(e.target.outerText == cate){
                    boolen = true;
                    return boolen;
                }
            })
            if(boolen){
                if(lives > 1){
                    mylives.innerHTML = `You have ${lives} lives`;
                    if(kiemTra(holdItem)){
                        mylives.innerHTML = `You Wins`;
                        Array.from(lis).forEach(function(li){
                            li.classList.add('active');
                        })
                    }
                }else{
                    person(0);
                    mylives.innerHTML = 'Game Over';
                    Array.from(lis).forEach(function(li){
                        li.classList.add('active');
                    })
                }
            }else{
                if(lives > 1){
                    lives--;
                    person(lives);
                    mylives.innerHTML = `You have ${lives} lives`;
                    if(kiemTra(holdItem)){
                        mylives.innerHTML = `You Wins`;
                        Array.from(lis).forEach(function(li){
                            li.classList.add('active');
                        })
                    }
                }else{
                    person(0);
                    mylives.innerHTML = 'Game Over';
                    Array.from(lis).forEach(function(li){
                        li.classList.add('active');
                    })
                }
            }
        })
    })
}

hint.addEventListener('click',function(){
    clue.innerHTML = hints[i][j];
})

function kiemTra(holdItem){
    var kt = true;
    Array.from(holdItem).forEach(function(holdItem){
        if(holdItem.outerText === '_'){
            return kt = false;
        }
    })
    return kt;
}

reset.onclick = function(){
    i = Math.floor(Math.random()*categories.length);
    j = Math.floor(Math.random()*categories[i].length);
    Array.from(lis).forEach(function(li){
        li.classList.remove('active');
    })
    clue.innerHTML = '';
    hold.innerHTML = '';
    button.innerHTML = ''
    start();
    cate = chooseCatagory(categories,i,j);
    holds(cate);
    chooseAnswer(cate,holdItem);
    changeCharactor(holdItem);
    mylive();
    mylives.innerHTML = `You have 10 lives`;
    context.clearRect(0, 0, stickman.width, stickman.height);
}



var context = stickman.getContext('2d');
function line(){
    context.beginPath();
    context.lineTo(0,150);
    context.lineTo(200,150);
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    context.stroke();
}


function col() {
    context.lineTo(0,150);
    context.lineTo(0,10);
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    context.stroke();
}

function line2() {
    context.lineTo(0,10);
    context.lineTo(80,10);
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    context.stroke();
}


function line3 () {
    context.beginPath();
    context.lineTo(80,10);
    context.lineTo(80,20);
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    context.stroke();
}

function head() {
    context.beginPath();
    context.arc(80,30,10,0,Math.PI*2,false);    
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    context.stroke();
}

function body() {
    context.beginPath();
    context.lineTo(80,40);
    context.lineTo(80,100);
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    context.stroke();
}

function handRight() {
    context.beginPath();
    context.lineTo(80,50);
    context.lineTo(110,80);
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    context.stroke();
}

function handLeft() {
    context.beginPath();
    context.lineTo(80,50);
    context.lineTo(50,80);
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    context.stroke();
}

function footLeft() {
    context.beginPath();
    context.lineTo(80,100);
    context.lineTo(50,130);
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    context.stroke();
}

function footRight() {
    context.lineTo(80,100);
    context.lineTo(110,130);
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    context.stroke();
}

function person(live){
    switch(live){
        case 9 :
            line();
            break;
        case 8 :
            col();
            break;
        case 7 :
            line2();
            break;
        case 6 :
            line3();
            break;
        case 5 :
            head();
            break;
        case 4 :
            body();
            break;
        case 3 :
            handLeft();
            break;
        case 2 :
            handRight();
            break;
        case 1 :
            footLeft();
            break;
        case 0 :
            footRight();
            break;
    };
}






