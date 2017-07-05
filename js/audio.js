
var timer1,
    songs=JSON.parse(localStorage.tracks),
    inx=localStorage.thisIndex,
    i=0,
    audio=$("#audio").get(0);
/*利用定时器改变图片的旋转角度*/
function run(){
    i++;
    $(".rotation").css("transform","rotateZ("+i/2+"deg)");
}
/*----------------播放音乐的函数*/
musicController={
    server: "http://musicapi.duapp.com/api.php",
    play:function(music){
        console.log(music);
        inx=music.index;
        timer1=setInterval(run,30);
        $state=$("#music_state");
        $state.html("歌曲正在加载...");
        $name=$("#music_name");
        $name.html("加载中...");
        $artist=$("#music_artist");
        $artist.html("请稍后...");
        $rotation=$(".rotationpic");
        $rotation.attr("src","images/rage_loading.png");
        current();
        $(".audio .pic>img").css({"transform-origin":"center top","Transform":"rotateZ(-10deg)"});
        /*渲染当前播放歌曲的信息的函数*/
        function current(){
            $.ajax({
                type:"GET",
                async:true,
                url:this.server+"?type=url&id="+music.id,
                success:function(data){
                    $(".audio .pic>img").css({"transform-origin":"center top","Transform":"rotateZ(3deg)"});
                    $("#btn").removeClass().addClass("play");
                    $state=$("#music_state");
                    $state.html("");
                    audio.src=data.data[0].url;
                    audio.play();
                    $name=$("#music_name");
                    $name.html(music.name);
                    $artist=$("#music_artist");
                    $artist.html(music.ar[0].name);
                    $rotation=$(".rotationpic");
                    $rotation.attr("src",music.al.picUrl);
                    $(".audio .lay").css("backgroundImage","url("+music.al.picUrl+")");
                    /*-------------返回前一页*/
                    $(".audio .top a").click(function(e){
                        $('#global').addClass("global");
                        $("#global.global .picWrap img").attr("src",music.al.picUrl);
                        e.stopPropagation();
                        clearInterval(timer1);
                        console.log(localStorage.page);
                        if(localStorage.page){
                            if(localStorage.page=="like"){
                                getUrl("tab");
                            }else if(localStorage.page=="songlist"){
                                getUrl("tab");
                            }
                            else{
                                getUrl(localStorage.page);
                            }
                        }else{
                            getUrl("detail");
                        }
                    });
                }
            })
        }
    }
};
musicController.play(songs[inx]);
/*获取当前页面的id*/
var parmus= getUrlparmas();
var thisId=parmus.id;
$(".audio .top a").attr("href","#detail?id="+thisId);
/*---------------前一首和后一首歌曲的切换*/
$(".audio .prev").click(function () {
    clearInterval(timer1);
    inx--;
    if(inx<0){
        inx=songs.length-1;
    }
    musicController.play(songs[inx]);
});
$(".audio .next").click(function () {
    clearInterval(timer1);
    inx++;
    if(inx>songs.length-1){
        inx=0;
    }
    musicController.play(songs[inx]);
});

/*-------------------正在播放的歌曲的点击事件*/
$("#global").click(function(){
    if($(this).hasClass("global")){
            $(this).removeClass("global");
             /*将点击的页面内的share区域内的元素存储起来*/
            $("#share").html("");
    }
});
/*---------------返回上一页*/
$(".audio .top a").click(function(e){
    e.stopPropagation();
    clearInterval(timer1);
    if(localStorage.page){
        getUrl(localStorage.page);
    }else{
        getUrl("detail");
    }
    $('#global').addClass("global");
});
/*暂停继续按钮*/
$("#btn").click(function(e){
    e.stopPropagation();
    if($(this).hasClass("play")){
        $(this).removeClass("play");
        $(this).addClass("pause");
        audio.pause();
        $(".audio .pic>img").css({"transform-origin":"center top","Transform":"rotateZ(-10deg)"});
        clearInterval(timer1);
    }else{
        $(this).removeClass("pause");
        $(this).addClass("play");
        audio.play();
        $(".audio .pic>img").css({"transform-origin":"center top","Transform":"rotateZ(3deg)"});
        timer1=setInterval(run,30);
    }
});


