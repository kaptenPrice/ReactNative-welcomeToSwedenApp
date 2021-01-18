import { bool } from "prop-types"

export const signOut  = ()=>({
    type: "SIGN_OUT"
})
// export const deleteReduxUser  = ()=>({
//     type: "DELETE_CURRENTUSER"
// })
export const isSendingData = bool =>({
    type: 'IS_SENDING_DATA',
    payload: bool
})


// export const addPhone =phone=>({
//     type: "ADD_PHONE",
//     payload: phone
// })