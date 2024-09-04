import logo from "../assets/logo.svg"
import finance from "../assets/finance.webp"
const Signup = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden w-4/5 max-w-4xl">
				{/* Left Side */}
				<div className="hidden md:block md:w-1/2">
					<div className="relative w-full h-full nd:w-1/2">
						<img src={finance} alt="Am image showing finance management" className="object-cover w-full h-full" />
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
					<form>
						<div className="flex gap-4 mb-4">
							<input type="text" placeholder="First Name" className="w-1/2 px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
							<input type="text" placeholder="Last Name" className="w-1/2 px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
						</div>
						<div className="mb-4">
							<input type="email" placeholder="Email" className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
						</div>
						<div className="mb-4">
							<input type="text" placeholder="Username" className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
						</div>
						<div className="mb-4">
							<input type="password" placeholder="Password" className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
						</div>
						<div className="mb-6">
							<input type="password" placeholder="Confirm Password" className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
						</div>
						<div className="mb-4">
							<button type="submit" className="w-full bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondaryHover transition-colors">
								SIGN UP
							</button>
						</div>
					</form>
					<div className="text-center">
						<p className="text-primary">Have an account?</p>
						<button className="text-secondary font-bold hover:underline">LOG IN</button>
					</div>
					<div className="text-center pt-10">Budget Mita &copy;2024</div>
				</div>
			</div>
		</div>
	)
}

export default Signup
