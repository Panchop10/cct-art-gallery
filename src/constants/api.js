// User services
const HOST = `http://localhost:8000`;

//END POINTS

//AUTHENTICATION
const SIGNUP = `${HOST}/users/signup/`;
const LOGIN = `${HOST}/login/`;

//ART PIECES
const ARTPIECES = `${HOST}/art-pieces/`;
const LIKEARTPIECES = `${HOST}/users/`; ///users/{user}/likes/ it has to be fixed

//ARTISTS
const ARTISTS = `${HOST}/artists/`;

//USERS
const USERS = `${HOST}/users/`;



export {
  SIGNUP,
  LOGIN,
  ARTPIECES,
  LIKEARTPIECES,
  ARTISTS,
  USERS,
};
