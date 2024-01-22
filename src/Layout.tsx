import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { GraphQLClient } from 'graphql-request'

export const GQLClientContext = createContext<GraphQLClient | null>(null)

export const Layout = () => {
	const [queryClient] = useState(() => new QueryClient())
	const [gqlClient] = useState(() => new GraphQLClient('https://beta.pokeapi.co/graphql/v1beta'))

	return (
		<QueryClientProvider client={queryClient}>
			<GQLClientContext.Provider value={gqlClient}>
				<main>
					<Outlet />
				</main>
			</GQLClientContext.Provider>
		</QueryClientProvider>
	)
}
