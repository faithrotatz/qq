document.addEventListener('readystatechange',function(){
	
	if(document.readyState==='complete'){
	 audio=document.querySelector('audio');
	var a=document.querySelector("#btnplay")
	a.onclick=function(){
  if(audio.getAttribute("src")==""){return false}
	if(audio.paused){
	audio.play();
	}else{audio.pause()}
	}
  
	//此模式将操作数据和操作UI分开  先考虑逻辑在考虑UI
	audio.onplay=function(){
	a.className="pause_bt"
	}
	audio.onpause=function(){
	a.className="play_bt"

	}

  var songlist=document.querySelector("#divsonglist");
	var bb=document.querySelector("#spanplaybar");
	var aa=document.querySelector(".progress_op");
	var cc=document.querySelector(".player_bar");
	var dd=document.querySelector(".time_show");
	var ee=document.querySelector("#time_show")
  cc.onmouseover=function(){dd.style.display="block"}
	cc.onmouseout=function(){dd.style.display="none"}
	cc.onmousemove=function(e){
     var ev=e||window.event;
      dd.style.left=ev.offsetX+"px";
      dd.style.display="block";
      ee.innerHTML='';
                               
      cc.onclick=function(){
      
      audio.currentTime=ev.offsetX/cc.offsetWidth*audio.duration;
    
      }
	}
	audio.ontimeupdate=function(){

    if(songmoshi==0){
    if(audio.ended){
       
     nextsong();
      audio.play();
       

    }
    }else if(songmoshi==2){
      if(audio.ended){
       
      audio.play();
       

    }

    }else if(songmoshi==1){
       if(audio.ended){
       var a=Math.floor(Math.random()*yinyueku.length);
       
       audio.src=yinyueku[a].src;
       songingindex=a;
       draglist();
       songchang();
       audio.play();

       

    }
    }else{
    if(audio.ended){

     

     if(songingindex==yinyueku.length-1){
     audio.pause();
    
     }else{nextsong();
     audio.play();}
   
    }
    

    }
	bb.style.width=audio.currentTime/audio.duration*100+"%";
	aa.style.left=audio.currentTime/audio.duration*100+"%";
	}
    var vol=document.querySelector("#spanvolume");
    var voll=document.querySelector("#spanvolumeop");
    vol.onclick=function(e){
    var ev=e||window.event;
    var r=ev.offsetX/vol.offsetWidth;

    audio.volume=r; 
    } 

   aa.onclick=voll.onclick=function(ev){
    ev.stopPropagation();
    }
    var jy=document.querySelector("#spanmute");
    audio.onvolumechange=function(){
                        
    var r=audio.volume*100;
  
    voll.style.left=r+"%";
    

    }

  
    jy.onclick=(function(){ 
     var old;

    return function(){
    if(audio.volume !=0){
    old=audio.volume;
    
    audio.volume=0;jy.className="volume_mute";
    }else{audio.volume=old;
    jy.className="volume_icon";
     
    }
   
    }})();
   //音乐库
   var  yinyueku=[
             {name:"萌萌哒天团 - 你是我的天",src:"a.mp3",geshou:"萌萌哒天团",duration:"3:13"},
             {name:"莫爱河往生 - 莫爱河往生-心的构造《蜀山战纪》片尾曲",src:"a.mp3",geshou:"莫爱河往生",duration:"3:59"},
             {name:"小曲儿 - 上邪",src:"a.mp3",geshou:"小曲儿",duration:"4:13"}
             ];
   
var songingindex;
 var draglist=function(){
for (var i = 0,el=""; i < yinyueku.length; i++) {
   el+='<li mid="j'+i+'"><strong class="music_name" title="燕归巢">'+yinyueku[i].name+'</strong><strong class="singer_name" title="许嵩">'+yinyueku[i].geshou+'</strong><strong class="play_time">'+yinyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_000Nz08A0aZNuz" mid="000Nz08A0aZNuz"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span> </strong> <strong class="btn_fav" title="收藏到歌单"> <span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
 };

songlist.firstElementChild.innerHTML=el;
  var btndel=document.querySelectorAll(".btn_del")

for (var i = 0; i < btndel.length; i++) {
    btndel[i].index=i;
    btndel[i].onclick=function(ev){
    
    ev.stopPropagation();
    delete yinyueku[this.index];
    yinyueku=yinyueku.filter(function(){
    return yinyueku;
    })

    draglist(); 
    if(songingindex!=undefined){

    if(this.index<songingindex){songingindex--;songchang();}
    else if(this.index==songingindex){
     if(this.index===yinyueku.length){}else{
     audio.play();songchang();}
   }else{songchang();}
  }
   
}
  

};
	
var lists=songlist.firstElementChild.childNodes;

for (var i = 0; i < lists.length; i++) {
   lists[i].index=i;
   lists[i].onmouseover=function(){
 


for (var j = 0; j < lists.length; j++) {
    lists[j].classList.remove("play_hover")
};
  lists[this.index].classList.add("play_hover")
  }
  lists[i].onmouseout=function() {
     
         lists[this.index].classList.remove("play_hover")
    
  }
  lists[i].onclick=function () {

  songingindex=this.index;
  audio.src=yinyueku[this.index].src;
  audio.play();
  songchang();
  }
}
}
draglist();
var songchang=function(){

var musicname=document.querySelector(".music_name");
var singername=document.querySelector(".singer_name");
var playdate=document.querySelector(".play_date");
var musicop=document.querySelector(".music_op");
musicop.style.display="block";
singername.innerHTML=yinyueku[songingindex].geshou;
playdate.innerHTML=yinyueku[songingindex].duration;
musicname.innerHTML=yinyueku[songingindex].name;

 var lists=songlist.firstElementChild.childNodes;
for (var i = 0; i < lists.length; i++) {
  lists[i].classList.remove("play_current")
};
 lists[songingindex].classList.add("play_current")
}
//切歌
//下一首
var nextbt=document.querySelector(".next_bt");
nextbt.onclick=function(){nextsong();}
var nextsong=function(){
if(songingindex===undefined){return false};
 songingindex++;
 if(songingindex==yinyueku.length){
 songingindex=0;
 }

 songchang(); 
}
//上一首
var prevbt=document.querySelector(".prev_bt");
prevbt.onclick=function(){prevsong();};
var prevsong=function(){

if(songingindex===undefined){return false}

 songingindex--;
 if(songingindex===-1){
 songingindex=yinyueku.length-1;
}
songchang();
} 
//歌曲模式
var songmoshi;
btnPlayway.onclick=function(){
if(songingindex===undefined){return false}
 var moshi=document.querySelector("#divselect");
 moshi.style.display="block"; 
} 
var moshi=document.querySelector("#divselect");
var moshi1=moshi.children;
for (var i = 0; i < moshi1.length; i++) {
  moshi1[i].index=i;
  moshi1[i].onclick=function(){
  songmoshi=this.index;
  moshi.style.display="none";
  btnPlayway.className=moshi1[this.index].getAttribute("class")
  }

};
//删除


























































}
},false)