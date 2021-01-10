import AddRoadLink from 'components/atoms/AddRoadLink';
import React from 'react';

const MsgContainer = () => {
    return (
        <div id="msg-container">
            <h1 id="msg-title">함께 걸어요, WalkWith</h1>
            <div id="msg-text-area">
                <h4 id="main-msg">
{`산책로 정보를 추가해 시각장애인의 눈과 발이 되어주세요. 산책로 정보를 입력하시면, 여가활동이 어려운 시각장애인들에게 다양하고 편안한 산책 경험을 제공할 수 있습니다. `}
                </h4>
                <AddRoadLink />
            </div>

        </div>
    )
};

export default MsgContainer;