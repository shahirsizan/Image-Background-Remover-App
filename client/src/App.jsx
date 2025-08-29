import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredits from "./pages/BuyCredits";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import SuccessPage from "./pages/SuccessPage";
import ErrorPage from "./pages/ErrorPage";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const App = () => {
	const { isSignedIn } = useUser();
	const { isLoading, loadCreditsData } = useContext(AppContext);

	useEffect(() => {
		if (isSignedIn) {
			loadCreditsData();
		}
	}, [isSignedIn]);

	if (isLoading) {
		return (
			<div className="h-screen flex items-center justify-center text-4xl font-bold">
				Loading...
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col bg-slate-50">
			<ToastContainer position="bottom-right" />
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/result" element={<Result />} />
				<Route path="/buy" element={<BuyCredits />} />
				<Route path="/success/*" element={<SuccessPage />} />
				<Route path="/error" element={<ErrorPage />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
