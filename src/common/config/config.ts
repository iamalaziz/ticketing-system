import type { Config } from "./config.interface";

const config: Config = {
	nest: { port: 3000 },
	cors: { enabled: true },
	/* !Implement security for swagger config */
	swagger: {
		enabled: true,
		title: "",
		description: "",
		version: "",
		path: "",
	},
	security: {
		expiresIn: "1h",
		refreshIn: "7d",
		bcryptSaltOrRound: 10,
	},
};

export default (): Config => config;
