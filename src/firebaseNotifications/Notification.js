import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { requestForToken, onMessageListener } from "./firebase"

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "", imageUrl: "" })
  const notify = () => toast(<ToastDisplay />)
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
        <img src={notification?.imageUrl} alt="No image" />
      </div>
    )
  }
  console.log("notification :>> ", notification)
  useEffect(() => {
    if (notification?.title) {
      notify()
    }
  }, [notification])

  requestForToken()

  onMessageListener()
    .then((payload) => {
      console.log("payload :>> ", payload)
      setNotification({ title: payload?.data?.title, body: payload?.data?.body, imageUrl: payload?.data?.imageUrl })
    })
    .catch((err) => console.log("failed: ", err))

  return <Toaster />
}

export default Notification
