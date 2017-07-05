var timer;
$("#global").addClass('global');
var server="http://musicapi.duapp.com/api.php";
clearInterval(timer);
/*----------------------------------------------------------------加载歌单的函数*/
function songList(limit,callback){
    /*加载缓存*/
    if(isCache()){
        callback(JSON.parse(localStorage.list));
        $(".itemwrap1").hide();
    }else{
        /*加载网络*/
        $(".itemwrap1").show();
        var i=0;
        timer=setInterval(function(){
            i++;
            $("#loading").css("transform","rotateZ("+i*3+"deg)");
        },30);
        /*ajax  请求数据*/
        $.ajax({
            type:"GET",
            async:true,
            url:server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
            success:function(data){
                clearInterval(timer);
                $(".itemwrap1").hide();
                var list=JSON.stringify(data.playlists);
                localStorage.list=list;
                callback(data.playlists);
                localStorage.cacheTime=new Date().getTime();
            }
        });
    }
    /*-----------------------------------------------------判断是否加载缓存*/
    function isCache(){
        /*如果之前没有缓存过加载网络*/
        if(!localStorage.list){
            return false;
        }
        /*如果上次缓存过是1分钟前加载网络*/
        if(new Date().getTime()-localStorage.cacheTime>60000){
            return false;
        }
        /*其余情况加载缓存*/
        return true;
    }
}
/*开始加载歌单*/
songList(9,function(data){
    var $songlist=$(".songlist"),
        item=$(".itemwrap").html();
    for(var i=0;i<9;i++){
        var $item=$(item);
        $item.find("a").attr("href","#detail?id="+data[i].id);
        $item.find("div").html(data[i].playCount);
        $item.find("img").attr("src",data[i].coverImgUrl);
        $item.find("p").html(data[i].name);
        $item.appendTo($songlist);
        $item.data({"src":data[i].coverImgUrl,"txt":data[i].name})
    }
});
localStorage.url="home";

