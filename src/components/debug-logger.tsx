'use client'

import { useEffect, useState } from 'react'

export function DebugLogger() {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const log = (message: string) => {
      setLogs(prevLogs => [...prevLogs, message])
    }

    // Log page visits
    log(`Page visited: ${window.location.pathname}`)

    // Check for auth_token cookie
    const hasToken = document.cookie.includes('auth_token=1')
    log(`Auth token present: ${hasToken}`)

    // Log redirects
    const params = new URLSearchParams(window.location.search)
    const from = params.get('from')
    if (from) {
      log(`Redirected from: ${from}`)
    }
  }, [])

  return (
    <div className="fixed bottom-0 left-0 bg-black text-white p-4 max-w-full max-h-48 overflow-auto">
      <h3 className="text-lg font-bold mb-2">Debug Logs:</h3>
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  )
}

