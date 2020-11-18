import React from "react";
import AddRoadForm from 'components/organisms/AddRoadForm';
import useConfirm from 'hooks/useConfirm';

const AddRoad = () => {
  
    const submitConfirm = () => console.log("Del");
    const abort = () => console.log('abort'); //abort 함수에서 recoil state에 있는 데이터들 모아서 firestore에 한번에 저장
    const confirmSubmit = useConfirm("You sure?", submitConfirm, abort);
	

    return (
      <>
        <h3>AddRoad Page</h3>
        <AddRoadForm />
        <button onClick={confirmSubmit}> 정보 등록하기 </button>
      </>
    );
};

export default AddRoad;