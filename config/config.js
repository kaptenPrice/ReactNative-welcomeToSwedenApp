
import {APIKEY,AUTHDOMAIN, DATABASURL,PROJEKTID,STORAGEBUCKET,MESSAGINGSENDERID,APPID,MEASUREMENTID} from '@env'

export const firebaseConfig = {
    apiKey:APIKEY,
    authDomain: AUTHDOMAIN,
    databaseURL: DATABASURL,
    projectId: PROJEKTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGSENDERID,
    appId: APPID,
    measurementId: MEASUREMENTID
  }