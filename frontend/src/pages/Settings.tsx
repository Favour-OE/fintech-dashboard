import { useState, type FormEvent } from "react"
import "./Settings.css"

export default function Settings() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [saved, setSaved] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h2 className="settings-title">Account Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="settings-field">
            <label className="settings-label" htmlFor="settingsName">Full Name</label>
            <input
              id="settingsName"
              placeholder="Full Name Here"
              className="settings-input"
              value={name}
              onChange={(e) => { setName(e.target.value); setSaved(false) }}
            />
          </div>
          <div className="settings-field">
            <label className="settings-label" htmlFor="settingsEmail">Email</label>
            <input
              id="settingsEmail"
              className="settings-input"
              placeholder="enter your email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setSaved(false) }}
            />
          </div>
          <div className="settings-field">
            <label className="settings-label" htmlFor="settingsPlan">Plan</label>
            <input
              id="settingsPlan"
              className="settings-input settings-input--readonly"
              value="Premium"
              readOnly
            />
          </div>
          <div className="settings-actions">
            <button className="settings-btn" type="submit">Save Changes</button>
          </div>
        </form>
        {saved && <div className="settings-toast">Settings saved successfully!</div>}
      </div>
    </div>
  )
}
