import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import logo from "../assets/logo.svg"
import finance from "../assets/finance.webp"
import background from "../assets/bg-effect-1.png"

const PasswordReset = () => {
	const apiUrl = import.meta.env.VITE_API_BASE_URL
	const navigate = useNavigate()
	const { token } = useParams()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [isRequest, setIsRequest] = useState(!token)

	useEffect(() => {
		if (token) {
			setIsRequest(false)
		}
	}, [token])

	const handlePasswordReset = async (e) => {
		e.preventDefault()
		setError("")

		if (isRequest) {
			if (!email) {
				setError("Email is required!")
				return
			}

			try {
				setLoading(true)
				await axios.post(`${apiUrl}/api/auth/reset-password`, { email })
				navigate("/login")
			} catch (err) {
				if (err.response) {
					setError(err.response.data.message || "Password reset request failed!")
				} else {
					setError("Something went wrong!")
				}
			} finally {
				setLoading(false)
			}
		} else {
			if (!password || !confirmPassword) {
				setError("Both password fields are required!")
				return
			}

			if (password !== confirmPassword) {
				setError("Passwords do not match!")
				return
			}

			try {
				setLoading(true)
				await axios.post(`${apiUrl}/api/auth/reset-password/${token}`, { password })
				navigate("/login")
			} catch (err) {
				if (err.response) {
					setError(err.response.data.message || "Password reset failed!")
				} else {
					setError("Something went wrong!")
				}
			} finally {
				setLoading(false)
			}
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
			<div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden w-4/5 max-w-4xl">
				{/* Left Side - Form */}
				<div className="w-full md:w-1/2 p-8">
					<div className="text-center mb-6">
						<div className="w-8 h-8 rounded-full mx-auto mb-10">
							<img src={logo} alt="Budget Mita logo" />
						</div>
						<div className="text-primary text-2xl font-bold mb-2">{isRequest ? "RESET PASSWORD" : "NEW PASSWORD"}</div>
					</div>

					{error && <div className="text-secondary text-center mb-4">{error}</div>}

					<form onSubmit={handlePasswordReset}>
						{isRequest ? (
							<div className="mb-4">
								<input
									type="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>
						) : (
							<>
								<div className="mb-4">
									<input
										type="password"
										placeholder="New Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
									/>
								</div>
								<div className="mb-4">
									<input
										type="password"
										placeholder="Confirm Password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
									/>
								</div>
							</>
						)}
						<div className="mb-4">
							<button type="submit" className="w-full bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondaryHover transition-colors" disabled={loading}>
								{loading ? (isRequest ? "Sending..." : "Resetting...") : isRequest ? "Send Link" : "Reset Password"}
							</button>
						</div>
					</form>

					<div className="text-center">
						{isRequest ? <p className="text-primary">Remember your password?</p> : <p className="text-primary">Back to login?</p>}
						<button className="text-secondary font-bold hover:underline" onClick={() => navigate("/login")}>
							LOG IN
						</button>
					</div>
					<div className="text-center pt-10">Budget Mita &copy;{new Date().getFullYear()}</div>
				</div>

				{/* Right Side - Image */}
				<div className="hidden md:block md:w-1/2">
					<div className="relative w-full h-full">
						<img src={finance} alt="Background image" className="object-cover w-full h-full" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PasswordReset
