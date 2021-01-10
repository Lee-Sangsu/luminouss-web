import { useSetRecoilState } from "recoil";
import SMSState from "recoilStates/SMSState";
// const setSMSState = useSetRecoilState(SMSState);

import CryptoJS from 'crypto-js';

const SendSMS = (userName, userPhoneNum) => {
    
    const space = " ";	
    const newLine = "\n";
    const method = "POST";
    const url = `/sms/v2/services/${process.env.REACT_APP_SENS_ID}/messages`;
    console.log(url);
    const now = Date.now().toString();
    
    const accessKey = `${process.env.REACT_APP_NAVER_IAM_ACCESS_KEY_ID}`;	
    console.log(accessKey);
    const secretKey = `${process.env.REACT_APP_NAVER_IAM_SECRET_KEY}`;
    console.log(secretKey);

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
	hmac.update(space);
	hmac.update(url);
	hmac.update(newLine);
	hmac.update(now);
	hmac.update(newLine);
	hmac.update(accessKey);
    
    const hash = hmac.finalize();
    
    const signature = hash.toString(CryptoJS.enc.Base64);
    console.log(signature);
    
    fetch(`https://sens.apigw.ntruss.com${url}`, {
        mode: 'no-cors', // IGNORE CORS ERROR 
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': now,
            'x-ncp-iam-access-key': accessKey,
            'x-ncp-apigw-signature-v2': signature,
        },
        body: JSON.stringify({
            "type" : "SMS",
            "countryCode" : "82",
            "from" : `${process.env.REACT_APP_OUR_PHONE_NUM}`,
            "content" : `${userName}님, 문자 왔다`,
            "messages": [
                {
                    "to": userPhoneNum
                }
            ]
        })
    }).then((res) => console.log(res)).catch((e) => console.error(e))
    
};
    // axios.post('https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:261024814968:luminouss-web/messages', {
    //     headers : {
    //         'Content-Type': 'application/json; charset=utf-8',
    //         'x-ncp-apigw-timestamp': `${now}`,
    //         'x-ncp-iam-access-key': `B3Oqenq3SqhBEuQBxQl3`,
    //         'x-ncp-apigw-signature-v2': signature,
    //         'Access-Control-Allow-Origin': '*'
    //     },
    //     data : {
    //         'type' : "SMS",
    //         'from' : '01058745988',
    //         'content' : `${userName}님, 문자 왔다`,
    //         'messages': [
    //             {
    //                 'to': userPhoneNum
    //             }
    //         ]
    //     }
    // }).then((res) => console.log(res)).catch((e) => console.log(e));


export default SendSMS;