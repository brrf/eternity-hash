import React, {useEffect, useState, useRef} from 'react';

export default function TestComponent () {
	const [timer, setTimer] = useState(0);
	const interval = useRef(null)

	useEffect( () => {
		interval.current = setInterval( () => {
			setTimer(prevTimer => prevTimer + 1)
		}, 1000)
		return () => {
			clearInterval(interval.current)
		}
	}, [])
	return (
		<div>
			{timer}
			<button onClick={() => {
				console.log({interval: interval.current})
				clearInterval(interval.current)
			}}>Clear</button>
		</div>
	)
}