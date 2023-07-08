import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'tailwind-config/global.css'

import App from './App'
import loadFont from './lib/loadFont'

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
