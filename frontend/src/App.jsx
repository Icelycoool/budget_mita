import { useState, useEffect } from "react"

const App = () => {
	const [message, setMessage] = useState("")

	useEffect(() => {
		fetch("/welcome")
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				setMessage(data.message) // Update the state with the fetched message
			})
	}, []) // Empty dependency array ensures this effect runs once on mount

	return (
		<div>
			<h1 className="text-3xl font-bold underline">{message}</h1>
		</div>
	)
}

export default App
