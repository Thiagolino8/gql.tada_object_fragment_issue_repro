import { graphql } from 'gql.tada'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { Pokemon, fragments } from './Pokemon'
import { useContext } from 'react'
import { GQLClientContext } from './Layout'
import { ResultOf } from 'gql.tada'

export const PokemonsQuery = graphql(
	`
		query Pokemons($limit: Int = 10, $offset: Int = 0) {
			pokemons: pokemon_v2_pokemonspecies(order_by: { id: asc }, distinct_on: id, limit: $limit, offset: $offset) {
				id
				...Pokemon
			}
		}
	`,
	[fragments.pokemon]
)

const select = (res: InfiniteData<ResultOf<typeof PokemonsQuery> | undefined>) =>
	res?.pages.reduce(
		(acc, page) => [...acc, ...(page?.pokemons ?? [])],
		[] as ResultOf<typeof PokemonsQuery>['pokemons']
	)

export const Pokemons = () => {
	const GQLClient = useContext(GQLClientContext)
	const { data, isFetching, error, fetchNextPage } = useInfiniteQuery({
		getNextPageParam: (_, allPages) => allPages.reduce((acc, page) => (page?.pokemons.length ?? 0) + acc, 0),
		select,
		initialPageParam: 0,
		enabled: !!GQLClient,
		queryKey: ['pokemons'],
		queryFn: ({ pageParam: offset }) => GQLClient?.request(PokemonsQuery, { offset }),
	})

	if (data)
		return (
			<>
				<ul>
					{data.map((pokemon) => (
						<li key={pokemon.id}>
							<Pokemon pokemon={pokemon} />
						</li>
					))}
				</ul>
				<button onClick={() => fetchNextPage()}>Load more</button>
			</>
		)
	if (error) return <p>Oh no... {error?.message}</p>
	if (isFetching) return <p>Loading...</p>
}
