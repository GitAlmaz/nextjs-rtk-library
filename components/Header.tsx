import Link from 'next/link'
import { memo, ReactNode, useCallback, useState } from 'react'
import { Layout, Menu } from 'antd'
import { HomeOutlined, TeamOutlined, BookOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

type NavBarItem = {
	key: string
	href: string
	text: string
	icon: ReactNode
}

const Header = () => {
	const [selectedKey, setSelectedKey] = useState()
	const selectHandler = useCallback(({ key }) => {
		setSelectedKey(key)
	}, [])

	console.log('render')

	const navBar = [
		{
			key: 'home',
			href: '/',
			text: 'Home',
			icon: <HomeOutlined />
		},
		{
			key: 'authors',
			href: '/authors',
			text: 'Authors',
			icon: <TeamOutlined />
		},
		{
			key: 'books',
			href: '/books',
			text: 'Books',
			icon: <BookOutlined />
		}
	] as NavBarItem[]
	return (
		<Layout.Header>
			<Menu
				theme='dark'
				mode='horizontal'
				defaultSelectedKeys={[selectedKey]}
				onSelect={selectHandler}
			>
				{navBar.map(item => (
					<Menu.Item key={item.key} icon={item.icon}>
						<Link href={item.href}>{item.text}</Link>
					</Menu.Item>
				))}
			</Menu>
		</Layout.Header>
	)
}

export default Header
