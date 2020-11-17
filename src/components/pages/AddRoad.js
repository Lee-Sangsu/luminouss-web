import React from "react";

import AddRoadForm from 'components/organisms/AddRoadForm';

const AddRoad = () => {
    //정보등록 onclick으로 firebase.firestore 한번에 넣기

    return (
      <>
        <h3>AddRoad Page</h3>
        <AddRoadForm />
      </>
    );
};

export default AddRoad;