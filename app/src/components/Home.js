import React from 'react';
import artCover from '../images/art-cover.jpg';
import Navbar from './Navbar';

export default function Home() {
	return (
		<div>
	        <Navbar />
	        <img src={artCover} style={{width: '100%', height: '700px'}} alt='artistic design'/>
      	</div>
	)
}