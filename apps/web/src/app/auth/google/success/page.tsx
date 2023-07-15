'use client'

import { useEffect } from 'react'

export default function GoogleAuthSuccess() {
  useEffect(() => {
    console.log('OPENER', window.opener.location);

    window.close()
  }, [])

  return null
}
