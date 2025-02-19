export function orySdkUrl() {
  let baseUrl

  if (process.env["NEXT_PUBLIC_KRATOS_PUBLIC_URL"]) {
    baseUrl = process.env["NEXT_PUBLIC_KRATOS_PUBLIC_URL"]
  }

  if (!baseUrl) {
    throw new Error(
      "You need to set environment variable `NEXT_PUBLIC_KRATOS_PUBLIC_URL` to your Ory Network SDK URL.",
    )
  }

  return baseUrl.replace(/\/$/, "")
}

export function isProduction() {
  return (
    ["production", "prod"].indexOf(
      process.env["VERCEL_ENV"] || process.env["NODE_ENV"] || "",
    ) > -1
  )
}