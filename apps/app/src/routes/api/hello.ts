import { json } from '@tanstack/react-start'
import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute('/api/hello').methods({
	GET: () => {
		return json({ message: 'Hello Tanstack, and Turborepo' })
	},
})
