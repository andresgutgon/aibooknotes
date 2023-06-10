import { useEffect, useRef, useState } from "react";

function findByDomId(id: string) {
  return document.getElementById(id)
}

const NOTES_ROOT_ELEMENT = 'kp-notebook-annotations-pane'
const NOTES_SPINNER_NOTES = 'kp-notebook-annotations-spinner'
const NOTES_SPINNER_BOOK = 'kp-notebook-spinner'
const NOTES_COUNTER = 'kp-notebook-highlights-count'

export default function useNotesLoading() {
  const observerRef = useRef(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) return

    const root = findByDomId(NOTES_ROOT_ELEMENT)
    const observer = new MutationObserver((mutationsList, _observer) => {
      if (mutationsList.some(mutation => mutation.target === root)) {
        console.log('aibn: page changed');
        setLoading(true)
      }
    })

    observer.observe(root, { attributes: true, childList: true, subtree: true })
    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [setLoading, loading])

  useEffect(() => {
    if (!loading) return

    function checkLoaderSpinner() {
      const isLoadingNotes = findByDomId(NOTES_SPINNER_NOTES)?.style?.display !== 'none'
      const isLoadingBook = findByDomId(NOTES_SPINNER_BOOK)?.style?.display === 'block'
      const counter = Number(findByDomId(NOTES_COUNTER)?.textContent)
      const isLoadingCounter = isNaN(counter)

      const isLoading = isLoadingBook || isLoadingNotes || isLoadingCounter

      if (!isLoading) {
        clearInterval(interval)
        setLoading(false)
      }
    }

    const interval = setInterval(checkLoaderSpinner, 300)
    return () => {
      clearInterval(interval)
    }
  }, [loading])
  return loading
}
