var go = document.getElementById('go');
var main = document.getElementById('main');
var colorsArr = ['red','yellow','pink','black'];
var speed = 5, num=0;
var timer;
var flag = true;
function initClick(){
    go.addEventListener('click',function(){
        go.style.display = 'none';
        move()
    })
}

initClick()

//移动 停止
function move(){
    clearInterval(timer)
    timer = setInterval(function(){
        main.style.top = main.offsetTop +speed +'px'
        if(main.offsetTop>=0){
            main.style.top = '-150px';
            cDiv()
        }
        var len =main.childNodes.length
        if(len == 6){
            for(var i=0;i<4;i++){
                if(main.childNodes[len-1].childNodes[i].classList.contains('i')){
                    alert('游戏结束，得分:'+ num);
                    clearInterval(timer);
                    flag = false;
                }
            }
           main.removeChild(main.childNodes[len-1])
        }
    },20)
    bindEvent()
}



//创建行、方块
function cDiv(){
    var oDiv = document.createElement('div');
    var index = Math.floor(Math.random()*4)
    oDiv.setAttribute('class','row');
    for(var i = 0;i<4;i++){
        var iDiv = document.createElement('div');
        oDiv.appendChild(iDiv)
    }
    if(main.childNodes.length==0){
        main.appendChild(oDiv)
    }else{
        main.insertBefore(oDiv,main.childNodes[0])
    }
    var clickDiv = main.childNodes[0].childNodes[index];
    clickDiv.setAttribute('class','i');
    clickDiv.style.backgroundColor = colorsArr[index];
}

//点击方块 停止
function bindEvent(){
    main.addEventListener('click',function(e){
       if(flag){
        var tar = e.target;
        if(tar.className == 'i'){
            tar.style.backgroundColor = '#bbb';
            tar.classList.remove('i');
            num++;
        }else{
            alert('游戏结束，得分:'+num);
            clearInterval(timer);
            flag = false;
        }
        if(num%5==0){
            speed++;
        }
       }
    })
}