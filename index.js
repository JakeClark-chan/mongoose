// Require the framework and instantiate it
const fastify = require("fastify")({
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
});
const osu = require("node-os-utils");

// Declare a route
fastify.get("/", async (request, reply) => {
	return { cpu: await osu.cpu.usage(), mem: await osu.mem.used() };
});

// Run the server!
const start = async () => {
	try {
		await fastify.listen({ port: 3000, host: '0.0.0.0' });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

module.exports = start