import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import logo from "../assets/logo.svg"
import finance from "../assets/finance.webp"
import background from "../assets/bg-effect-1.png"

const Signup = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	})

	const [errors, setErrors] = useState({})

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const validateForm = () => {
		const newErrors = {}
		if (!formData.firstName) newErrors.firstName = "First Name is required!"
		if (!formData.lastName) newErrors.lastName = "Last Name is required!"
		if (!formData.username) newErrors.username = "Username is required!"
		if (!formData.email) newErrors.email = "Email is required!"
		if (!formData.password) newErrors.password = "Password is required!"
		if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match!"

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!validateForm()) return

		try {
			const response = await axios.post("/api/auth/signup", {
				first_name: formData.firstName,
				last_name: formData.lastName,
				username: formData.username,
				email: formData.email,
				password: formData.password,
				confirmation: formData.confirmPassword,
			})

			if (response.status === 201) {
				navigate("/login")
			}
		} catch (error) {
			setErrors({ submit: error.response.data.message })
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
			<div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden w-4/5 max-w-4xl">
				{/* Left Side - Image */}
				<div className="hidden md:block md:w-1/2">
					<div className="relative w-full h-full nd:w-1/2">
						<img src={finance} alt="Finance management" className="object-cover w-full h-full" />
						<div className="absolute inset-0 bg-primary bg-blend-color-dodge opacity-60" />
					</div>
				</div>

				{/* Right Side - Form */}
				<div className="w-full md:w-1/2 p-8">
					<div className="text-center mb-6">
						<div className="w-8 h-8 mx-auto mb-10">
							<img src={logo} alt="Budget Mita logo" />
						</div>
						<div className="text-primary text-2xl font-bold mb-2">SIGN UP</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="flex gap-4 mb-4">
							<input
								type="text"
								name="firstName"
								placeholder="First Name"
								value={formData.firstName}
								onChange={handleInputChange}
								className="w-1/2 px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
							<input
								type="text"
								name="lastName"
								placeholder="Last Name"
								value={formData.lastName}
								onChange={handleInputChange}
								className="w-1/2 px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						{errors.firstName && <p className="text-secondary">{errors.firstName}</p>}
						{errors.lastName && <p className="text-secondary">{errors.lastName}</p>}
						<div className="mb-4">
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={formData.email}
								onChange={handleInputChange}
								className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						{errors.email && <p className="text-secondary">{errors.email}</p>}
						<div className="mb-4">
							<input
								type="text"
								name="username"
								placeholder="Username"
								value={formData.username}
								onChange={handleInputChange}
								className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						{errors.username && <p className="text-secondary">{errors.username}</p>}
						<div className="mb-4">
							<input
								type="password"
								name="password"
								placeholder="Password"
								value={formData.password}
								onChange={handleInputChange}
								className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						{errors.password && <p className="text-secondary">{errors.password}</p>}
						<div className="mb-4">
							<input
								type="password"
								name="confirmPassword"
								placeholder="Confirm Password"
								value={formData.confirmPassword}
								onChange={handleInputChange}
								className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						{errors.confirmPassword && <p className="text-secondary">{errors.confirmPassword}</p>}
						{errors.submit && <p className="text-secondary">{errors.submit}</p>}
						<div className="mb-4">
							<button type="submit" className="w-full bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondaryHover transition-colors">
								SIGN UP
							</button>
						</div>
					</form>
					<div className="text-center">
						<p className="text-primary">Have an account?</p>
						<button type="button" className="text-secondary font-bold hover:underline" onClick={() => navigate("/login")}>
							LOG IN
						</button>
					</div>
					<div className="text-center pt-10">Budget Mita &copy;{new Date().getFullYear()}</div>
				</div>
			</div>
		</div>
	)
}

export default Signup
