export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBFXWbsgtEbVFMZ4OpGtH8an6WzeyQDkbY",
    authDomain: "fire-map-cc305.firebaseapp.com",
    databaseURL: "https://fire-map-cc305.firebaseio.com",
    projectId: "fire-map-cc305",
    storageBucket: "",
    messagingSenderId: "674638854725",
    appId: "1:674638854725:web:f2921ebfd76f5ce5"
  };

  export const snapshotToArray = snapshot => {
    let returnArray = [];
    snapshot.forEach(element => {
        let item = element.val();
        item.key = element.key;
        returnArray.push(item);
    });
    return returnArray;
}