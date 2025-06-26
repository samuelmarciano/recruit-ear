import AuthMicrophone from "raw:~assets/images/auth_microphone.svg"
import React, { useEffect } from "react"

import "~style.css"
import "~styles/authorize-microphone.css"

const AuthorizeMicrophone = () => {
  useEffect(() => {
    const authorizeMicrophone = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((track) => track.stop())
      window.close()
    }
    authorizeMicrophone()
  }, [])

  return (
    <div className="monsterpi13-absolute monsterpi13-inset-0 monsterpi13-h-full monsterpi13-w-full monsterpi13-flex monsterpi13-items-center monsterpi13-justify-center">
      <img
        src={AuthMicrophone}
        height="50%"
        width="50%"
        alt="authorize microphone"
      />
    </div>
  )
}

export default AuthorizeMicrophone
