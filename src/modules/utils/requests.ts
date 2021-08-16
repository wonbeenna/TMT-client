const requests = {
  //user
  userInfoURL: `${process.env.REACT_APP_API}/user/userInfo`,
  signUpURL: `${process.env.REACT_APP_API}/user/signUp`,
  loginURL: `${process.env.REACT_APP_API}/user/signIn`,
  tokenURL: `${process.env.REACT_APP_API}/token/refreshToken`,
  searchURL: `${process.env.REACT_APP_API}/user/myPage`,
  likeURL: `${process.env.REACT_APP_API}/user/like`,
  photoLikeURL: `${process.env.REACT_APP_API}/user/photoLike`,
  WithDrawURL: `${process.env.REACT_APP_API}/user/withdrawal`,
  nonUserLoginURL: `${process.env.REACT_APP_API}/user/nonUser`,
  checkEmailURL: `${process.env.REACT_APP_API}/user/checkEmail`,
  checkPasswordURL: `${process.env.REACT_APP_API}/user/checkPassword`,
  //auth
  googleURL: `${process.env.REACT_APP_API}/auth/google`,
  kakaoURL: `${process.env.REACT_APP_API}/auth/kakao`,
  //trip
  listURL: `${process.env.REACT_APP_API}/trip/list`,
  spotURL: `${process.env.REACT_APP_API}/trip/search`,
  sendURL: `${process.env.REACT_APP_API}/trip/insertSpot`,
  recommendURL: `${process.env.REACT_APP_API}/trip/recommend`,
  planURL: `${process.env.REACT_APP_API}/trip/plan`,
  viewURL: `${process.env.REACT_APP_API}/trip/view?match=`,
  planSearchURL: `${process.env.REACT_APP_API}/trip/planSearch`,
  //domain
  myPageURL: `${process.env.REACT_APP_BUCKET}/Mypage`,
  MyDomainURL: `${process.env.REACT_APP_DOMAIN}/Mypage`,
  mainPageURL: `${process.env.REACT_APP_BUCKET}/Mainpage`,
  MainDomainURL: `${process.env.REACT_APP_DOMAIN}/Mainpage`,
};

export default requests;
