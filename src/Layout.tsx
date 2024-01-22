import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { GraphQLClient } from 'graphql-request'

export const GQLClientContext = createContext<GraphQLClient | null>(null)

export const Layout = () => {
	const [queryClient] = useState(() => new QueryClient())
	const [gqlClient] = useState(() => new GraphQLClient('https://beta.pokeapi.co/graphql/v1beta'))

	useEffect(() => {
		console.log('Layout mounted')
		return () => {
			console.log('Layout unmounted')
		}
	})

	return (
		<QueryClientProvider client={queryClient}>
			<GQLClientContext.Provider value={gqlClient}>
				<main>
					<nav>
						<ul>
							<li>
								<Link role='button' to='/'>
									Boxes
								</Link>
							</li>
							<li>
								<Link role='button' to='/Pokemon'>
									Pokemon
								</Link>
							</li>
						</ul>
					</nav>
					<Outlet />
				</main>
			</GQLClientContext.Provider>
		</QueryClientProvider>
	)
}
