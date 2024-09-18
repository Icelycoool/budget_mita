import { useState, useEffect } from "react"
import axios from "axios"

const Profile = () => {
	const apiUrl = import.meta.env.VITE_API_BASE_URL
	const [userData, setUserData] = useState(null)
	const [error, setError] = useState(null)
	const [currency, setCurrency] = useState("")

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(`${apiUrl}/api/auth/user`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
				setUserData(response.data)
				setCurrency(response.data.currency || "")
			} catch (error) {
				setError("There was an error fetching the user profile!")
				console.error(error)
			}
		}

		fetchUserData()
	}, [apiUrl])

	const handleUpdateCurrency = async () => {
		try {
			await axios.put(
				`${apiUrl}/api/auth/user`,
				{ currency },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			)
			alert("Currency updated successfully!")
		} catch (error) {
			console.error(error)
			alert("Failed to update currency!")
		}
	}

	if (error) return <p>{error}</p>

	if (!userData) return <p>Loading...</p>

	return (
		<div className="p-5 bg-white rounded-lg shadow-xl">
			<h1 className="text-primary text-3xl text-center font-bold mb-3 ">Profile</h1>
			<hr className="mb-16 bg-accent" />
			<p className="mb-8 text-xl text-primary font">
				First Name: <span className="text-secondary p-x-2">{userData.first_name}</span>
			</p>
			<p className="mb-8 text-xl text-primary font">
				Last Name: <span className="text-secondary p-x-2">{userData.last_name}</span>
			</p>
			<p className="mb-8 text-xl text-primary font">
				Email: <span className="text-secondary p-x-2">{userData.email}</span>
			</p>
			<p className="mb-8 text-xl text-primary font">
				Username: <span className="text-secondary p-x-2">{userData.username}</span>
			</p>
			<p className="mb-8 text-xl text-primary font">
				Currency:
				<input
					type="text"
					className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
					value={currency}
					onChange={(e) => setCurrency(e.target.value)}
				/>
			</p>
			<button type="button" className=" bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondaryHover transition-colors mb-28" onClick={handleUpdateCurrency}>
				Update Currency
			</button>
			<div>
				<h6 className="text-xl mb-4">Want to delete your account?</h6>
				<button
					type="button"
					className=" bg-accent text-white px-4 py-2 rounded-md hover:bg-accentHover transition-colors"
					onClick={() =>
						axios
							.delete(`${apiUrl}/api/auth/user`, {
								headers: {
									Authorization: `Bearer ${localStorage.getItem("token")}`,
								},
							})
							.then(() => alert("Account deleted"), (window.location.href = "/signup"))
							.catch((err) => console.error(err))
					}>
					Delete Account
				</button>
			</div>
		</div>
	)
}

export default Profile
