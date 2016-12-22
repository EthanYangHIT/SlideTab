/**
 * Created by hzyangyusen on 2016/12/21.
 */
(function () {
    var slideContainer = document.getElementsByClassName('slide-container')[0];
    var divider = document.getElementsByClassName('divider')[0];
    var tab1 = document.getElementsByClassName('tab-1')[0];
    var tab2 = document.getElementsByClassName('tab-2')[0];
    var block1 = document.getElementById('block1');
    var block2 = document.getElementById('block2');

    function addClass(obj, cls) {
        var obj_class = obj.className,//获取 class 内容.
            blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
        var added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
        obj.className = added;//替换原来的 class.
    }

    function removeClass(obj, cls) {
        var obj_class = ' ' + obj.className + ' ';//获取 class 内容, 并在首尾各加一个空格
        obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格
        var removed = obj_class.replace(' ' + cls + ' ', ' ');//在原来的 class 替换掉首尾加了空格的 class
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格
        obj.className = removed;//替换原来的 class.
    }

    function hasClass(obj, cls) {
        var obj_class = obj.className,//获取 class 内容.
            obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
        for (var x in obj_class_lst) {
            if (obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
                return true;
            }
        }
        return false;
    }

    var moveData = {
        startX: null,
        distance: null,
        endX: null
    };

    function clearMove() {
        moveData.startX = null;
        moveData.distance = 0;
        moveData.endX = null;
    }

    function touchStart(e) {
        console.log('in touchStart');
        removeClass(slideContainer, 'in-transform');
        removeClass(divider, 'in-transform');
        e.preventDefault();
        e.stopPropagation();
        clearMove();
        moveData.startX = e.touches[0].pageX;
    }

    function touchMove(e) {
        console.log('in touchMove');
        e.preventDefault();
        e.stopPropagation();
        moveData.distance = e.touches[0].pageX - moveData.startX;
        console.log('distance: ' + moveData.distance);
        if (hasClass(slideContainer, 'slide-right') && moveData.distance < 0) { //原位
            slideContainer.style.transform = 'translate(' + moveData.distance + 'px,0)';
            divider.style.transform = 'translate(' + (-moveData.distance) * 0.7 + 'px,0)';
        }
        if (hasClass(slideContainer, 'slide-left') && moveData.distance > 0) { //已经左滑
            slideContainer.style.transform = 'translate(' + (moveData.distance - 980) + 'px,0)';
            divider.style.transform = 'translate(' + (490 - moveData.distance * 0.7) + 'px,0)';
        }
    }

    function touchEnd(e) {
        console.log('in touchEnd');
        console.log('distance: ' + moveData.distance);
        e.preventDefault();
        e.stopPropagation();
        addClass(slideContainer, 'in-transform');
        addClass(divider, 'in-transform');
        slideContainer.style.transform = null;
        divider.style.transform = null;
        if (hasClass(slideContainer, 'slide-right')) { //原位
            console.log('slide-right');
            if (moveData.distance < -200) { //左滑超过200
                removeClass(slideContainer, 'slide-right');
                removeClass(divider, 'slide-right');
                addClass(slideContainer, 'slide-left');
                addClass(divider, 'slide-left');
            }
        } else { //已经左滑
            console.log('slide-left');
            if (moveData.distance > 200) { //右滑超过200
                removeClass(slideContainer, 'slide-left');
                removeClass(divider, 'slide-left');
                addClass(slideContainer, 'slide-right');
                addClass(divider, 'slide-right');
            }
        }
    }
    slideContainer.addEventListener('touchstart', touchStart);
    slideContainer.addEventListener('touchmove', touchMove);
    slideContainer.addEventListener('touchend', touchEnd);
    tab1.addEventListener('click', function () {
        if (hasClass(slideContainer, 'slide-left')) {
            removeClass(slideContainer, 'slide-left');
            removeClass(divider, 'slide-left');
            addClass(slideContainer, 'slide-right');
            addClass(divider, 'slide-right');
        }
    });
    tab2.addEventListener('click', function () {
        if (hasClass(slideContainer, 'slide-right')) {
            removeClass(slideContainer, 'slide-right');
            removeClass(divider, 'slide-right');
            addClass(slideContainer, 'slide-left');
            addClass(divider, 'slide-left');
        }
    })
})();