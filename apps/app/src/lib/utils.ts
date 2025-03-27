import { allPosts } from 'content-collections'

export const sortedPosts = allPosts.sort(
	(a, b) =>
		new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
)

export type Posts = typeof allPosts
