import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

export default ({ env: { firebase } }) => {
  if (Firebase.apps.length > 0) {
    return
  }

  Firebase.initializeApp(firebase.config)
  Firebase.analytics()
  Firebase.firestore()
    .enablePersistence()
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.error(
          'Multiple tabs open, persistence can only be enabled in one tab at a a time.'
        )
      } else if (err.code === 'unimplemented') {
        console.error(
          'The current browser does not support all of the features required to enable persistence'
        )
      }
    })
}
