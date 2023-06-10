import { BaseNote } from '../types'

export const NOTES_ROOT_DOM_ID = 'kp-notebook-annotations'
export default function extractNotesFromDom(): BaseNote[] {
  const root = document.getElementById(NOTES_ROOT_DOM_ID)
  return Array.from(root.querySelectorAll(`[id^=highlight-]`)).map(item => {
    const note = item.querySelector('[id=highlight]').textContent
    const comment = item.parentElement.querySelector('[id^=note-] > [id=note]').textContent

    return { note, comment }
  })
}
