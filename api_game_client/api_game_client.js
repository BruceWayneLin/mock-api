
class api_client{
    server_url = '';
    server_port = '';
    server_token = '';
    connected = false;
    error_msg = '';
    game_data = {};
    user_bet = {};
    user_point = {};
    game_event_handler = false;
    
    show_debug = false;
    模擬_round_id = 1000000;
    模擬_bet_id = 2000000;
    模擬_point_id = 3000000;
    模擬_game_id = 'EMU_SA01';
    模擬_room_id_1 = 'EROOM_SA01_R01';
    模擬_room_id_2 = 'EROOM_SA01_R02';

    
    模擬_room_1_round_id = 0;
    模擬_room_2_round_id = 0;
    模擬_EID = '20210101235959';
    模擬_靴號 = 0;
    模擬_局號 = 1;
    模擬_局號_max = 30;
    模擬_局狀態 = '洗牌中';
    模擬_局delay = {'開始':5,'停止':3,'結果':3,'洗牌':10};
    模擬_局delay_count = 0;
    模擬結果 = {
        '1':{'莊':true,'閒':false,'和':false,'莊對':false,'閒對':false},
        '2':{'莊':false,'閒':true,'和':false,'莊對':false,'閒對':false},
        '3':{'莊':false,'閒':false,'和':true,'莊對':false,'閒對':false},
        '4':{'莊':false,'閒':true,'和':false,'莊對':false,'閒對':false},
        '5':{'莊':true,'閒':false,'和':false,'莊對':false,'閒對':false},
        '6':{'莊':true,'閒':false,'和':false,'莊對':true,'閒對':true},
        '7':{'莊':false,'閒':true,'和':false,'莊對':true,'閒對':true},
        '8':{'莊':false,'閒':false,'和':true,'莊對':true,'閒對':true},
        '9':{'莊':false,'閒':true,'和':false,'莊對':true,'閒對':true},
        '10':{'莊':true,'閒':false,'和':false,'莊對':true,'閒對':true},
        '11':{'莊':true,'閒':false,'和':false,'莊對':false,'閒對':true},
        '12':{'莊':true,'閒':false,'和':false,'莊對':false,'閒對':true},
        '13':{'莊':true,'閒':false,'和':false,'莊對':false,'閒對':true},
        '14':{'莊':true,'閒':false,'和':false,'莊對':false,'閒對':true},
        '15':{'莊':false,'閒':true,'和':false,'莊對':true,'閒對':false},
        '16':{'莊':false,'閒':true,'和':false,'莊對':true,'閒對':false},
        '17':{'莊':false,'閒':true,'和':false,'莊對':true,'閒對':false},
        '18':{'莊':false,'閒':true,'和':false,'莊對':true,'閒對':false},
        '19':{'莊':false,'閒':false,'和':true,'莊對':true,'閒對':true},
        '20':{'莊':false,'閒':false,'和':true,'莊對':true,'閒對':true},
        '21':{'莊':true,'閒':false,'和':false,'莊對':false,'閒對':true},
        '22':{'莊':false,'閒':true,'和':false,'莊對':true,'閒對':false},
        '23':{'莊':true,'閒':false,'和':false,'莊對':false,'閒對':true},
        '24':{'莊':false,'閒':true,'和':false,'莊對':true,'閒對':false},
        '25':{'莊':true,'閒':false,'和':false,'莊對':false,'閒對':true},
        '26':{'莊':false,'閒':true,'和':false,'莊對':true,'閒對':false},
        '27':{'莊':true,'閒':false,'和':false,'莊對':false,'閒對':true},
        '28':{'莊':false,'閒':true,'和':false,'莊對':true,'閒對':false},
        '29':{'莊':true,'閒':false,'和':false,'莊對':false,'閒對':true},
        '30':{'莊':false,'閒':true,'和':false,'莊對':true,'閒對':false}
    }
    betSetting = {
        'BA-A':{
            莊:'10-100',
            閒:'10-100',
            和:'10-100',
            莊對:'10-100',
            閒對:'10-100'
        }
    };

    test_user = {
        test01:{
            uid:'test01',
            full_uid:'testNX_test01',
            name:'測帳01',
            passwd:'123456',
            point:500.1,
            enable:true,
            enableBet:true,
            betSetting:'BA-A',
            lastLive:new Date()
        },
        test02:{
            uid:'test02',
            full_uid:'testNX_test02',
            name:'測帳02',
            passwd:'123456',
            point:50000000.1,
            enable:true,
            enableBet:true,
            betSetting:'BA-F',
            lastLive:new Date()
        }
    };
    constructor(server_url, server_token, server_port = 80) {
        this.server_url = server_url;
        this.server_port = server_port;
        this.server_token = server_token;
    }
    connect(){
        if(this.server_url == 'wsapi.abc.com' && this.server_token == 'test_token_cc123'){
            this.connected = true;

            this.game_data[this.模擬_room_id_1] = {};
            this.game_data[this.模擬_room_id_1].result = {};
            this.game_data[this.模擬_room_id_1].bet = {};
            this.game_data[this.模擬_room_id_2] = {};
            this.game_data[this.模擬_room_id_2].result = {};
            this.game_data[this.模擬_room_id_2].bet = {};
            
            setInterval(() => {
                this.HDL_game();
            }, 5000);
        }
    }
    dateShift(date, secs){
        let dt = new Date();
        dt.setTime(date.valueOf()+(secs*1000));
        return dt;
    }
    debug(msg){
        if(this.show_debug === true){
            let dt = new Date();
            // console.log(dt.toISOString() + '::'+ msg);
        }
    }
    newRoundId(){
        this.模擬_round_id++;
        return this.模擬_round_id;
    }
    newBetId(){
        this.模擬_bet_id++;
        return this.模擬_bet_id;
    }
    newPointId(){
        this.模擬_point_id++;
        return this.模擬_point_id;
    }
    gameCalc(result, room_id, round_id){
        //let bet_ids = Object.keys(this.game_data[this.room_id].bet[this.round_id])
        if(this.game_data[room_id].bet[round_id].length == 0){return;}
        let ary = this.game_data[room_id].bet[round_id];
        ary.forEach(el => {
            let 統計 = result.統計;
            統計.注單數++;
            統計.總下注 += el.val;
            統計.有效柱 += el.val;
            統計.result_sum[el.cmd + '_count'] ++;
            統計.result_sum[el.cmd + '_value'] += el.val;
            
            if(result.result[el.cmd] == true){
                switch(el.cmd){
                    case '莊':
                        el.result = el.val * 0.95;
                        el.result_msg = '贏 + ' + el.result;
                        統計.結算總和 += (0-el.val);
                        break;
                    case '閒':
                        el.result = el.val * 1;
                        el.result_msg = '贏 + ' + el.result;
                        統計.結算總和 += (0-el.result);
                        break;
                    case '和':
                        el.result = el.val * 8;
                        el.result_msg = '贏 + ' + el.result;
                        統計.結算總和 += (0-el.result);
                        break;
                    case '莊對':
                        el.result = el.val * 11;
                        el.result_msg = '贏 + ' + el.result;
                        統計.結算總和 += (0-el.result);
                        break;
                    case '閒對':
                        el.result = el.val * 11;
                        el.result_msg = '贏 + ' + el.result;
                        統計.結算總和 += (0-el.result);
                        break;
                }
            }else{
                el.result_msg = '輸: -' + el.val;
                統計.結算總和 += (el.val);
            }
        });
    }
    HDL_game(){
        if(this.模擬_局delay_count < 1){
            let res_msg = {
                'time':new Date(),
                'room_id':this.模擬_room_id_1,
                'round_id':this.模擬_room_1_round_id,
                'staus':'change',
                '狀態':this.洗牌中,
                'event_id':''
            };
            switch(this.模擬_局狀態){
                case '洗牌中':
                    this.模擬_靴號++;
                    this.模擬_局號 = 1;
                    this.模擬_局狀態 = '開始下注';
                    this.模擬_局delay_count = this.模擬_局delay.開始;
                    //
                    res_msg.狀態 = '開始下注';
                    res_msg.staus = 'start';
                    res_msg.event_id = this.模擬_EID + ',' + this.模擬_靴號 + ',' + this.模擬_局號;
                    res_msg.timerEnd = this.dateShift(res_msg.time, this.模擬_局delay.開始);
                    this.模擬_room_1_round_id = this.newRoundId();
                    this.模擬_room_2_round_id = this.newRoundId();
                    this.game_data[this.模擬_room_id_1].bet[this.模擬_room_1_round_id] = [];
                    this.game_data[this.模擬_room_id_2].bet[this.模擬_room_2_round_id] = [];
                    res_msg.round_id = this.模擬_room_1_round_id;
                    break;
                case '開始下注':
                    this.模擬_局狀態 = '停止下注';
                    this.模擬_局delay_count = this.模擬_局delay.停止;
                    //
                    res_msg.狀態 = '停止下注';
                    res_msg.staus = 'stop';
                    res_msg.event_id = this.模擬_EID + ',' + this.模擬_靴號 + ',' + this.模擬_局號;
                    res_msg.timerEnd = this.dateShift(res_msg.time, this.模擬_局delay.停止);
                    break;
                case '停止下注':
                    this.模擬_局狀態 = '開牌結果';
                    this.模擬_局delay_count = this.模擬_局delay.結果;
                    //
                    res_msg.狀態 = '開牌結果';
                    res_msg.staus = 'result';
                    res_msg.event_id = this.模擬_EID + ',' + this.模擬_靴號 + ',' + this.模擬_局號;
                    res_msg.timerEnd = this.dateShift(res_msg.time, this.模擬_局delay.結果);
                    res_msg['result'] = this.模擬結果[this.模擬_局號];
                    //rand
                    //EMU
                    let res_2 = {
                        event_id:res_msg.event_id,
                        round_id:this.模擬_room_1_round_id,
                        result:res_msg.result,
                        統計:{
                            注單數:0,
                            總下注:0,
                            有效柱:0,
                            結算總和:0,
                            result_sum:{
                                莊_count:0,
                                莊_value:0,
                                閒_count:0,
                                閒_value:0,
                                和_count:0,
                                和_value:0,
                                莊對_count:0,
                                莊對_value:0,
                                閒對_count:0,
                                閒對_value:0
                            }
                        }
                    };
                    this.gameCalc(res_2, this.模擬_room_id_1, this.模擬_room_1_round_id);
                    this.game_data[this.模擬_room_id_1].result[this.模擬_room_1_round_id] = res_2;
                    res_2 = {
                        event_id:res_msg.event_id,
                        round_id:this.模擬_room_2_round_id,
                        result:res_msg.result,
                        統計:{
                            注單數:0,
                            總下注:0,
                            有效柱:0,
                            結算總和:0,
                            result_sum:{
                                莊_count:0,
                                莊_value:0,
                                閒_count:0,
                                閒_value:0,
                                和_count:0,
                                和_value:0,
                                莊對_count:0,
                                莊對_value:0,
                                閒對_count:0,
                                閒對_value:0
                            }
                        }
                    };
                    this.gameCalc(res_2, this.模擬_room_id_2, this.模擬_room_2_round_id);
                    this.game_data[this.模擬_room_id_2].result[this.模擬_room_2_round_id] = res_2;
                    break;
                case '開牌結果':
                    if(this.模擬_局號 < this.模擬_局號_max){
                        this.模擬_局號++;
                        this.模擬_局狀態 = '開始下注';
                        this.模擬_局delay_count = this.模擬_局delay.開始;
                        //
                        res_msg.狀態 = '開始下注';
                        res_msg.staus = 'start';
                        res_msg.event_id = this.模擬_EID + ',' + this.模擬_靴號 + ',' + this.模擬_局號;
                        res_msg.timerEnd = this.dateShift(res_msg.time, this.模擬_局delay.開始);
                        this.模擬_room_1_round_id = this.newRoundId();
                        this.模擬_room_2_round_id = this.newRoundId();
                        this.game_data[this.模擬_room_id_1].bet[this.模擬_room_1_round_id] = [];
                        this.game_data[this.模擬_room_id_2].bet[this.模擬_room_2_round_id] = [];
                        res_msg.round_id = this.模擬_room_1_round_id;
                    }else{
                        this.模擬_局狀態 = '洗牌中';
                        this.模擬_局delay_count = this.模擬_局delay.洗牌;
                        //
                        res_msg.狀態 = '洗牌中';
                        res_msg.staus = 'change';
                        res_msg.event_id = this.模擬_EID + ',' + this.模擬_靴號 + ',' + this.模擬_局號;
                    }
                    break;
            }
            this.debug('game_event => 狀態: ' + this.模擬_靴號 + ' 靴, ' + this.模擬_局號 + ' 局, ' + this.模擬_局狀態)
            if(this.game_event_handler !== false){
                //room1
                this.game_event_handler(res_msg);
                res_msg.room_id = this.模擬_room_id_2;
                res_msg.round_id = this.模擬_room_2_round_id;
                //room2
                this.game_event_handler(res_msg);
            }
        }else{
            this.模擬_局delay_count--;
        }
    }
    set_game_event_handler(handler){
        this.game_event_handler = handler;
    }
    get_error(){
        return this.error_msg;
    }
    checkUser(uid){
        if(this.connected === false){return false;}
        if( typeof this.test_user[uid] !== 'undefined'){
            return this.test_user[uid];
        }
        return false;
    }
    loginUser(uid, passed){
        if(this.connected === false){return false;}
        if( typeof this.test_user[uid] === 'undefined'){
            return false;
        }
        if( this.test_user[uid].passed == passed){
            return this.test_user[uid];
        }else{
            return false;
        }
    }
    createUser(data){
        if(this.connected === false){return false;}
        if( typeof data === 'undefined'){
            this.error_msg += 'createUser=>無輸入資料' + "\r\n";
            return false;
        }
        if( typeof data.uid === 'undefined'){
            this.error_msg += 'createUser=>無輸入uid' + "\r\n";
            return false;
        }
        if( typeof data.passwd === 'undefined'){
            this.error_msg += 'createUser=>無輸入passwd' + "\r\n";
            return false;
        }
        if( typeof data.name === 'undefined'){
            data.name = data.uid;
        }

        if( typeof this.test_user[data.uid] !== 'undefined'){
            this.error_msg += 'createUser=>帳號存在' + "\r\n";
            return false;
        }else{
            this.test_user[data.uid] = {
                uid:data.uid,
                full_uid:'testNX_' + data.uid,
                name:data.name,
                passwd:data.passwd,
                point:0,
                enable:true,
                enableBet:true,
                betSetting:'BA-A',
                lastLive:new Date()
            }

            return this.test_user[data.uid];
        }
    }
    editUser(data){
        if(this.connected === false){return false;}
        if( typeof data === 'undefined'){
            this.error_msg += 'editUser=>無輸入資料' + "\r\n";
            return false;
        }
        if( typeof data.uid === 'undefined'){
            this.error_msg += 'editUser=>無輸入uid' + "\r\n";
            return false;
        }

        if( typeof this.test_user[data.uid] !== 'undefined'){
            if( typeof data.name !== 'undefined'){
                this.test_user[data.uid].name = data.name;
            }
            if( typeof data.passwd !== 'undefined'){
                this.test_user[data.uid].passwd = data.passwd;
            }
            if( typeof data.enable !== 'undefined'){
                this.test_user[data.uid].enable = data.enable;
            }
            if( typeof data.betSetting !== 'undefined'){
                this.test_user[data.uid].betSetting = data.betSetting;
            }
            return this.test_user[data.uid];
        }else{
            this.error_msg += 'editUser=>帳號不存在' + "\r\n";
            return false;
        }
    }
    UserPointChange(data){
        if(this.connected === false){return false;}
        if( typeof data === 'undefined'){
            this.error_msg += 'UserPointChange=>無輸入資料' + "\r\n";
            return false;
        }
        if( typeof data.uid === 'undefined'){
            this.error_msg += 'UserPointChange=>無輸入uid' + "\r\n";
            return false;
        }
        if( typeof data.point === 'undefined'){
            this.error_msg += 'UserPointChange=>無輸入point' + "\r\n";
            return false;
        }
        if( typeof data.msg === 'undefined'){
            this.error_msg += 'UserPointChange=>無輸入msg' + "\r\n";
            return false;
        }
        if( typeof data.attr_id === 'undefined'){
            this.error_msg += 'UserPointChange=>無輸入attr_id' + "\r\n";
            return false;
        }
        if( typeof data.attr_from === 'undefined'){
            this.error_msg += 'UserPointChange=>無輸入attr_from' + "\r\n";
            return false;
        }

        if( typeof this.test_user[data.uid] !== 'undefined'){
            if( (this.test_user[data.uid].point + data.point) < 0){
                this.error_msg += 'UserPointChange=>點數不夠' + "\r\n";
                return false;
            }

            if(typeof this.user_point[data.uid] === 'undefined'){
                this.user_point[data.uid] = {};
            }
            let cid = this.newPointId();
            let bs = {
                point_id:cid,
                uid:data.uid,
                point:data.point,
                'orig':this.test_user[data.uid].point,
                'new':(this.test_user[data.uid].point + data.point),
                msg:data.msg,
                attr_id:data.attr_id,
                attr_from:data.attr_from
            };
            this.test_user[data.uid].point = (this.test_user[data.uid].point + data.point);
            this.user_point[data.uid][cid] = bs;
            return bs;
        }else{
            this.error_msg += 'UserPointChange=>帳號不存在' + "\r\n";
            return false;
        }
    }

    getGameResult(room_id){
        if(this.connected === false){return false;}
        if(typeof this.game_data[room_id] === 'undefined'){
            this.error_msg += 'gameResult=>無此房間' + room_id + "\r\n";
            return false;
        }
        return this.game_data[room_id].result;
    }
    userAddBet(data){
        if(this.connected === false){return false;}
        if( typeof data === 'undefined'){
            this.error_msg += 'userAddBet=>無輸入資料' + "\r\n";
            return {status:'error', data:'無輸入資料'};
        }
        if( typeof data.uid === 'undefined'){
            this.error_msg += 'userAddBet=>無輸入uid' + "\r\n";
            return {status:'error', data:'無輸入uid'};
        }
        if( typeof data.room_id === 'undefined'){
            this.error_msg += 'userAddBet=>無輸入room_id' + "\r\n";
            return {status:'error', data:'無輸入room_id'};
        }
        if( typeof data.cmd === 'undefined'){
            this.error_msg += 'userAddBet=>無輸入cmd' + "\r\n";
            return {status:'error', data:'無輸入cmd'};
        }
        if( typeof data.val === 'undefined'){
            this.error_msg += 'userAddBet=>無輸入value' + "\r\n";
            return {status:'error', data:'無輸入value'};
        }

        if(this.模擬_局狀態 != '開始下注'){
            this.error_msg += 'userAddBet=>已停止下注' + "\r\n";
            return {status:'error', data:'已停止下注'};
        }
        if( typeof this.test_user[data.uid] !== 'undefined'){
            if(data.val > this.test_user[data.uid].point){
                this.error_msg += 'userAddBet=>點數不夠' + "\r\n";
                return {status:'error', data:'點數不夠'};
            }
            let rid = -1;
            if(data.room_id == this.模擬_room_id_1){
                rid = this.模擬_room_1_round_id;
            }else if(data.room_id == this.模擬_room_id_2){
                rid = this.模擬_room_2_round_id;
            }else{
                this.error_msg += 'userAddBet=>房間不存在' + "\r\n";
                return {status:'error', data:'房間不存在'};
            }
            let bs = {
                bet_id : this.newBetId(),
                room_id :data.room_id,
                round_id:rid,
                uid:data.uid,
                cmd:data.cmd,
                val:data.val,
                result:0,
                result_msg:'未開牌'
            };
            this.game_data[data.room_id].bet[rid].push(bs);
            if(typeof this.user_bet[data.uid] == 'undefined'){
                this.user_bet[data.uid] = {};
                this.user_bet[data.uid][bs.bet_id] = bs;
            }
            return {status:'success', data:bs};;
        }else{
            this.error_msg += 'userAddBet=>帳號不存在' + "\r\n";
            return {status:'error', data:'帳號不存在'};
        }
    }
    getUserBet(uid){
        if(this.connected === false){return false;}
        if(typeof this.user_bet[uid] == 'undefined'){
            return false;
        }else{
            return this.user_bet[uid];
        }
    }
    getUsetPointLog(uid){
        if(this.connected === false){return false;}
        if(typeof this.user_point[uid] == 'undefined'){
            return false;
        }else{
            return this.user_point[uid];
        }
    }
    getBetSetting(){
        return this.betSetting;
    }

    getResultImageURL(event_id){
        return 'http://localhost/test_file/image.png?eid=' + event_id;
    }
    getVideoURL(room_id, uid){
        return 'http://localhost/test_file/video.flv?rid=' + room_id;
        /*
        <script src="flv.min.js"></script>
<video id="videoElement"></video>
<script>
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            url: 'http://example.com/flv/video.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
</script>
 */
    }
}

exports.api_client = api_client;
