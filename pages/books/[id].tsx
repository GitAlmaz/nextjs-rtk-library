import { Descriptions, PageHeader, Skeleton } from 'antd'
import React from 'react'
import { useHookSelector } from '../../hooks/hooks'
import { RootState } from '../../store'

export default function Books({ book: newBook }) {
	const loading = useHookSelector((state: RootState) => state.books.loading)
	return (
		<>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title='Book'
				subTitle={newBook.title}
				extra={[]}
			/>
			{loading ? (
				<Skeleton />
			) : (
				<Descriptions title='Book Info'>
					<Descriptions.Item label='Title'>{newBook.title}</Descriptions.Item>
					<Descriptions.Item label='Author'>
						{newBook.author_first_name + ' ' + newBook.author_last_name}
					</Descriptions.Item>
					<Descriptions.Item label='Created at'>
						{newBook.created_at}
					</Descriptions.Item>
					<Descriptions.Item label='First publish'>
						{newBook.first_publish}
					</Descriptions.Item>
				</Descriptions>
			)}
		</>
	)
}

export async function getStaticPaths() {
	const response = await fetch('http://localhost:3000/api/books')
	const books: Book[] = await response.json()
	const paths = books.map(book => ({
		params: { id: book.key }
	}))

	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	const res = await fetch(`http://localhost:3000/api/books/${params.id}`)
	const book = await res.json()
	return { props: { book } }
}
