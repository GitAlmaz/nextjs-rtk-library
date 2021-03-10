import Head from 'next/head'
import { ReactNode } from 'react'
import { Layout } from 'antd'
import Header from './Header'

const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Head>
				<title>Library | NextJs</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<Layout.Content style={{ padding: 20 }}>{children}</Layout.Content>
		</>
	)
}

export { MainLayout }
