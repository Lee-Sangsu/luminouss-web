import axios from 'axios';
import { useSetRecoilState } from "recoil";
import SMSState from "recoilStates/SMSState";
import CryptoJS from 'crypto-js';


const SendSMS = (userName, userPhoneNum) => {
    // const setSMSState = useSetRecoilState(SMSState);
    const now = Date.now();
    
    var space = " ";				// one space
    var newLine = "\n";				// new line
    var method = "POST";				// method
    var url = `/services/${process.env.REACT_APP_NAVER_ID}/messages`;	// url (include query string)
    var timestamp = `${now}`;			// current timestamp (epoch)
    var accessKey = `${process.env.NAVER_ACCESS_KEY}`;			// access key id (from portal or Sub Account)
    var secretKey = `${process.env.REACT_APP_NAVER_SECRET_KEY}`;			// secret key (from portal or Sub Account)

    var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);
    console.log(now);
    console.log(accessKey);
    var hash = hmac.finalize();

    const signature = hash.toString(CryptoJS.enc.Base64);
    

    axios.post(`https://sens.apigw.ntruss.com/sms/v2/services/${process.env.REACT_APP_NAVER_ID}/messages`, {
        headers : {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': `${now}`,
            'x-ncp-iam-access-key': `${process.env.NAVER_ACCESS_KEY}`,
            'x-ncp-apigw-signature-v2': `${signature}`,
            'Access-Control-Allow-Origin': '*'
        },
        body : {
            'type' : "SMS",
            'from' : '01058745988',
            'content' : `${userName}님, 문자 왔다`,
            'messages': [
                {
                    'to': userPhoneNum
                }
            ]
        }
    }).then((res) => console.log(res)).catch((e) => console.log(e));

};

export default SendSMS;