import { useSearchParams } from 'react-router-dom'

export const Boxes = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	return (
		<button
			onClick={() => {
				setSearchParams(`id=${(Number(searchParams.get('id')) ?? 0) + 1}`)
			}}
		>
			Next
		</button>
	)
}
