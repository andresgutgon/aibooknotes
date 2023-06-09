import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '../../assets/styles/tailwind.css'
import App from './SyncNotes'

const app = document.createElement("div")
app.id = 'aibooknotes'

const body = document.querySelector('body')
const insertPoint = document.getElementById('kp-notebook-annotations')

if (insertPoint) {
  insertPoint.prepend(app)
} else if (body) {
  body.prepend(app)
}

alert("HOOOOOOOOOLA")

const root = document.getElementById('aibooknotes') as HTMLElement
createRoot(root).render(<StrictMode><App /></StrictMode>)
