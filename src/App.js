// components
import Header from 'components/Header';
// commented out for now - uncomemnt to add back in to the project.
import MobileHeader from 'components/MobileHeader';
import Hero from 'components/Hero';
import Articles from 'components/Articles';
import FiftyFifty from 'components/FiftyFifty';
import Footer from 'components/Footer'

// data
import { headerData, heroData, articlesData, bodyData, footerData } from './data'

// styles
import 'styles/global/global.scss';

function App() {
	// normal header - 
	// <Header links={ headerData.links } />

	// header with hamburger ux - 
	// <MobileHeader links={ headerData.links } />
	return (
		<div className="app">
			<MobileHeader links={ headerData.links } />
			<Hero data={ heroData } />
			<Articles articles={ articlesData.articles } />
			<FiftyFifty data={ bodyData.fiftyFifty } />
			<Footer data={ footerData } />
		</div>
	);
}

export default App;
