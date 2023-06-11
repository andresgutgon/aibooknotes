import { BaseNote } from '../types'

const ROW_CLASS = '.a-row'
const LONG_ID_SIZE = 50
function findParent(element: Element | null) {
  let parent = (element?.parentNode as Element)?.closest(ROW_CLASS);

  if (!parent) return null

  while (parent) {
    const id = parent.getAttribute('id')
    if (id && id.length > LONG_ID_SIZE && !id.startsWith('highlight-')) {
      return parent
    }
    parent = (parent?.parentNode as Element)?.closest(ROW_CLASS)
  }

  return null;
}

export const NOTES_ROOT_DOM_ID = 'kp-notebook-annotations'
export default function extractNotesFromDom(): BaseNote[] {
  const root = document.getElementById(NOTES_ROOT_DOM_ID)
  if (!root) return []

  return Array.from(root.querySelectorAll(`[id^=highlight-]`)).map(item => {
    const element = item.querySelector('[id=highlight]')
    const note = element?.textContent || ''
    const parent = findParent(element)
    const annotation = parent?.querySelector('#annotationNoteHeader')?.textContent
    const annontationMatch = annotation?.match(/\d+$/)
    const numberValue = annontationMatch ? annontationMatch[0] : null
    const pageNumber = numberValue ? Number(numberValue) : null
    const comment = item?.parentElement?.querySelector('[id^=note-] > [id=note]')?.textContent || undefined
    return { note, comment, pageNumber }
  })
}
