import { graphql, readFragment, ResultOf } from 'gql.tada'
import { PokemonsQuery } from './Pokemons'

export const fragments = {
	PokemonFragment: graphql(`
		fragment Pokemon on pokemon_v2_pokemonspecies {
			has_gender_differences
			evolves_from_species_id
			generation_id
			name
			evolution_chain_id
		}
	`),
}

interface Props {
	pokemonItem: ResultOf<typeof PokemonsQuery>['pokemons'][number]
}

export const Pokemon = ({ pokemonItem }: Props) => {
	const fragmentItem = readFragment(fragments.PokemonFragment, pokemonItem)
	const pokemon = { ...pokemonItem, ...fragmentItem }

	return (
		<div>
			<p>ID: {pokemon.id}</p>
			<p>Name: {pokemon.name}</p>
			<p>Generation: {pokemon.generation_id}</p>
			<p>Has gender differences: {pokemon.has_gender_differences}</p>
			<p>Evolves from species ID: {pokemon.evolves_from_species_id}</p>
			<p>Evolution chain ID: {pokemon.evolution_chain_id}</p>
		</div>
	)
}
