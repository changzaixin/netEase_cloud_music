
var parmus= getUrlparmas();
var thisId=parmus.id;
/*获取播放列表*/
function getPlaylists(id,callback){
    $.ajax({
        type:"GET",
        async:true,
        url:"https://api.imjad.cn/cloudmusic?type=playlist&id="+id,
        success:function(data){
            callback(data);
            $(".detail .top img").attr("src",data.playlist.coverImgUrl);
            $(".detail .lay").css("backgroundImage","url("+data.playlist.coverImgUrl+")");
            $(".detail .top p").html(data.playlist.name);
        }
    });
}
/*判断这首歌有没有被收藏*/
function isCollected(id){
    if(localStorage.collection){
        var list=JSON.parse(localStorage.collection);
        if(!list){
            return false;
        }else{
            if(list[id]&&list[id].cellected){
                return true;
            }else{
                return false;
            }
        }
    }else{
        return false;
    }
}
/*---------------------------调用播放列表的函数*/
getPlaylists(parmus.id,function(data){
    var $playlists=$(".musiclists"),
        li=$(".playitems").html();
    for(var i=0;i<data.playlist.tracks.length;i++){
        var music=data.playlist.tracks[i];
        music.index=i;
        $li=$(li);
        $li.find(".name").html(music.name);
        $li.find(".artical").html(music.ar[0].name);
        $li.data("music",music).click(function(){
            localStorage.thisIndex=$(this).data("music").index;
            getUrl('audio',$("#global"));
            $('#global').removeClass("global");
            $("#share").html("");
            localStorage.music=music;
            localStorage.tracks=JSON.stringify(data.playlist.tracks);
        });
        if(isCollected(music.id)){
            $li.find("span").removeClass().addClass("yes");
        }else{
            $li.find("span").removeClass().addClass("no");
        }
        $li.appendTo($playlists );
        $li.find("span").data("music",music).click(function(e){
            e.stopPropagation();
            var id=$(this).data("music").id;
            var mus=$(this).data("music");
            if(localStorage.collection){
                var list=localStorage.collection;
                list=JSON.parse(list);
                if(list[id]&&list[id].cellected){
                    $(this).removeClass().addClass("no");
                    list[id].cellected=false;
                }else{
                    list[id]=mus;
                    list[id].cellected=true;
                    /*list[id]={
                        "name":mus.name,
                        "artist":mus.ar[0].name,
                        "cellected":true
                    };*/
                    $(this).removeClass().addClass("yes");
                }
            }else{
                var list={};
                list[id]=mus;
                list[id].cellected=true;
                /*list[id]={
                    "name":mus.name,
                    "artist":mus.ar[0].name,
                    "cellected":true
                };*/
                $(this).removeClass().addClass("yes");
            }
            localStorage.collection=JSON.stringify(list);
        });
    }
});
$("#global").show();
/*取消 a的默认刷新*/
$(".detail #prev a").click(function(){
    return false;
});
/*----返回上一页*/
localStorage.page="detail";





