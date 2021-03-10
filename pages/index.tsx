import React from 'react'
import { Card, Space } from 'antd'
import styles from '../styles/Home.module.scss'
import Router from 'next/router'

export default function Home() {
	const { Meta } = Card
	return (
		<>
			<div className={styles.home}>
				<Space size='large'>
					<Card
						hoverable
						style={{ width: 240 }}
						onClick={() => Router.push('/books')}
						cover={
							<img
								className={styles.image}
								alt='books'
								src='https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80'
							/>
						}
					>
						<Meta title='Europe Street beat' />
					</Card>
					<Card
						hoverable
						style={{ width: 240 }}
						onClick={() => Router.push('/authors')}
						cover={
							<img
								className={styles.image}
								alt='authors'
								src='https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2766&q=80'
							/>
						}
					>
						<Meta title='Europe Street beat' />
					</Card>
				</Space>
			</div>
		</>
	)
}
