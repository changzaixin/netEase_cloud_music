var timer2;
$("#global").addClass('global');
var server="http://musicapi.duapp.com/api.php";
clearInterval(timer2);
/*----------------------------------------------------------------加载歌单的函数*/
function songlist1(limit,callback){
    /*加载缓存*/
    if(false){
        callback(JSON.parse(localStorage.list1));
        $(".songs2").hide();
    }else{
        /*加载网络*/
        $(".songs2").show();
        var i=0;
        timer2=setInterval(function(){
            i++;
            $("#loading1").css("transform","rotateZ("+i*3+"deg)");
        },30);
        /*ajax  请求数据*/
        $.ajax({
            type:"GET",
            async:true,
            url:server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
            success:function(data){
                console.log(data);
                clearInterval(timer2);
                $(".songs2").hide();
                var list1=JSON.stringify(data.playlists);
                localStorage.list1=list1;
                callback(data.playlists);
                localStorage.cacheTime1=new Date().getTime();
            }
        });
    }
    /*-----------------------------------------------------判断是否加载缓存*/
    function isCache1(){
        /*如果之前没有缓存过加载网络*/
        if(!localStorage.list1){
            return false;
        }
        /*如果上次缓存过是1分钟前加载网络*/
        if(new Date().getTime()-localStorage.cacheTime1>60000){
            return false;
        }
        /*其余情况加载缓存*/
        return true;
    }
}
/*开始加载歌单*/
songlist1(12,function(data){
    var $songs=$(".songs"),
        song=$(".songs1").html();
    for(var i=0;i<12;i++){
        var $song=$(song);
        $song.find("a").attr("href","#detail?id="+data[i].id);
        $song.find("div").html(data[i].playCount);
        $song.find("img").attr("src",data[i].coverImgUrl);
        $song.find("p").html(data[i].name);
        $song.appendTo($songs);
        $song.data({"src":data[i].coverImgUrl,"txt":data[i].name})
    }
});
localStorage.page=="songlist";
localStorage.url="songlist";

