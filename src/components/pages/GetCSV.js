import React from 'react';
import firebase from "global/fbase";
import swal from 'sweetalert';


export const GetCSV = () => {
    const [load, setLoad] = React.useState(false);

    const getCSV = async () => {
        try {
            var arr = [];
            var csvStr = "";

            setLoad(true);    
            const resRef = await firebase.firestore().collection('WalkRoad').orderBy('writer');
            (await resRef.get()).forEach((doc) => {
                arr.push({
                    writer: doc.data().writer,
                    road_name: doc.data().road_name
                })
            });  
            csvStr += "작성자, 산책로 이름\r\n";

            arr.forEach((value) => {
                csvStr += `${value.writer},${value.road_name}\r\n`;
            })
    
            var downloadLink = document.createElement("a");
            var blob = new Blob([csvStr], { type: "text/csv;charset=utf-8" });
            var url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = "data.csv";
    
            document.body.appendChild(downloadLink);
            downloadLink.click();
            setLoad(false)
            document.body.removeChild(downloadLink);        
        } catch (e) {
            swal(e)
        }
    }

    return (<div style={{display:'flex', width:'100%', justifyContent:'center', height:window.innerHeight, alignItems: 'center'}}>
        <button id="to-next-page" style={load ? {
            cursor: 'progress',
            background: 'rgb(239, 239, 239)',
        }: {}} onClick={getCSV}>{load ? "파일을 내려받고 있습니다." : "CSV 파일 내려받기"}</button>
    </div>)
};