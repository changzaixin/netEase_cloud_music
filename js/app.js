var musicController;
/*----------------------------------获取当前路径  例如 a：1,b：3*/
function getUrlparmas(){
    var url=window.location.href,
        p=url.split("?");
    if(p.length<2){
        return false;
    }
    var parr=p[1],
        parr1=parr.split("&"),
        len=parr1.length,
        obj={};
    for(var i=0;i<len;i++){
        var parr2=parr1[i].split("=");
        obj[parr2[0]]=parr2[1];
    }
    return obj;
}
/*------------------------------------获取当前路径中的#后面 ?前面的  例如 home   并且用变量m接收*/
function getM(){
    var url=window.location.href,
        p=url.split("#");
    if(p.length==2){
        p=p[1];
        p=p.split("?");
        p=p[0];
    }
    return p;
}
var m=getM();
/*--------------------------------ajax请求  将m变量里的页面加载在container中*/
function getUrl(m,container){
    container=container||$("#share");
    /*请求url里的页面加入到container中*/
    $.ajax({
        url:"view/"+m+".html",
        success:function(data){
            container.html(data);
        }
    });
    /*引入js*/
    getJs(m);
}
/*--------------------------------ajax  将url变量里的js引入*/
function getJs(m){
    $.ajax({
        url:"js/"+m+".js"
    });
}
/*------------------------------localStorage.count：用来记录用户是否为第一次进入*/
$(function(){
    if(!localStorage.count){
        localStorage.count=0;
    }
    localStorage.count++;
    /*第一次进入显示hello页面*/
    /*非第一次进入显示tab页面*/
    if(localStorage.count==1){
        getUrl("hello");
        setTimeout(function(){
            getUrl("tab");
        },1800)
    }else{
        getUrl("tab");
    }
});
var rootEle=document.documentElement;
w=rootEle.offsetWidth;
fontSize=w/3.75;
rootEle.style.fontSize=fontSize+"px";
window.onresize=function(){
  var rootEle=document.documentElement;
      w=rootEle.offsetWidth;
      fontSize=w/3.75;
      rootEle.style.fontSize=fontSize+"px";
};


