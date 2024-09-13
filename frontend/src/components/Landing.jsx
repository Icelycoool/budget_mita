import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaCheck, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa"
import { TbPresentationAnalytics, TbWallet, TbTransactionDollar, TbBusinessplan } from "react-icons/tb"

import logo from "../assets/logobg.svg"
import finance from "../assets/hero.jpg"
import background from "../assets/bg-effect-1.png"
import mobileView from "../assets/mobileview.png"
import myProfile from "../assets/profile.jpg"

const Landing = () => {
	const [isOpen, setIsOpen] = useState(false)
	const navigate = useNavigate()

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div>
			{/* Navbar */}
			<nav className="bg-primary shadow-md fixed top-0 left-0 right-0 z-10">
				<div className="container mx-auto flex items-center justify-between p-4">
					<div className="flex justify-items-center items-center">
						<img src={logo} className="w-10 h-10 mx-2" alt="Budgetmita logo" />
						<h1 className="text-2xl font-bold text-white uppercase">Budget Mita</h1>
					</div>
					<div className="hidden md:flex space-x-4">
						<button type="button" className="bg-accent hover:bg-accentHover text-white px-4 py-2 rounded-md" onClick={() => navigate("/login")}>
							Login
						</button>
						<button type="button" className="bg-secondary hover:bg-secondaryHover text-white px-4 py-2 rounded-md" onClick={() => navigate("/signup")}>
							Signup
						</button>
					</div>

					{/* Mobile Menu Toggle Button */}
					<button className="md:hidden flex items-center px-3 py-2 border border-white rounded text-white hover:text-gray-800 hover:border-whiteHover" onClick={toggleMenu} aria-label="Toggle menu">
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
						</svg>
					</button>

					{/* Mobile Menu */}
					<div className={`md:hidden ${isOpen ? "block" : "hidden"} absolute top-16 left-0 right-0 bg-white shadow-lg`}>
						<button
							type="button"
							className="block w-full text-left px-4 py-2 hover:bg-whiteHover bg-opacity-95"
							onClick={() => {
								navigate("/login")
								setIsOpen(false)
							}}>
							Login
						</button>
						<button
							type="button"
							className="block w-full text-left px-4 py-2 hover:bg-gray-200  hover:bg-whiteHover bg-opacity-95"
							onClick={() => {
								navigate("/signup")
								setIsOpen(false)
							}}>
							Signup
						</button>
					</div>
				</div>
			</nav>

			{/* Main Section */}
			<main className="flex flex-col  min-h-screen items-center justify-center pt-16">
				{/* Hero Section */}
				<section className="relative w-full bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${background})` }}>
					<div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 p-24 container m-auto text-center justify-center md:text-left">
						<div className="flex flex-col text-primary justify-center items-center md:items-start">
							<h1 className="text-3xl font-bold mb-4 text-secondaryHover">Welcome to</h1>
							<h1 className="text-6xl md:text-8xl font-bold mb-8">Budget Mita</h1>
							<p className="text-xl mb-8 leading-loose">
								Achieve financial freedom and make smarter decisions with our all-in-one personal finance app. Track your income, manage expenses, and set budgets effortlessly. Worry less and start
								your journey toward financial freedom today!
							</p>
							<p className="text-xl font-bold italic mb-16 text-secondary animate-fade-in-up">Your guide to financial smartness!</p>
							<button type="button" className="bg-secondary hover:bg-secondaryHover text-white px-6 py-3 rounded-md w-fit">
								Get Started
							</button>
						</div>

						<div className="flex items-center justify-center">
							<img src={finance} alt="Description of image" className="w-full h-auto  object-cover rounded-lg shadow-xl" />
						</div>
					</div>
				</section>

				{/* About Section */}
				<section className="bg-white p-16 w-full">
					<h1 className="text-3xl font-bold text-secondaryHover text-center uppercase">About Budget Mita</h1>
					<div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 p-8 container m-auto text-center md:text-left">
						<div className="flex flex-col text-primary justify-center items-center md:items-start">
							<p className="text-2xl mb-8 animate-fade-in-up leading-relaxed">
								Budget Mita is a cutting-edge Personal Finance App designed to make financial management intuitive and efficient. <br /> Our app aims to:
							</p>
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0 bg-secondary text-white p-2 rounded-full">
										<FaCheck />
									</div>
									<div className="flex flex-col text-left">
										<h2 className="text-xl font-bold text-secondary">Simplify Financial Management</h2>
										<p className="text-lg">Enjoy an easy-to-use interface for seamless tracking and management of your income, expenses, and budgets.</p>
									</div>
								</div>
								<div className="flex items-start gap-6">
									<div className="flex-shrink-0 bg-secondary text-white p-2 rounded-full">
										<FaCheck />
									</div>
									<div className="flex flex-col text-left">
										<h2 className="text-xl font-bold text-secondary">Enhance Financial Awareness</h2>
										<p className="text-lg">Gain valuable insights into your spending patterns and savings to make informed financial decisions.</p>
									</div>
								</div>
								<div className="flex items-start gap-6">
									<div className="flex-shrink-0 bg-secondary text-white p-2 rounded-full">
										<FaCheck />
									</div>
									<div className="flex flex-col text-left">
										<h2 className="text-xl font-bold text-secondary">Facilitate Better Budgeting</h2>
										<p className="text-lg">Effortlessly set, monitor, and adjust your budgets to achieve your financial goals.</p>
									</div>
								</div>
								<div className="flex items-start gap-6">
									<div className="flex-shrink-0 bg-secondary text-white p-2 rounded-full">
										<FaCheck />
									</div>
									<div className="flex flex-col text-left">
										<h2 className="text-xl font-bold text-secondary">Promote Financial Discipline</h2>
										<p className="text-lg">Stay on top of your finances with regular tracking and adherence to your budget.</p>
									</div>
								</div>
							</div>
						</div>

						<div className="flex items-center justify-center">
							<img src={mobileView} alt="Description of image" className="w-full h-auto object-cover rounded-lg" />
						</div>
					</div>
				</section>

				{/* Features */}
				<section className="relative p-10 w-full bg-white">
					<h1 className="text-3xl font-bold text-center text-secondaryHover uppercase mb-8">Features</h1>
					<div className="relative grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-16 p-8 container m-auto text-center md:text-left">
						<div className="bg-whiteHover shadow-lg p-6 rounded-lg hover:bg-secondary hover:text-white transition duration-300">
							<div className="flex items-center justify-center md:justify-start mb-4">
								<span className="text-3xl text-secondaryHover">
									<TbWallet />
								</span>
								<h1 className="ml-2 text-2xl font-bold uppercase">Wallets</h1>
							</div>
							<p className="leading-relaxed">Use our wallets feature to allocate finances for different use cases such as Savings, Travelling e.t.c.</p>
						</div>

						<div className="bg-whiteHover shadow-lg p-6 rounded-lg hover:bg-secondary hover:text-white transition duration-300">
							<div className="flex items-center justify-center md:justify-start mb-4">
								<span className="text-3xl text-secondaryHover">
									<TbTransactionDollar />
								</span>
								<h1 className="ml-2 text-2xl font-bold uppercase leading-relaxed">Transactions</h1>
							</div>
							<p className="leading-relaxed">Effortlessly monitor your income and expenses to better manage your finances.</p>
						</div>

						<div className="bg-whiteHover shadow-lg p-6 rounded-lg hover:bg-secondary hover:text-white transition duration-300">
							<div className="flex items-center justify-center md:justify-start mb-4">
								<span className="text-3xl text-secondaryHover">
									<TbBusinessplan />
								</span>
								<h1 className="ml-2 text-2xl font-bold uppercase">Budgeting</h1>
							</div>
							<p className="leading-relaxed">Plan out your budgets whether monthly or yearly, cut out unnecessary expenses and regain control over your finances.</p>
						</div>

						<div className="bg-whiteHover shadow-lg p-6 rounded-lg hover:bg-secondary hover:text-white transition duration-300">
							<div className="flex items-center justify-center md:justify-start mb-4">
								<span className="text-3xl text-secondaryHover">
									<TbPresentationAnalytics />
								</span>
								<h1 className="ml-2 text-2xl font-bold uppercase">Insights</h1>
							</div>
							<p className="leading-relaxed">Gain insights into your financial habits, reduce your spending and save mover. Our goal is to help you make informed financial choices!</p>
						</div>
					</div>
				</section>

				{/* Timeline Section */}
				<section className="relative p-10 bg-secondary w-full">
					<h1 className="text-3xl font-bold text-center text-white uppercase mb-8">Timeline</h1>
					<div className="relative max-w-5xl mx-auto">
						<div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 bg-white w-1"></div>
						<div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-4 h-4 "></div>
						<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-4 h-4 "></div>

						<div className="flex items-center mb-8">
							<div className="w-1/2 pr-4">
								<div className="bg-white p-4 rounded-lg shadow-md">
									<p>In this period, I did research on the project concept. In three weeks the following were delivered:</p>
									<ul className="list-decimal px-4">
										<li>Project Proposal.</li>
										<li>MVP specification.</li>
										<li>Trello borad.</li>
									</ul>
								</div>
							</div>
							<div className="w-1/2 p-2 text-white">
								<h2 className="text-xl font-semibold p-1">Research & Approval</h2>
								<span className="block text-gray-500 p-1">AUG 2- AUG 23, 2024</span>
							</div>
						</div>

						<div className="flex items-center mb-8">
							<div className="w-1/2 pr-4">
								<div className="bg-white p-4 rounded-lg shadow-md">
									<p>The actual building of the MVP. In two weeks I:</p>
									<ul className="list-decimal px-4">
										<li>Started the project.</li>
										<li>Built all the MVP specification.</li>
										<li>Manual tested all the endpoints.</li>
										<li>Learnt react.</li>
										<li>Integrated the backend with the frontend.</li>
									</ul>
								</div>
							</div>
							<div className="w-1/2 p-2 text-whiteHover">
								<h2 className="text-xl font-semibold p-1">Building the MVP</h2>
								<span className="block text-gray-500 p-1">AUG 23- SEP 06, 2024</span>
							</div>
						</div>

						<div className="flex items-center mb-8">
							<div className="w-1/2 pr-4">
								<div className="bg-white p-4 rounded-lg shadow-md">
									<p>Created a landing page for the project.</p>
								</div>
							</div>
							<div className="w-1/2 p-2 text-white">
								<h2 className="text-xl font-semibold p-1">Project Landing Page</h2>
								<span className="block text-gray-500 p-1">Sep 06 - Sep 13, 2024</span>
							</div>
						</div>

						<div className="flex items-center mb-8">
							<div className="w-1/2 pr-4">
								<div className="bg-white p-4 rounded-lg shadow-md">
									<p>Finally I deployed the project and booked a review by a senior mentor.</p>
								</div>
							</div>
							<div className="w-1/2 p-2 text-white">
								<h2 className="text-xl font-semibold p-1">Project Deployment & Review.</h2>
								<span className="block text-gray-500 p-1">Sep 14 - Sep 16, 2024</span>
							</div>
						</div>

						<div className="flex items-center mb-8">
							<div className="w-1/2 pr-4">
								<div className="bg-white p-4 rounded-lg shadow-md">
									<p>Clean up my codebase and write a blogpost on my experience building the project.</p>
								</div>
							</div>
							<div className="w-1/2 p-2 text-white">
								<h2 className="text-xl font-semibold p-1">Blogpost & Cleanup.</h2>
								<span className="block text-gray-500 p-1">Sep 16 - Sep 19, 2024</span>
							</div>
						</div>

						<div className="flex items-center mb-8">
							<div className="w-1/2 pr-4">
								<div className="bg-white p-4 rounded-lg shadow-md">
									<p>
										Add some advanced features such as data analytics to help the user monitor their spending habits and give the user recommendations based on the analytics. Add basic financial
										litracy hub.
									</p>
								</div>
							</div>
							<div className="w-1/2 p-2 text-white">
								<h2 className="text-xl font-semibold p-1">Project Improvement.</h2>
								<span className="block text-gray-500 p-1">Ongoing....</span>
							</div>
						</div>
					</div>
				</section>

				{/* About Me */}
				<section className="relative p-10 w-full bg-white">
					<h1 className="text-3xl font-bold text-center text-secondaryHover uppercase mb-8">About Me</h1>
					<div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 p-8 container m-auto text-center md:text-left">
						<div className="flex justify-center">
							<img src={myProfile} alt="Profile Picture" className="rounded-full w-80 h-80 border-2 border-secondaryHover object-cover shadow-lg" />
						</div>

						<div className="flex flex-col justify-center items-center md:items-start">
							<h1 className="text-xl font-bold text-accent mb-4">Hello, I&apos;m</h1>
							<h1 className="text-3xl font-bold text-primary mb-4">Mohamed Ali</h1>
							<p className="text-lg text-gray-700 mb-4">
								An aspiring software engineer that lives in Nairobi, Kenya. I am a student at ALX. If you have any feedback on this project or you want to work with me, feel free to get in touch on my
								socials below.
							</p>

							<div className="flex space-x-4 text-2xl">
								<a href="http://linkedin.com/in/mohamedali350" target="_blank" rel="noopener noreferrer" className="text-secondaryHover hover:text-primary transition">
									<FaLinkedinIn />
								</a>
								<a href="https://github.com/Icelycoool" target="_blank" rel="noopener noreferrer" className="text-secondaryHover hover:text-primary transition">
									<FaGithub />
								</a>
								<a href="https://x.com/mohamedcali350" target="_blank" rel="noopener noreferrer" className="text-secondaryHover hover:text-primary transition">
									<FaTwitter />
								</a>
							</div>
						</div>
					</div>
				</section>
			</main>
			{/* Footer */}
			<section>
				<footer className="bg-primary test-center text-white w-full p-4 text-center">
					<p>&copy; {new Date().getFullYear()} Budget Mita. All rights reserved.</p>
				</footer>
			</section>
		</div>
	)
}

export default Landing
