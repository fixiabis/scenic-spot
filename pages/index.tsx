import { Fragment } from 'react';
import { Navbar } from '../components';
import { cityNames } from '../values';

function Home() {
  return <Fragment children={Navbar(cityNames)} />;
}

export default Home;
