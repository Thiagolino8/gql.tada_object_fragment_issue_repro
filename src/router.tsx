import { Navigate, createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Boxes } from "./Boxes";
import { Pokemons } from "./Pokemons";

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: "*", element: <Navigate to="/boxes" /> },
			{ path: "/boxes", element: <Boxes /> },
			{ path: "/pokemon", element: <Pokemons /> },
		]
	}
])