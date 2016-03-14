var $proArr =[50,100,100,50,30,50,50,400,50,110];
function getRand($proArr){
    console.log($proArr)
    var result;
    //概率数组的总概率精度
    var total = 0;
    $.each($proArr,function(i,v) {
        total += this;
    });
    $.each($proArr,function(i,v) {
        var randNum = Math.random() * total ;
        //console.log(randNum)
        if(randNum <= v){
            result = i;
            return false;
        }else{
            total -= v;
        }

    });
    return result;
    //console.log(result)
    //console.log(total)

}
var a = getRand($proArr);
console.log(a);
/*
* button focus border
* alert good
* localStorage clear when？
*
* */
