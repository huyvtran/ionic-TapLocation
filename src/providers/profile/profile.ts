import firebase, { User } from 'firebase/app';
import 'firebase/database';
import { Injectable } from '@angular/core';


@Injectable()
export class ProfileProvider {

  userProfile: firebase.database.Reference;
  currentUser: User;
  firedata = firebase.database().ref('/userProfile');
  viewDetails = [];
  constructor() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`)
      }
    })


    console.log('Hello ProfileProvider Provider');
  }
  signOut(): Promise<any> {
    const userId: string = firebase.auth().currentUser.uid;
    // firebase.database().ref(`/userProfile/${userId}`).off();

    return firebase.auth().signOut();
  }
  clear() {
    this.viewDetails = []
  }
  UserDetails(firstName: string, lastName: string): any {
    return this.userProfile.update({ firstName, lastName });
  }
  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        let userdata = snapshot.val();
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  updateEmail(newEmail: string, oldEmail: string): Promise<any> {
    const credentials: firebase.auth.AuthCredential =
      firebase.auth.EmailAuthProvider.credential(this.currentUser.email, oldEmail);
    return this.currentUser.reauthenticateWithCredential(credentials).then(user => {
      this.currentUser.updateEmail(newEmail).then(user => {
        console.log('Email has been changed')
      })
    }).catch(error => {
      console.log(error);
    })

  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credentials: firebase.auth.AuthCredential =
      firebase.auth.EmailAuthProvider.
        credential(this.currentUser.email, oldPassword);
    return this.currentUser.reauthenticateWithCredential(credentials)
      .then(user => {
        this.currentUser.updatePassword(newPassword).then(user => {
          console.log('Password has been changed')
        })
      }).catch(error => {
        console.log(error);
      })

  }

}