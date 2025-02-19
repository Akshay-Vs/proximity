import { useEffect, useState } from 'react'
import { Session } from '@ory/client'
import { ory } from '@/data/auth/ory'

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSession() {
      try {
        const { data } = await ory.toSession()
        setSession(data)
      } catch {
        setSession(null)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  return { session, loading }
}