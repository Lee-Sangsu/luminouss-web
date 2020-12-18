import React from "react";
import AddRoadForm from 'components/organisms/AddRoadForm';


const AddRoad = () => {

  return (
    <div style={{
      display: 'flex',
      position:'absolute',
      width: '100%',
      height: '100%'
    }}>
      <AddRoadForm />
    </div>
  );
};

export default AddRoad;