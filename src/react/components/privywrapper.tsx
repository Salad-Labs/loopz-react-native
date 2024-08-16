import {
  usePrivyMobileAuthWallets,
  usePrivyMobileLinkAccount,
  usePrivyMobileLoginWithEmail,
  usePrivyMobileLoginWithOAuth,
  usePrivyMobileLoginWithSMS,
  usePrivyMobileLogout,
} from "@src/react/hooks"
import { PrivyWrapperProps } from "@src/interfaces"
import React from "react"

export const PrivyWrapper: React.FC<PrivyWrapperProps> = ({
  auth,
  trade,
  children,
}) => {
  //used in mobile environment (React Native)
  //if device is equal to "desktop" for example, inside the hooks there is a check to avoid that these functions will be executed.
  usePrivyMobileAuthWallets(auth)
  usePrivyMobileLinkAccount(auth)
  usePrivyMobileLoginWithEmail(auth)
  usePrivyMobileLoginWithOAuth(auth)
  usePrivyMobileLoginWithSMS(auth)
  usePrivyMobileLogout(auth)

  return <>{children}</>
}
