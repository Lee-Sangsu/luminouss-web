1. Luminouss-HP에서 About Page 가져오기
2. MyProfile에서 currentUser 정보 가져와서 표시하기
3. 주변 환경 추가할 때 KakaoMap API로 검색해서 리스트 추가하게 하기 [SupportInfraItemCreator]

희종쌤께 질문:

1. 화면 켜질때 딱 한번만 array에 담는걸 어떻게 하는지 (Home.js)
   - useEffect로 하려 했는데, re-rendering 되었을 때 배열이 중첩될 수 있다고 해서 useMemo를 쓰라는 에러 확인. 근데 어떻게 쓸지 모르겠음.
2. Secret Key들 (KakaoAuthKey, Firebase Key) 어떻게 숨길지(네트워크 기록, 폴더 내에서) -못숨김 (브라우저에서 직접 보내니까)
3. Query Routing 하는 법 궁금함.

피드백:

- key값(= document 이름)에 한글을 입력하는게 위험할 수 았음(에러 발생 가능성).
  -> 필드로 산책로 이름 불러오고 키값들은(= 문서 이름) uuid 사용해서 넣거나 영문으로 표시하면 ㄱㅊ.
