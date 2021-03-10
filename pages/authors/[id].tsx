import { Descriptions, PageHeader, Skeleton } from 'antd'
import React from 'react'
import { useHookSelector } from '../../hooks/hooks'
import { RootState } from '../../store'

export default function Books({ author }) {
	const loading = useHookSelector((state: RootState) => state.books.loading)
	return (
		<>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title='Author'
				subTitle={author.first_name}
			/>
			{loading ? (
				<Skeleton />
			) : (
				<Descriptions title='Author Info'>
					<Descriptions.Item label='Last name'>{author.last_name}</Descriptions.Item>
					<Descriptions.Item label='First name'>{author.first_name}</Descriptions.Item>
				</Descriptions>
			)}
		</>
	)
}

export async function getStaticPaths() {
	const response = await fetch('http://localhost:3000/api/authors')
	const authors: Author[] = await response.json()
	const paths = authors.map(author => ({
		params: { id: author.key }
	}))

	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	const res = await fetch(`http://localhost:3000/api/authors/${params.id}`)
	const author = await res.json()
	return { props: { author } }
}
