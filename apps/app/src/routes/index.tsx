import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

const filePath = 'count.txt'

async function readCount() {
	return Number.parseInt(
		await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
	)
}

const getCount = createServerFn({
	method: 'GET',
}).handler(() => {
	return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
	.validator((d: number) => d)
	.handler(async ({ data }) => {
		const count = await readCount()
		await fs.promises.writeFile(filePath, `${count + data}`)
	})

export const Route = createFileRoute('/')({
	component: Home,
	loader: async () => await getCount(),
})

function Home() {
	const router = useRouter()
	const state = Route.useLoaderData()

	return (
		<div
			className={flex({
				minH: 'screen',
				align: 'center',
				justify: 'center',
				maxW: '2xl',
				mx: 'auto',
			})}
		>
			<button
				type="button"
				onClick={() => {
					updateCount({ data: 1 }).then(() => {
						router.invalidate()
					})
				}}
				className={css({
					py: 2,
					px: 3,
					borderWidth: 1,
					borderColor: 'gray.300',
					rounded: 'sm',
				})}
			>
				Add 1 to {state}?
			</button>
		</div>
	)
}
