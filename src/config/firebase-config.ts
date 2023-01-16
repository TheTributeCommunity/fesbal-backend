import { cert, initializeApp } from 'firebase-admin/app'
import { firebaseConfigData } from './firebase-config-data'

initializeApp({
  credential: cert({
    projectId: firebaseConfigData.projectId,
    clientEmail: firebaseConfigData.clientEmail,
    privateKey: firebaseConfigData.privateKey,
  }),
  databaseURL: 'https://fesbal-theam-default-rtdb.europe-west1.firebasedatabase.app',
})
