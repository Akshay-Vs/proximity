import { fastify } from "./server";

(async () => {
  try {
    await fastify.listen({ port: 8001 })

    console.log("Server listening on port 8001")
  }
  catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
})()