import logo from "./logo.svg"
import "./App.css"
import Notification from "./firebaseNotifications/Notification"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Web app use received notification firebase</p>
        <span>tokens in console</span>
      </header>
      <Notification />
    </div>
  )
}

export default App
