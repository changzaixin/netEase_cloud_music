
    /*-------------------------------------------------------------------tab点击事件切换页面*/
    /*---------轮播图*/
    $('<script src="js/swiper.min.js"></script>').appendTo($('head'));
    $(function(){
        var mySwiper = new Swiper('.swiper-container', {
            direction: "horizontal",
            loop: true,
            autoplay: 2500,
            pagination: '.swiper-pagination',
            autoplayDisableOnInteraction:false
        });
    });
    load("home");
    function load(m){
            m=m||"home";
            getUrl(m,$("#tabcontainer"));
    };

    $("#m1").click(function(){
        $(this).addClass("active").siblings().removeClass();
        load("home")
    });
    $("#m2").click(function(){
        $(this).addClass("active").siblings().removeClass();
        load("songlist")
    });
    $("#m3").click(function(){
        $(this).addClass("active").siblings().removeClass();
        load("order")
    });
    $("#m4").click(function(){
        $(this).addClass("active").siblings().removeClass();
        load("like")
    });
    if(localStorage.page=="like"){
        $("#m4").addClass("active").siblings().removeClass();
        load("like")
    };
    if(localStorage.page=="songlist"){
        $("#m2").addClass("active").siblings().removeClass();
        load("songlist")
    };
    if(localStorage.url=="songlist"){
        $("#m2").addClass("active").siblings().removeClass();
        load("songlist")
    }
    localStorage.page="home";











