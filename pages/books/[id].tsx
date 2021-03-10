import { Descriptions, PageHeader, Skeleton } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useHookDispatch, useHookSelector } from '../../hooks/hooks'
import { RootState } from '../../store'
import { getUserById, getUsers } from '../../store/authors/authorsSlice'
import { getBookById } from '../../store/books/booksSlice'

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
	// params contains the post `id`.
	// If the route is like /posts/1, then params.id is 1
	const res = await fetch(`http://localhost:3000/api/books/${params.id}`)
	const book = await res.json()

	// Pass post data to the page via props
	return { props: { book } }
}
