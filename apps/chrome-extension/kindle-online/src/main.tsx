import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "tailwind-config/global.css"

import App from './SyncNotes'
import loadFont from './lib/loadFont'

// TODO: Implement Google login
// Check ChatGPT for instructions
/* function loadGoogleAuthLib() { */
/*   const script = document.createElement('script') */
/*   script.src = 'https://accounts.google.com/gsi/client' */
/*   document.head.appendChild(script) */
/* } */

// Inject font path from Chrome extension code
loadFont()


const app = document.createElement("div")
app.id = 'aibooknotes'
app.classList.add('antialiased', '__IABookNotes_Inter')

const body = document.querySelector('body')
const insertPoint = document.getElementById('annotations')

if (insertPoint) {
  insertPoint.prepend(app)
} else if (body) {
  body.prepend(app)
}

const root = document.getElementById('aibooknotes') as HTMLElement
createRoot(root).render(<StrictMode><App /></StrictMode>)
