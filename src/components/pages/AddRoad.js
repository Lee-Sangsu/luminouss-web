import React from "react";
import AddRoadForm from 'components/organisms/AddRoadForm';
import GlobalNav from "global/GlobalNav";


const AddRoad = () => {

  return (
    <div style={{
      display: 'flex',
      position:'absolute',
      width: '100%',
      height: '100%'
    }}>
      <AddRoadForm />
      <GlobalNav isFirstPage={false} isNotHome={false} />
    </div>
  );
};

export default AddRoad;