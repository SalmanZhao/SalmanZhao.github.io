
function bodyScroll (top) {
    var dir = 0;
    var step = 0;
    step = (document.body.scrollTop - top)/20
    var timer = setInterval(function(){
        document.body.scrollTop -= step;
        if(Math.abs(document.body.scrollTop - top) < Math.abs(step))
            setTimeout(function(){clearInterval(timer);document.body.scrollTop = top},14)
    },14)
}

function hideappd(){
    clearTimeout(flOpenTag.toShort);
    startMove(appd,{left:'-100%'},function(){startMove(document.getElementById('fl_open_tag'),{left:'0'},function(){
        flOpenTag.toShort = setTimeout(function(){startMove(flOpenTag,{left:'-64%'})},5000)})});
}
function getByClass(oParent, sClass){
    var aEle=oParent.getElementsByTagName('*');
    var aResult=[];
    var re=new RegExp('\\b'+sClass+'\\b', 'i');
    var i=0;
    for(i=0;i<aEle.length;i++){
        if(re.test(aEle[i].className)){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
    }
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
}





window.onload=function(){
    appd = document.getElementById('appd_wrap_default');
    initTimer = setTimeout(hideappd,5000);
    phoneFocus = false;


    flOpenTag = document.getElementById('fl_open_tag');
    var oBanner = document.getElementById('banner');
    var bannerNum = 0;
    var bannerImg = getByClass(oBanner,'img_a');
    var len = $('#banner .slider_banner').length;



    // 调整图片位置
    function bannerImgaPosition(){
        // 获取可视区尺寸
        var winSize = {};
        var e = window, 
            a = 'inner'; 
        if (!('innerWidth' in window )){ 
            a = 'client'; 
            e = document.documentElement || document.body; 
        } 
        winSize = { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
        if(winSize.width>1200){
            bannerImg.forEach(function(o, i, arr){
                o.style.marginLeft =( winSize.width - 1920 )/2+'px';
            })
        }
        else {
            bannerImg.forEach(function(o, i, arr){
                o.style.marginLeft = '-370px';
            })
        }
    }
    bannerImgaPosition();
    window.onresize = bannerImgaPosition;

    //自动轮播
    var play=function(){
        $('#banner .slider_banner').eq(bannerNum%len).children('.img_a').show().parent().siblings().children('.img_a').hide();
        $('.dot').eq(bannerNum%len).addClass('active').siblings().removeClass('active');
        bannerNum++;
    }
    play();
    var t = setInterval(function(){play()},2400);

    var dot = getByClass(oBanner, 'dot');
    for(var i=0;i<dot.length; i++){
        dot[i].index = i;
        dot[i].onmouseover = function(){
            clearInterval(t);
            bannerNum = this.index+1;
            for(var j=0;j<dot.length; j++){
                removeClass(dot[j],'active');
                bannerImg[j].style.zIndex='0';
                bannerImg[j].style.display='none';

            }
            addClass(this,'active');
            bannerImg[this.index].style.zIndex='1';
            bannerImg[this.index].style.display='block';
        }
    }
    $('#banner').mouseover(function(){
        clearInterval(t);
    });
    $('#banner').mouseout(
        function(){
            clearInterval(t);
            t = setInterval(function(){play()},2400);
        })



// 点击切换
    $('#mod .title').click(function(){
            $(this).addClass('active').siblings().removeClass('active')
        });


    var mod = document.getElementById('mod');

    var mod_li = getByClass(mod,'mod_li');

    for (var i = 0; i < mod_li.length; i++) {
        mod_li[i].onclick = function(){
            for (var j = 0; j < mod_li.length; j++) {
                removeClass(mod_li[j],'active')
            };
            addClass(this,'active')
        }
    };

    (function(){
        function hide (o){
            o.style.display = 'none'
        }
        function show (o){
            o.style.display = 'block'
        }
        var t1,t2;
        var adTip = document.getElementById("adTip");
        var scanTip = document.getElementById("scanTip");
        document.getElementById("adTag").onmouseover = function(){
            clearTimeout(t1);
            adTip.style.display = "block";
            scanTip.style.display = "none"; 
        }
        adTip.onmouseover = function(){
            clearTimeout(t1);
        }
        adTip.onmouseout = function(){
            clearTimeout(t1);
            t1 = setTimeout(function(){adTip.style.display = "none";},200);
        }

        document.getElementById("scanTag").onmouseover = function(){
            clearTimeout(t2);
            scanTip.style.display = "block";
            adTip.style.display = "none";
        }

        scanTip.onmouseover = function(){
            clearTimeout(t2);
        }
        scanTip.onmouseout = function(){
            clearTimeout(t2);
            t2 = setTimeout(function(){scanTip.style.display = "none"; },200);
        }
        var loggingTag = document.getElementById("loggingTag"),
            myHistoryTag = document.getElementById("myHistoryTag"),
            myFavoriteTag = document.getElementById("myFavoriteTag"),
            myImplementTag = document.getElementById("myImplementTag"),
            feedbackTag = document.getElementById("feedbackTag"),
            liveChatTag = document.getElementById("liveChatTag");
            returnTopTag = document.getElementById("returnTopTag");
        loggingTag.onmouseover = function(){
            document.getElementById('loggingTip').style.display='block';
            hideAd();
        }
        loggingTag.onmouseout = function(){
            document.getElementById('loggingTip').style.display='none';
        }
        myHistoryTag.onmouseover = function(){
            document.getElementById('myHistoryTip').style.display='block';
            hideAd();
        }
        myHistoryTag.onmouseout = function(){
            document.getElementById('myHistoryTip').style.display='none';
        }
        myFavoriteTag.onmouseover = function(){
            document.getElementById('myFavoriteTip').style.display='block';
            hideAd();
        }
        myFavoriteTag.onmouseout = function(){
            document.getElementById('myFavoriteTip').style.display='none';
        }
        myImplementTag.onmouseover = function(){
            document.getElementById('myImplementTip').style.display='block';
            hideAd();
        }
        myImplementTag.onmouseout = function(){
            document.getElementById('myImplementTip').style.display='none';
        }
        feedbackTag.onmouseover = function(){
            document.getElementById('feedbackTip').style.display='block';
            hideAd();
        }
        feedbackTag.onmouseout = function(){
            document.getElementById('feedbackTip').style.display='none';
        }
        liveChatTag.onmouseover = function(){
            document.getElementById('liveChatTip').style.display='block';
            hideAd();
        }
        liveChatTag.onmouseout = function(){
            document.getElementById('liveChatTip').style.display='none';
        }
        returnTopTag.onmouseover = function(){
            document.getElementById('returnTopTip').style.display='block';
            hideAd();
        }
        returnTopTag.onmouseout = function(){
            document.getElementById('returnTopTip').style.display='none';
        }

        function hideAd () {
            scanTip.style.display = "none";
            adTip.style.display = "none";
        }

        var returnTopTag = document.getElementById('returnTopTag')
            if(document.body.scrollTop!==0){
                returnTopTag.style.display = 'block';
                removeClass(document.getElementById('OtherGroupMatrix'), 'stool_no_top');
            }
            else{
                returnTopTag.style.display = 'none';
                addClass(document.getElementById('OtherGroupMatrix'), 'stool_no_top');
            }
        returnTopTag.onclick = function(){
            document.body.scrollTop = 0;
        }
        document.getElementById('hoverClose_adTool').onclick = function(){
            document.getElementById('adTip').style.display = 'none'
        }
        document.getElementById('hoverClose_scanTool').onclick = function(){
            document.getElementById('scanTip').style.display = 'none'
        }

        var ToolBarMatrix = document.getElementById('ToolBarMatrix');
        document.getElementById('btnToShort').onclick = function(){
            hide(this);
            show(document.getElementById('btnToLong'));
            addClass(ToolBarMatrix, 'stool_short_box');
        }
        document.getElementById('btnToLong').onclick = function(){
            hide(this);
            show(document.getElementById('btnToShort'));
            removeClass(ToolBarMatrix, 'stool_short_box');
        }

        

    })()

// 弹出隐藏运动


    flOpenTag.onmouseover = function(){
        clearTimeout(flOpenTag.toShort);
        startMove(this,{left: '0'})
    }
    flOpenTag.onmouseout = function(){
        flOpenTag.toShort = setTimeout(function(){startMove(flOpenTag,{left:'-64%'})},1000);
    }
    document.getElementById('appd_wrap_close').onclick = function(){
        setTimeout(function(){clearTimeout(initTimer);},1000)
        clearTimeout(initTimer); // 清除onmouseout
        hideappd()
    }
    appd.onmouseover = function(){clearTimeout(initTimer);}
    appd.onmouseout = function(){clearTimeout(initTimer);if(!phoneFocus){initTimer = setTimeout(hideappd,5000);}}
    flOpenTag.onclick = function(){
        setTimeout(function(){clearTimeout(flOpenTag.toShort)},900); // 消除onmouseout触发的定时器
        
        startMove(this,{left:'-100%'},function(){startMove(appd,{left:'0'})});
        
    }







// 悬浮条top
    function liftLocation () {
        if(document.body.scrollTop < 316){
            var top = document.body.scrollTop;
            lift.timer = setTimeout(function(){
                lift.style.top = 516-top + 'px'
            },200)
        }else{
            lift.style.top ='200px';
            if(document.body.scrollTop<674){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-vacations')[0],'mix_active')}
            else if(document.body.scrollTop<1139){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-hotels')[0],'mix_active')}
            else if(document.body.scrollTop<1627){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-flights')[0],'mix_active')}
            else if(document.body.scrollTop<1919){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-car')[0],'mix_active')}
            else if(document.body.scrollTop<2243){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-huodong')[0],'mix_active')}
            else if(document.body.scrollTop<2478){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-mall')[0],'mix_active')}
            else if(document.body.scrollTop<2766){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-you')[0],'mix_active')}
                else{removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-server')[0],'mix_active')}
        }
    }
    var lift = getByClass(document,'lift')[0];
    var liftItems = getByClass(lift,'lift-item');
    liftLocation();
    document.onscroll = function(){
        if(document.body.scrollTop!==0){
            returnTopTag.style.display = 'block';
            removeClass(document.getElementById('OtherGroupMatrix'), 'stool_no_top');
        }
        else{
            returnTopTag.style.display = 'none';
            addClass(document.getElementById('OtherGroupMatrix'), 'stool_no_top');
        }
        liftLocation();
    }
    getByClass(lift,'lift-vacations')[0].onclick = function(){bodyScroll(200)}
    getByClass(lift,'lift-hotels')[0].onclick = function(){bodyScroll(674)}
    getByClass(lift,'lift-flights')[0].onclick = function(){bodyScroll(1139)}
    getByClass(lift,'lift-car')[0].onclick = function(){bodyScroll(1627)}
    getByClass(lift,'lift-huodong')[0].onclick = function(){bodyScroll(1919)}
    getByClass(lift,'lift-mall')[0].onclick = function(){bodyScroll(2243)}
    getByClass(lift,'lift-you')[0].onclick = function(){bodyScroll(2478)}
    getByClass(lift,'lift-server')[0].onclick = function(){bodyScroll(2766)}

    var modLi = getByClass(document.getElementById('mod'),'mod_li');
    for (var i = 0; i < modLi.length; i++) {
        modLi[i].index = i
        modLi[i].onclick = function(){
            for (var j = 0; j < modLi.length; j++) {
                removeClass(modLi[j],'active');
                document.getElementById('mod_c'+j)&&(document.getElementById('mod_c'+j).style.display = 'none');
            };
            addClass(this,'active')
            // 临时限制
            if(this.index>1){
                document.getElementById('mod_c1').style.display = 'block';
                return
            }

            document.getElementById('mod_c'+this.index)&&(document.getElementById('mod_c'+this.index).style.display = 'block');
        }
    };
    var secodeState = true;
    document.getElementById('secode').onclick = function(){
        if(secodeState){secodeState = false;this.src = 'img/code/download.jpg';}
        else {secodeState = true;this.src = 'img/code/2Q .png'}
    }






}
function removeClassOfAll (array,cls) {
    for(var i=0; i<array.length; i++){
        removeClass(array[i],cls);
    }
}
function getStyle(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}
function startMove(obj,json,fn){
        var dir = 0;
        var step = 0;
        for(var attr in json){
            clearInterval(obj.timer);
            var target = json[attr];
            if(target.match(/%/)){
                target = target.replace('%','')*parseInt(getStyle(obj,'width'))/100+'px';
            }
            obj.timer = setInterval(function(){
                dir = (parseInt(target)-parseInt(getStyle(obj,attr)))/12;
                // if(Math.abs(dir)>30)dir = dir>0?30:-30;
                step =dir>0? Math.ceil(dir):Math.floor(dir);
                obj.style[attr] = parseInt(getStyle(obj,attr))+step+'px';
                if(target == '0') target = '0px';
                if(getStyle(obj,attr) == target){
                    clearInterval(obj.timer);
                    if(json[attr].match(/%/)){
                        obj.style[attr] = json[attr];
                    }
                    fn&&fn();

                }
            },18)
        }
    
}
