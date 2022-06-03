
// uuidはhtmlファイル内でリンク挟んだのでrequireなし
// const { v4: uuidv4 } = require('uuid');
// import { v4 as uuidv4 } from 'uuid';

// requestとかhttpsでこの辺がうまくいってない
// var request = require('request');
const https = require('https');
// const https = require('https-browserify')
// import * as https from "https";

const KEY='OjwoF3m0l20OFidHsRea3ptuQRfQL10ahbEtLa'
const ID1 = '2twhynojr3';
const AREA = 'ap-northeast-1';
const URL = `/dev/`;

var SESSION = String(uuidv4);
var SEQ = 0;
var UID = 'unknown';
var LOGS = [];
var epoch = Date.now();

const options = {
  method: "POST",
  headers: {
    'x-api-key': `A${KEY}s`,
    "Content-Type": "application/json",
  },
};
// const request = https.request(URL, options);
const request = https.request(URL, options, response => {
    if (response.statusCode != 200) {
        console.log(data);
    }
});

function send_log(right_now=false){
    now = Date.now();
    delta = (now - epoch);
    epoch = now;
    if (LOGS.length > 0 && (right_now || delta > 180)) {
        data = JSON.stringify({
            'session': SESSION,
            'uid': UID,
            'logs': Array.from(LOGS),
        });
        request.write(data);
        request.end();
        LOGS = [];
    }
}

function log(kwargs){
    now = new Date();
    date = now.toISOString();
    logdata = {'seq':SEQ, 'date': date, kwargs};
    LOGS.push(logdata);
    SEQ += 1;
    send_log();
    return logdata
}

function record_login(uid, kwargs){
    UID = uid;
    logdata = log(uid=UID, kwargs)
    send_log(right_now=true)       
}

module.exports = function(uid, kwargs) {
    record_login(uid, kwargs)
};

// if (require.main === module) {
//     data = JSON.stringify({
//         'uid': '11111',
//         'test': 'test'
//     });
//     request.write(data);
//     request.end();
//     // record_login({uid:'11111'}, {test:'test'});
// }
