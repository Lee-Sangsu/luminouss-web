import React from 'react';

const CheckExist = ({handlePageChange, setLeadBlock}) => {

    //useRef 아용해서 다음 혹은 다다음 페이지로 넘기기
    return (
        <div id="check-exist">
            <h3 id='subtitle'>산책로에 유도블록이 있었나요?</h3>
            <div id="ox-btns">
                <button id="o-btn" onClick={()=>{
                    setLeadBlock(true);
                    handlePageChange(5);
                }}>O</button>
                <button id="x-btn" onClick={()=> {
                    setLeadBlock(false);
                    handlePageChange(6);
                }}>X</button>
            </div>
        </div>
    )
};

export default CheckExist;