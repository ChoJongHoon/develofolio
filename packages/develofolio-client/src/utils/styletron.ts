import { Client, Server } from 'styletron-engine-atomic'

const styletron: Client | Server =
	typeof window === 'undefined'
		? new Server()
		: new Client({
				hydrate: document.getElementsByClassName(
					'_styletron_hydrate_'
				) as HTMLCollectionOf<HTMLStyleElement>,
		  })

export { styletron }
