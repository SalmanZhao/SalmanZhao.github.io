
// for IE8
if (!Array.prototype.forEach){  
    Array.prototype.forEach = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32  
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

function hideappd(){
    clearTimeout(flOpenTag.toShort);
    startMove(appd,{left:'-100%'},function(){startMove(flOpenTag,{left:'0'},function(){
        flOpenTag.toShort = setTimeout(function(){startMove(flOpenTag,{left:'-81px'})},3000)})});
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
function hasClass(obj, cls){
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
function addClass(obj, cls){
    if (!hasClass(obj, cls)) obj.className += " " + cls;
    }
function removeClass(obj, cls){
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
}

function removeClassOfAll(array,cls){
    for(var i=0; i<array.length; i++){
        removeClass(array[i],cls);
    }
}
function getStyle(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
function startMove(obj,json,fn){
    var dir = 0;
    var step = 0;
    for(var attr in json){
        clearInterval(obj.timer);
        var target = json[attr];
        if(target.match(/%/)){
            // target = target.replace('%','')*parseInt(getStyle(obj,'width'))/100+'px';
            target =parseInt(target)>0
            ? Math.ceil(parseInt(target)*obj.offsetWidth/100)+'px'
            : Math.floor(parseInt(target)*obj.offsetWidth/100)+'px';
        }
        obj.timer = setInterval(function(){
            if(getStyle(obj,attr).match(/%/)){
                dir = (parseInt(target)-parseInt(getStyle(obj,attr))*obj.offsetWidth/100)/12;
            }
            else{
                dir = (parseInt(target)-parseInt(getStyle(obj,attr)))/12;
            }
            // if(Math.abs(dir)>30)dir = dir>0?30:-30;
            step =dir>0? Math.ceil(dir):Math.floor(dir);
            obj.style[attr] = (getStyle(obj,attr).match(/%/) ? parseInt(getStyle(obj,attr))*obj.offsetWidth/100 : parseInt(getStyle(obj,attr)))+step+'px';
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
    function bannerImgPosition(){
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
                // o.style.marginLeft =( winSize.width - 1920 )/2+'px';
                var t = ( winSize.width - 1920 )/2+'px';
                startMove(o,{'margin-left':t});
            })
        }
        else {
            bannerImg.forEach(function(o, i, arr){
                o.style.marginLeft = '-370px';

            })
        }
    }
    bannerImgPosition();
    window.onresize = bannerImgPosition;

    //自动轮播
    var play = function(){
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
            t = setInterval(play,2400);
        })



// 搜索区标题点击切换
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
        var adTip = document.getElementById("adTip");//右边栏广告
        var scanTip = document.getElementById("scanTip");//右边栏二维码
        document.getElementById("adTag").onmouseover = function(){
            clearTimeout(t1);
            hide(scanTip);
            show(adTip);
        }
        adTip.onmouseover = function(){
            clearTimeout(t1);
        }
        adTip.onmouseout = function(){
            clearTimeout(t1);
            t1 = setTimeout(function(){hide(adTip)},200);
        }

        document.getElementById("scanTag").onmouseover = function(){
            clearTimeout(t2);
            hide(adTip);
            show(scanTip);
        }

        scanTip.onmouseover = function(){
            clearTimeout(t2);
        }
        scanTip.onmouseout = function(){
            clearTimeout(t2);
            t2 = setTimeout(function(){hide(scanTip)},200);
        }


        // 右边栏按钮鼠标事件
        var buttons = ['logging','myHistory','myFavorite','myImplement','feedback','liveChat','returnTop'];
        var k = {};
        for (var i = 0; i < buttons.length; i++) {
            k[i] = document.getElementById(buttons[i]+'Tag');
            k[i].index = i;
            k[i].onmouseover = function(){
                show(document.getElementById(buttons[this.index]+'Tip'));
                hide(scanTip);
                hide(adTip);
            }
            k[i].onmouseout = function(){
                hide(document.getElementById(buttons[this.index]+'Tip'));
            }
        };


        var returnTopTag = document.getElementById('returnTopTag');
        // 滚动时返回顶部按钮显示或隐藏
        function sidebarChange(){
            if(document.documentElement.scrollTop + document.body.scrollTop !== 0){
                show(returnTopTag);
                removeClass(document.getElementById('OtherGroupMatrix'), 'stool_no_top');
            }
            else{
                hide(returnTopTag);
                addClass(document.getElementById('OtherGroupMatrix'), 'stool_no_top');
            }
        }
        sidebarChange();
        window.onscroll = function(){
            sidebarChange();
            liftLocation();
        };
        // 返回顶部
        returnTopTag.onclick = function(){
            isIe()?(document.documentElement.scrollTop = 0):(document.body.scrollTop = 0);
        }
        document.getElementById('hoverClose_adTool').onclick = function(){
            hide(adTip)
        }
        document.getElementById('hoverClose_scanTool').onclick = function(){
            hide(scanTip)
        }
        var ToolBarMatrix = document.getElementById('ToolBarMatrix');
        // 缩短
        document.getElementById('btnToShort').onclick = function(){
            hide(this);
            show(document.getElementById('btnToLong'));
            addClass(ToolBarMatrix, 'stool_short_box');
        }
        // 伸长
        document.getElementById('btnToLong').onclick = function(){
            hide(this);
            show(document.getElementById('btnToShort'));
            removeClass(ToolBarMatrix, 'stool_short_box');
        }

        

    })()



// 底部悬浮条弹出隐藏运动
    flOpenTag.onmouseover = function(){
        clearTimeout(flOpenTag.toShort);
        startMove(this,{left: '0'})
    }
    flOpenTag.onmouseout = function(){
        flOpenTag.toShort = setTimeout(function(){startMove(flOpenTag,{left:'-81px'})},1000);
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

    // 识别IE浏览器
    function isIe(){
     return ("ActiveXObject" in window);
     }
    function bodyScroll(top) {
        step = 0;
        step = (top - (isIe()?document.documentElement.scrollTop:document.body.scrollTop))/20;
        var timer = setInterval(function(){
            isIe()?(document.documentElement.scrollTop += step):(document.body.scrollTop += step);
            if(Math.abs((isIe()?document.documentElement.scrollTop:document.body.scrollTop) - top) < Math.abs(step)){
                clearInterval(timer);
                if(isIe()) {
                    document.documentElement.scrollTop = top;
                }
                else{
                    document.body.scrollTop = top;
                }
            }
        },14)
    }

    // 左悬浮条top值及active项
    var scrollTop = 0;
    function liftLocation(){
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop < 316){
            lift.timer = setTimeout(function(){
                lift.style.top = 516-scrollTop + 'px';
                removeClassOfAll(liftItems,'mix_active');
                addClass(getByClass(lift,'lift-vacations')[0],'mix_active')
            },200)
        }else{
            lift.style.top ='200px';
            if(scrollTop<674){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-vacations')[0],'mix_active')}
            else if(scrollTop<1139){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-hotels')[0],'mix_active')}
            else if(scrollTop<1627){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-flights')[0],'mix_active')}
            else if(scrollTop<1919){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-car')[0],'mix_active')}
            else if(scrollTop<2243){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-huodong')[0],'mix_active')}
            else if(scrollTop<2478){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-mall')[0],'mix_active')}
            else if(scrollTop<2766){removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-you')[0],'mix_active')}
                else{removeClassOfAll(liftItems,'mix_active');addClass(getByClass(lift,'lift-server')[0],'mix_active')}
        }
    }
    var lift = getByClass(document,'lift')[0];
    var liftItems = getByClass(lift,'lift-item');
    liftLocation();

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
        modLi[i].index = i;
        modLi[i].onclick = function(){
            for (var j = 0; j < modLi.length; j++) {
                removeClass(modLi[j],'active');
                document.getElementById('mod_c'+j)&&(document.getElementById('mod_c'+j).style.display = 'none');
            };
            addClass(this,'active');
            // 临时限制
            // if(this.index>1){
            //     document.getElementById('mod_c1').style.display = 'block';
            //     return
            // }
            document.getElementById('mod_c'+this.index%2).style.display = 'block';
        }
    };
    //更换验证码
    var secodeState = true;
    document.getElementById('secode').onclick = function(){
        if(secodeState){
            secodeState = false;
            this.src = 'img/code/download.jpg';
        }
        else {
            secodeState = true;
            this.src = 'img/code/2Q .png'
        }
    }


}
