import { Navigate, createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Pokemons } from "./Pokemons";

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: "*", element: <Navigate to="/pokemons" /> },
			{ path: "/pokemons", element: <Pokemons /> },
		]
	}
])