import AddRoadLink from 'components/atoms/AddRoadLink';
import React from 'react';

const MsgContainer = () => {
    return (
        <div id="msg-container" style={{
            position:'absolute', zIndex:'2', left:'8%', top:'60%', width:'755px', height: '192px'
        }}>
            <h1 style={{
                fontSize:'64px',
                fontStyle: 'normal',
                fontWeight: 'bold',
                lineHeight: '73px',
            }}>함께 걸어요, WalkWith</h1>
            <div style={{
                width: '100%',
                display:'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start'
            }}>
                <h4 style={{
                    fontSize:'18px',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    lineHeight: '28px',
                    width:'382px',
                    marginRight:'56px',
                    marginBlockEnd: '0'
                }}>
{`산책로 정보를 추가해 시각장애인의 눈과 발이 되어주세요. 산책로 정보를 입력하시면, 여가활동이 어려운 시각장애인들에게 다양하고 편안한 산책 경험을 제공할 수 있습니다. `}
                </h4>
                <AddRoadLink />
            </div>

        </div>
    )
};

export default MsgContainer;