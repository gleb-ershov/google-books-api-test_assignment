import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { DetailsPage, ErrorPage, HomePage, NotFoundPage } from "../pages";
import Layout from "src/pages/layouts/Layout";

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/:id",
				element: <DetailsPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
]);

const AppRouter = () => {
	return <RouterProvider router={router} />;
};

export default AppRouter;
