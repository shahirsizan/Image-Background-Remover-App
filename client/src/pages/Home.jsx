import BgSlider from "../components/BgSlider";
import Header from "../components/Header";
import Steps from "../components/Steps";

const Home = () => {
	return (
		<div className="min-h-[75vh]">
			<Header />
			<Steps />
			<BgSlider />
		</div>
	);
};

export default Home;
