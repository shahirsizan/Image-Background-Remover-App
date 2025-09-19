import BgSlider from "../components/BgSlider";
import Header from "../components/Header";
import Steps from "../components/Steps";

const Home = () => {
	return (
		<div className="HOME min-h-[75vh] px-[5vw] md:px-[8vw] lg:px-[12vw]">
			<Header />
			<Steps />
			<BgSlider />
		</div>
	);
};

export default Home;
