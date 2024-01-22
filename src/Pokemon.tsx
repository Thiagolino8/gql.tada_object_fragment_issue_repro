import { graphql, ResultOf } from 'gql.tada'
import { PokemonsQuery } from './Pokemons'

export const fragment = graphql(`
	fragment Pokemon on pokemon_v2_pokemonspecies @_unmask {
		has_gender_differences
		evolves_from_species_id
		generation_id
		name
		evolution_chain_id
	}
`)

interface Props {
	pokemon: ResultOf<typeof PokemonsQuery>['pokemons'][number]
}

export const Pokemon = ({ pokemon }: Props) => {
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
