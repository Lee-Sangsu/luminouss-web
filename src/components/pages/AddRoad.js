import React from "react";
import AddRoadForm from 'components/organisms/AddRoadForm';
import useConfirm from 'hooks/useConfirm';

const AddRoad = () => {
  
    const submitConfirm = () => {
      // recoil value 다 가져와서 firestore에 한번에 저장
    };
    const abort = () => console.log('abort'); 
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