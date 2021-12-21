export type FireBaseSignInRespose = {
  idToken: string //	A Firebase Auth ID token for the authenticated user.
  email: string //	The email for the authenticated user.
  refreshToken: string //	A Firebase Auth refresh token for the authenticated user.
  expiresIn: string //	The number of seconds in which the ID token expires.
  localId: string //	The uid of the authenticated user.
  registered: boolean //	Whether the email is for an existing account.
}

export type FireBaseProviderUserInfo = {
  providerId: string
  federatedId: string
}

export type FireBaseUserDetails = {
  localId: string //	The uid of the current user.
  email: string //	The email of the account.
  emailVerified: boolean //	Whether or not the account's email has been verified.
  displayName: string //	The display name for the account.
  providerUserInfo: FireBaseProviderUserInfo[] //List of all linked provider objects which contain "providerId" and "federatedId".
  photoUrl: string //	The photo Url for the account.
  passwordHash: string //	Hash version of password.
  passwordUpdatedAt: number //	The timestamp, in milliseconds, that the account password was last changed.
  validSince: string //	The timestamp, in seconds, which marks a boundary, before which Firebase ID token are considered revoked.
  disabled: boolean //	Whether the account is disabled or not.
  lastLoginAt: string //	The timestamp, in milliseconds, that the account last logged in at.
  createdAt: string //	The timestamp, in milliseconds, that the account was created at.
  customAuth: boolean //	Whether the account is authenticated by the developer.
}

export type FireBaseGetUserDataResponse = {
  users: FireBaseUserDetails[] //The account associated with the given Firebase ID token. Check below for more details.
}
