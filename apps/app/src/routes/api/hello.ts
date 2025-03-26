import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'

export const APIRoute = createAPIFileRoute('/api/hello')({
	GET: () => {
		return json({ message: 'Hello Tanstack, and Turborepo' })
	},
})
