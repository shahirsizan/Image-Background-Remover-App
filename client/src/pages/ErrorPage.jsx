import Error from "../components/Error";

const ErrorPage = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<section className="flex-grow">
				<Error />
			</section>
		</div>
	);
};

export default ErrorPage;
