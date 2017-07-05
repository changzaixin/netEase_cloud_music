
var collections=JSON.parse(localStorage.collection),
    ool=$(".like ol"),
    i=0;
if(collections=={}){

}
for(key in collections){
    if(collections[key]!=null){
        collections[key].index=i;
        $("<li>"+collections[key].name+"<br/>"+collections[key].ar[0].name+"<span>取消收藏</span>"+"</li>").appendTo(ool);
        $("ol li").last().attr("data-id",collections[key].id);
        i++;
    }
}
$(".like ol li span").click(function(e){
    e.stopPropagation();
    var paId=$(this).parent().attr("data-id");
    collections[paId]=null;
    var obj=collections;
    collections={};
    for(var key in obj){
        if(obj[key]!=null){
            collections[key]=obj[key];
        }
    }
    localStorage.collection=JSON.stringify(collections);
    getUrl("like",$("#tabcontainer"));
});
$(".like ol li").click(function(){
    var theId=$(this).attr("data-id");
    localStorage.thisIndex=collections[theId].index;
    $('#global').removeClass("global");
    $("#share").html("");
    var arr=[];
    for(var key in collections){
        arr.push(collections[key]);
    }
    localStorage.tracks=JSON.stringify(arr);
    getUrl('audio',$("#global"));
});

localStorage.page="like";
localStorage.url="like";


