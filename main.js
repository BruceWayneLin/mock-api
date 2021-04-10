const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 8080 })
wss.setMaxListeners(0);
const sendCallBack = function(result) {
    wss.on('connection', ws => {
        ws.on('message', message => {
            console.log(`Received message => ${message}`)
        })
        // console.log('wdfjiosfjif0', JSON.stringify(result));
        ws.send(JSON.stringify(result));
    })
}

var api_game = require('./api_game_client/api_game_client.js');

let str_error = '';
let result = '';

//接收事件function
function handler_callback(game_data){
    // console.log('收到房間資訊:');
    // console.log(game_data);
};



//建立物件
var api_client = new api_game.api_client('wsapi.abc.com', 'test_token_cc123');

//debug設定
api_client.show_debug = true;

//建立連線
api_client.connect();
//設定狀態通知callback
api_client.set_game_event_handler(handler_callback);

//取得最後錯誤訊息
str_error = api_client.get_error();

//=======================================
//帳號功能=======================================
//=======================================
//{帳號資訊} = {
//     uid:'test01',
//     full_uid:'testNX_test01',
//     name:'測帳01',
//     passwd:'123456',
//     point:500.1,
//     enable:true,
//     enableBet:true,
//     betSetting:'BA-A',
//     lastLive:new Date()
// }
//檢查帳號是否存在=======================================
result = api_client.checkUser('test01');
if(result !== false){
    // console.log('checkUser 檢查帳號是否存在');
    // console.log(result);
    sendCallBack(result);
}else{
    str_error = api_client.get_error();
}
//傳入UID
//回傳 error = false
//回傳 success = {帳號資訊}


//帳號登入=======================================
result = api_client.loginUser('test01', '123456');
if(result !== false){
    // console.log('loginUser 帳號登入');
    // console.log(result);
    sendCallBack(result);
}else{
    str_error = api_client.get_error();
}
//傳入UID,passwd
//回傳 error = false
//回傳 success = {帳號資訊}


//新建帳號=======================================
result = api_client.createUser({
    uid:'test010',
    passwd:'aa123456',
    name:'tom345'
});
if(result !== false){
    // console.log('createUser 新建帳號');
    // console.log(result);
    sendCallBack(result);

}else{
    str_error = api_client.get_error();
}
//傳入{UID,passwd,name}
//回傳 error = false
//回傳 success = {帳號資訊}

//修改帳號=======================================
result = api_client.editUser({
    uid:'test010',
    passwd:'aa8888',
    name:'ubet',
    enable:true,
    betSetting:'BA-B'
});
if(result !== false){
    // console.log('editUser 修改帳號');
    // console.log(result);
    sendCallBack(result);

}else{
    str_error = api_client.get_error();
}
//傳入{UID,passwd,name,enable,betSetting}
//回傳 error = false
//回傳 success = {帳號資訊}


//修改點數=======================================
result = api_client.UserPointChange({
    uid:'test010',
    point:200,
    msg:'道具兌換點數:哥布林碎片*3 換 200點',
    attr_id:'5250145',
    attr_from:'道具兌換Table'
});
if(result !== false){
    // console.log('UserPointChange 修改點數');
    // console.log(result);
    sendCallBack(result);

}else{
    str_error = api_client.get_error();
}
//傳入{UID,point,msg,attr_id,attr_from}
//回傳 error = false
//回傳 success = {點數紀錄}
result = api_client.UserPointChange({
    uid:'test010',
    point:-100,
    msg:'購買道具:古魯丁卡片*1',
    attr_id:'525066',
    attr_from:'購買道具Table'
});
if(result !== false){
    // console.log('UserPointChange 修改點數');
    // console.log(result);
    sendCallBack(result);

}else{
    str_error = api_client.get_error();
}
//傳入{UID,point,msg,attr_id,attr_from}
//回傳 error = false
//回傳 success = {點數紀錄}
//查帳號點數紀錄=======================================
result = api_client.getUsetPointLog('test010');
if(result !== false){
    // console.log('getUsetPointLog 查帳號點數紀錄');
    // console.log(result);
    sendCallBack(result);

}else{
    str_error = api_client.get_error();
}
//傳入{UID}
//回傳 error = false
//回傳 success = {{點數id:點數紀錄},{...}}





//=======================================
//房間功能=======================================
//=======================================
//取得房間歷史結果=======================================
setInterval(()=>{
    result = api_client.getGameResult('EROOM_SA01_R01');
    if(result !== false){
        // console.log('getGameResult 取得房間歷史結果');
        // console.log(result);
        sendCallBack(result);

    }else{
        str_error = api_client.get_error();
    }
    //傳入{room_id}
    //回傳 error = false
    //回傳 success = {局id:{歷史結果},局id:{歷史結果}}
}, 5000);


//房間下注=======================================
setTimeout(()=>{
    result = api_client.userAddBet({
        room_id:'EROOM_SA01_R01',
        uid:'test01',
        cmd:'莊',
        val:500, //需鮮驗證限紅
    });
    if(result !== false){
        // console.log('userAddBet 房間下注');
        // console.log(result);
        sendCallBack(result);

    }else{
        str_error = api_client.get_error();
    }
    //傳入{room_id, UID, cmd, val}
    //回傳 error = {status: 'error', data:'msg'}
    //回傳 success = {status: 'success', data:{下注訊息}}
    
    result = api_client.userAddBet({
        room_id:'EROOM_SA01_R01',
        uid:'test02',
        cmd:'閒',
        val:600, //需先驗證限紅與數值有效
    });
    if(result !== false){
        // console.log('userAddBet 房間下注');
        // console.log(result);
        sendCallBack(result);

    }else{
        str_error = api_client.get_error();
    }
    
    result = api_client.userAddBet({
        room_id:'EROOM_SA01_R01',
        uid:'test02',
        cmd:'和',
        val:100, //需先驗證限紅與數值有效
    });
    if(result !== false){
        // console.log('userAddBet 房間下注');
        // console.log(result);
        sendCallBack(result);

    }else{
        str_error = api_client.get_error();
    }
}, 3000);


//會員歷史注單=======================================
setTimeout(()=>{
    result = api_client.getUserBet('test02');
    if(result !== false){
        // console.log('getUserBet 會員歷史注單');
        // console.log(result);
        sendCallBack(result);

    }else{
        str_error = api_client.get_error();
    }
    //傳入{UID}
    //回傳 error = false
    //回傳 success = {注單號:{注單結果},注單號:{注單結果}}

}, 4000);

//系統限注資訊=======================================
result = api_client.getBetSetting('test01');
if(result !== false){
    // console.log('getBetSetting 系統限注資訊');
    // console.log(result);
    sendCallBack(result);

}else{
    str_error = api_client.get_error();
}
//回傳 error = false
//回傳 success = {限注ID:{系統限注資訊},限注ID:{系統限注資訊}}



//取得遊戲結果截圖=======================================
result = api_client.getResultImageURL('game_event_id');
if(result !== false){
    // console.log('getResultImageURL 取得遊戲結果截圖');
    // console.log(result);
    sendCallBack(result);

}else{
    str_error = api_client.get_error();
}
//回傳 error = false
//回傳 success = {網址}
//取得直播連結，含授權=======================================
result = api_client.getVideoURL('game_event_id', 'test01');
if(result !== false){
    // console.log('EROOM_SA01_R01 取得直播連結，含授權');
    // console.log(result);
    sendCallBack(result);

}else{
    str_error = api_client.get_error();
}
//回傳 error = false
//回傳 success = {網址}