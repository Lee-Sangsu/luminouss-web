import React from "react";
import {
  useRecoilValue,
} from 'recoil';
import InfraListState from 'recoilStates/Addroad/InfraListState';
import InfraItem from 'components/molecules/ForAddRoad/4RestPlace/InfraItem';
import InfraItemCreator from 'components/molecules/ForAddRoad/4RestPlace/InfraItemCreator';

const Drest = () => {
  const infraList = useRecoilValue(InfraListState);

  return (
    <>
      <h4>시설 추가</h4>
      <InfraItemCreator />
      {infraList.map((infraItem) => (
        <InfraItem key={infraItem.id} item={infraItem} />
      ))}
    </>
  )
};

export default Drest;