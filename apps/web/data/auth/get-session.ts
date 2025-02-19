import { NextRequest } from "next/server"

export const oryEndpoint = process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL || 'http://localhost:4000'

export const getSession = async (request: NextRequest) => {
  const cookie = request.cookies.get('ory_session')

  if (!cookie) return null

  try {
    const response = await fetch(`${oryEndpoint}/sessions/whoami`, {
      headers: {
        Cookie: `ory_session=${cookie.value}`,
      },
    })

    if (!response.ok) return null

    return await response.json()
  } catch {
    console.error('Session fetch error')
    return null
  }
}