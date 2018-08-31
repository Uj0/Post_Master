import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCrSxtCMqmToVCjfyskd2azNw65PrO_Gac",
  authDomain: "playground-183ce.firebaseapp.com",
  databaseURL: "https://playground-183ce.firebaseio.com",
  projectId: "playground-183ce",
  storageBucket: "",
  messagingSenderId: "261124951597"
};

export const firebaseApp = firebase.initializeApp(config);

export const postsRef = firebase.database().ref('posts');
export const commentsRef = (serverKey) => firebase.database().ref(`posts/${serverKey}/comments`);
export const subCommentsRef = (postKey, commentKey) => firebase.database().ref(`posts/${postKey}/comments/${commentKey}/subComments`);

export const singlePostRef = (postKey) => firebase.database().ref(`posts/${postKey}`);
export const singleCommentRef = (postKey, commentKey) => firebase.database().ref(`posts/${postKey}/comments/${commentKey}`);
export const singleSubCommentRef = (postKey, commentKey, subCommentKey) => firebase.database().ref(`posts/${postKey}/comments/${commentKey}/subComments/${subCommentKey}`);
