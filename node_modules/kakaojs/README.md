kakaojs
========
A mirror of the Kakao Javascript SDK to support easier distribution via CDNs. 

The Kakao-distributed script https://developers.kakao.com/sdk/js/kakao.min.js is hosted only in South Korea and has relatively poor speeds from other countries. There is also no non-HTTPS method of delivery. I've contacted Kakao support and was advised that if speed was a concern, it would be better to use a self-hosted copy instead of relying on Kakao servers.


## Usage
The Kakao JS SDK can be used to access the Kakao API such as auth/share. For example, to create a KakaoTalk share button on a webpage (similar to the Whatsapp share button):

```html
<script src="//your-cdn-path/kakao.min.js"></script>
<!-- or
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
-->
<script type="text/javascript">
Kakao.init('YOUR_KAKAO_API_KEY');
Kakao.Link.createTalkLinkButton({
  container: '#YOUR_LINK',
  label: 'YOUR CUSTOM LABEL/CAPTION',
  image: {  // optional
    src: 'YOUR IMAGE URI',
    width: YOUR_IMG_WIDTH,
    height: YOUR_IMG_HEIGHT
  },
  webButton: {
    text: 'LINK TEXT IN KAKAOTALK',
    url: 'SHARED LINK URL')
  }
});
</script>
```

More detailed Kakao documentation (in Korean) https://developers.kakao.com/docs/js#카카오-로그인
