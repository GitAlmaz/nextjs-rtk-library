import type { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { MainLayout } from '../components/MainLayout'
import NextNprogress from 'nextjs-progressbar'
import store from '../store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<NextNprogress
				color='#29D'
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</Provider>
	)
}

export default MyApp
