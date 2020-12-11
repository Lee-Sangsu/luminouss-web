import React from "react";
import {
  useRecoilValue,
} from 'recoil';
import SupportInfraItemCreator from 'components/molecules/ForAddRoad/3SuppportInfra/SupportInfraItemCreator';
import SupportInfraItem from 'components/molecules/ForAddRoad/3SuppportInfra/SupportInfraItem';
import SupportInfraListState from 'recoilStates/Addroad/SupportInfraListState';

const Csupport = () => {
    const supportInfraList = useRecoilValue(SupportInfraListState);
    return (
        <>
        <h4>보조시설 추가</h4>
          <SupportInfraItemCreator />
          {supportInfraList.map((supportInfraItem) => (
            <SupportInfraItem key={supportInfraItem.id} item={supportInfraItem} />
          ))}
        </>
    )
};

export default Csupport;