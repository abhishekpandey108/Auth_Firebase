import {auth} from '../firebase/firebaseConfig'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const firebaseRegister = async(user) =>{
    const res = await(createUserWithEmailAndPassword(auth,user.email,user.password))
    .then(
        async(userAuth)=>{
            await updateProfile(userAuth.user, {
                displayName: user.name,
            })
            return userAuth;
        }
    )
    return res;
}

export const firebaseLogin = async(user) =>{
    const res = await(signInWithEmailAndPassword(auth,user.email,user.password))
   .then(
        async(userAuth)=>{
            await updateProfile(userAuth.user, {
                displayName: user.name,
            })
            return userAuth;
        }
   )
   return res;
}

export const firebaseLogout = async() =>{
    await signOut(auth);
}