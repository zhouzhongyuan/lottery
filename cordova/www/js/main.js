var lottery = {
    index: -1,	//当前转动到哪个位置，起点位置
    count: 0,	//总共有多少个位置
    timer: 0,	//setTimeout的ID，用clearTimeout清除
    speed: 20,	//初始转动速度
    times: 0,	//转动次数
    cycle: 50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1,	//中奖位置
    init: function (id) {
        if ($("#" + id).find(".lottery-unit").length > 0) {
            $lottery = $("#" + id);
            $units = $lottery.find(".lottery-unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-" + this.index).addClass("active");
        }
        ;
    },
    roll: function () {
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery-unit-" + index).removeClass("active");
        index += 1;
        if (index > count) {
            index = 0;
        };
        $(lottery).find(".lottery-unit-" + index).addClass("active");
        this.index = index;
        return false;
    },
    stop: function (index) {
        this.prize = index;
        return false;
    },
    content: [{
        name:'凉茶一箱',
        price:'55'
    },{
        name:'牛二酒杯',
        price:'20'
    },{
        name:'刷锅大王+扑克2副',
        price:'4'
    },{
        name:'白雪公主棉袄',
        price:'79'
    },{
        name:'毛绒玩具',
        price:'10'
    },{
        name:'草菇老抽1升',
        price:'10'
    },{
        name:'鸟叔玩具',
        price:'15'
    },{
        name:'倒穿衣',
        price:'9.9'
    },{
        name:'舒肤佳2升洗衣液',
        price:'9.9'
    },{
        name:'60厘米塑料盆',
        price:'9.9'
    }]
};
function roll() {
    lottery.times += 1;
    lottery.roll();
    if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
        var audio = $("#bg-audio")[0];
        audio.loop = false;
        audio.pause();

        //alert('中奖了'+' '+lottery.content[lottery.index-1].name);
        swal({   title: "中奖啦！！！",
            title: lottery.content[lottery.index-1].name,
            imageUrl: "images/" +lottery.index+'.png',
            imageSize: "300x300",
            confirmButtonColor: '#F80000',
            confirmButtonText:'继续抽奖'
            }
        );
        clearTimeout(lottery.timer);
        lottery.prize = -1;
        lottery.times = 0;
        click = false;
    } else {
        if (lottery.times < lottery.cycle) {
            lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) {
            //var index = Math.random() * (lottery.count) | 0;
            var index = getRand($proArr);
            index ++;
            lottery.prize = index;
        } else {
            if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                lottery.speed += 110;
            } else {
                lottery.speed += 20;
            }
        }
        if (lottery.speed < 40) {
            lottery.speed = 40;
        }
        ;
//            console.log(lottery.times + '^^^^^^' + lottery.speed + '^^^^^^^' + lottery.prize);
        lottery.timer = setTimeout(roll, lottery.speed);
    }
    return false;
}
var click = false;
window.onload = function () {
    console.log(lottery.content);
    addContent(lottery.content);
    lottery.init('lottery');
    $("#lottery button").click(function () {
        if (click) {
            return false;
        }
        else {
            lottery.speed = 100;
            roll();
            click = true;
            var audio = $("#bg-audio")[0];
            audio.loop = true;
            audio.play();
            return false;

        }
    });
};
function addContent(content){
    var content = content;
    //top
    var top = $('.top');
    var a = new String();
    for(var i =0; i<4; i++){
        var index = i + 1;
        a += '<div class="flex1  lottery-unit lottery-unit-' +index+'"><span class="">'+content[i].name+'</span></div>';
    }
    top.html(a);
    //middle
    var middle = $('.middle');
    var a = '<div class="flex1  lottery-unit lottery-unit-' +10+'"><span class="">'+content[9].name+'</span></div>\
            <div class="flex2 choujiang"><button  class="flex1" autofocus="autofocus" href=""><img src="../www/images/cj.png"></button></div>\
            <div class="flex1  lottery-unit lottery-unit-' +5+'"><span class="">'+content[4].name+'</span></div>';
    middle.html(a);
    //bottom
    var bottom = $('.bottom');
    var a = new String();
    for(var i =8; i>4; i--){
        var index = i +1;
        a += '<div class="flex1  lottery-unit lottery-unit-' +index+'"><span class="">'+content[i].name+'</span></div>';
    }
    bottom.html(a);

}

