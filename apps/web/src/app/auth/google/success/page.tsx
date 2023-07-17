'use client'

import { useEffect } from 'react'

export default function GoogleAuthSuccess() {
  useEffect(() => {
    window.close()
  }, [])

  return null
}
