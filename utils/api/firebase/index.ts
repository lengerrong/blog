import axios from 'axios'

// https://firebase.google.com/docs/reference/rest/auth/#section-api-usage

export type FireBaseSignPayload = {
  email: string // The email for the user to create.
  password: string // The password for the user to create.
}

export type FireBaseIdTokenBasePayload = {
  idToken: string // The Firebase ID token of the user.
}

export const fireBaseSignUp = (payload: FireBaseSignPayload) => {
  return axios.post('/api/auth/firebase/signUp', payload)
}

export const fireBaseSignIn = (payload: FireBaseSignPayload) => {
  return axios.post('/api/auth/firebase/signInWithPassword', payload)
}

export type FireBaseSendQobConfirmationCodePasswordResetPayload = {
  email: string // User's email address.
} & FireBaseIdTokenBasePayload

export type FireBaseActionCodePayload = {
  oobCode: string // The email action code sent to the user's email for resetting the password
}

export type FireBasePasswordResetPayload = {
  newPassword: string // The user's new password.
} & FireBaseActionCodePayload

export type FireBaseUpdateProfilePayload = {
  displayName?: string //	User's new display name.
  photoUrl?: string // User's new photo url.
  deleteAttribute?: string[] // List of strings	List of attributes to delete, "DISPLAY_NAME" or "PHOTO_URL". This will nullify these values.
} & FireBaseIdTokenBasePayload

export const fireBaseSendPasswordResetEmail = (
  payload: FireBaseSendQobConfirmationCodePasswordResetPayload
) => {
  return axios.post('/api/auth/firebase/sendOobCode', {
    ...payload,
    requestType: 'PASSWORD_RESET'
  })
}

export const fireBaseSendEmailVerification = (
  payload: FireBaseIdTokenBasePayload
) => {
  return axios.post('/api/auth/firebase/sendOobCode', {
    ...payload,
    requestType: 'VERIFY_EMAIL'
  })
}

export const fireBaseVerifyPasswordResetCode = (
  payload: FireBaseActionCodePayload
) => {
  return axios.post('/api/auth/firebase/resetPassword', payload)
}

export const fireBaseConfirmPasswordReset = (
  payload: FireBasePasswordResetPayload
) => {
  return axios.post('/api/auth/firebase/resetPassword', payload)
}

export const fireBaseChangePassword = (
  payload: FireBasePasswordResetPayload
) => {
  return axios.post('/api/auth/firebase/update', payload)
}

export const fireBaseConfirmEmailVerification = (
  payload: FireBaseActionCodePayload
) => {
  return axios.post('/api/auth/firebase/update', payload)
}

export const fireBaseUpdateProfile = (
  payload: FireBaseUpdateProfilePayload
) => {
  return axios.post('/api/auth/firebase/update', payload)
}

export const fireBaseGetUserData = (payload: FireBaseIdTokenBasePayload) => {
  return axios.post('/api/auth/firebase/lookup', payload)
}
