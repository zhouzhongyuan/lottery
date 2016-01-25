//function getRand($proArr) {
//    $result = '';
////概率数组的总概率精度
//    $proSum = array_sum($proArr);
////概率数组循环
//    foreach ($proArr as $key => $proCur) {
//        $randNum = mt_rand(1, $proSum);
//        if ($randNum <= $proCur) {
//            $result = $key;
//            break;
//        } else {
//            $proSum -= $proCur;
//        }
//    }
//    return $result;
//}


var $proArr =[150,50];
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
        console.log(randNum)
        if(randNum <= v){
            result = i;
            return false;
        }else{
            total -= v;
        }

    });
    console.log(result)
    console.log(total)

}
getRand($proArr);
