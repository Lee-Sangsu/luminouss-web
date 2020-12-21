import React from 'react';

const CheckExist = ({handlePageChange, setLeadBlock}) => {

    //useRef 아용해서 다음 혹은 다다음 페이지로 넘기기
    return (
        <div style={{
            display:'flex',
            width: '100%', 
            height: '100%',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column'
        }}>
            <h3>산책로에 유도블럭이 있었나요?</h3>
            <div>
                <button onClick={()=>{
                    setLeadBlock(true);
                    handlePageChange(5);
                }}>O</button>
                <button onClick={()=> {
                    setLeadBlock(false);
                    handlePageChange(6);
                }}>X</button>
            </div>
        </div>
    )
};

export default CheckExist;