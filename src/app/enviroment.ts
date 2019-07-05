export const FIREBASE_CONFIG = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
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
