import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import logo from "../assets/logo.svg"
import finance from "../assets/finance.webp"

const Login = () => {
	const navigate = useNavigate()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleLogin = async (e) => {
		e.preventDefault()

		setError("")

		if (!username || !password) {
			setError("Both fields are required!")
			return
		}

		try {
			setLoading(true)
			const response = await axios.post("/api/auth/login", { username, password })
			const { access_token, username: user } = response.data
			localStorage.setItem("token", access_token)
			localStorage.setItem("username", user)

			navigate("/dashboard")
		} catch (err) {
			if (err.response) {
				setError(err.response.data.message || "Login failed!")
			} else {
				setError("Something went wrong!!")
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden w-4/5 max-w-4xl">
				{/* Left Side - Form */}
				<div className="w-full md:w-1/2 p-8">
					<div className="text-center mb-6">
						<div className="w-8 h-8 rounded-full mx-auto mb-10">
							<img src={logo} alt="Budget Mita logo" />
						</div>
						<div className="text-primary text-2xl font-bold mb-2">SIGN IN</div>
					</div>

					{error && <div className="text-secondary text-center mb-4">{error}</div>}

					<form onSubmit={handleLogin}>
						<div className="mb-4">
							<input
								type="text"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div className="mb-6">
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<div className="text-center mb-4">
							<button className="text-primary font-bold hover:underline">Forgot password?</button>
						</div>
						<div className="mb-4">
							<button type="submit" className="w-full bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondaryHover transition-colors" disabled={loading}>
								{loading ? "Signing in..." : "SIGN IN"}
							</button>
						</div>
					</form>

					<div className="text-center">
						<p className="text-primary">Don&apos;t have an account?</p>
						<button className="text-secondary font-bold hover:underline" onClick={() => navigate("/signup")}>
							SIGN UP
						</button>
					</div>
					<div className="text-center pt-10">Budget Mita &copy;{new Date().getFullYear()}</div>
				</div>

				{/* Right Side - Image */}
				<div className="hidden md:block md:w-1/2">
					<div className="relative w-full h-full nd:w-1/2">
						<img src={finance} alt="An image showing finance management" className="object-cover w-full h-full" />
						<div className="absolute inset-0 bg-primary bg-blend-color-dodge opacity-60" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
