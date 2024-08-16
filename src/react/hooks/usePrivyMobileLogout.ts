import { usePrivy } from "@privy-io/expo"
import { Auth } from "@src/auth"
import { useEffect, useRef } from "react"

export const usePrivyMobileLogout = (auth: Auth) => {
  const initialized = useRef<boolean>(false)
  const { logout, isReady } = usePrivy()

  useEffect(() => {
    if (!initialized.current && isReady) {
      initialized.current = true

      auth.on("__logout", () => {
        console.log("logout")
        logout()
      })
    }
  }, [isReady])
}
