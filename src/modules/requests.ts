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
  //auth
  googleURL: `${process.env.REACT_APP_API}/auth/google`,
  //trip
  listURL: `${process.env.REACT_APP_API}/trip/list`,
  spotURL: `${process.env.REACT_APP_API}/trip/search`,
  sendURL: `${process.env.REACT_APP_API}/trip/insertSpot`,
  //domain
  myPageURL: `${process.env.REACT_APP_BUCKET}/Mypage`,
  MyDomainURL: `${process.env.REACT_APP_DOMAIN}/Mypage`,
  mainPageURL: `${process.env.REACT_APP_BUCKET}/Mainpage`,
  MainDomainURL: `${process.env.REACT_APP_DOMAIN}/Mainpage`,
};

export default requests;
