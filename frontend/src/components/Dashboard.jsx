import { useState, useEffect } from "react"
import { FaWallet, FaMoneyBillWave, FaMoneyCheckAlt, FaBullseye, FaSignOutAlt, FaUser } from "react-icons/fa"
import logo from "../assets/logo-white-01.svg"
import Wallet from "../components/Wallet"
import Income from "../components/Income"
import Expense from "../components/Expenses"
import Budget from "../components/Budget"
import Profile from "../components/Profile"
import axios from "axios"

const Dashboard = () => {
	const [activeComponent, setActiveComponent] = useState("Wallet")
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [username, setUsername] = useState("")
	const [showProfile, setShowProfile] = useState(false)

	useEffect(() => {
		const storedUsername = localStorage.getItem("username")
		if (storedUsername) {
			setUsername(storedUsername)
		}
	}, [])

	const handleComponentChange = (component) => {
		setActiveComponent(component)
		setShowProfile(false)
	}

	const renderComponent = () => {
		if (showProfile) {
			return <Profile />
		}
		switch (activeComponent) {
			case "Profile":
				return <Profile />
			case "Wallet":
				return <Wallet />
			case "Income":
				return <Income />
			case "Expense":
				return <Expense />
			case "Budget":
				return <Budget />
			default:
				return <Wallet />
		}
	}

	const handleLogout = () => {
		axios
			.post("/api/auth/logout", {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
			.then(() => {
				localStorage.removeItem("access_token")
				localStorage.removeItem("refresh_token")
				localStorage.removeItem("username")
				window.location.href = "/login"
			})
			.catch((error) => {
				console.error("There was an error logging out!", error)
			})
	}

	return (
		<div className="min-h-screen flex">
			{/* Sidebar */}
			<div
				className={`text-center min-h-screen text-white w-1/9 bg-primary p-5 flex flex-col md:justify-between fixed md:relative transform ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 transition-transform duration-300 ease-in-out z-20`}>
				<div>
					<div className="w-10 h-10 mx-auto mb-20 ">
						<img src={logo} alt="Budget Mita logo" />
					</div>
					<div className="text-2xl font-bold uppercase mb-10">Menu</div>
					<nav className="space-y-6">
						<button onClick={() => handleComponentChange("Wallet")} className="flex items-center justify-center text-xl space-x-2 px-10 hover:text-secondary transition-colors">
							<FaWallet />
							<span>Wallet</span>
						</button>
						<button onClick={() => handleComponentChange("Income")} className="flex items-center justify-center text-xl space-x-2 px-10 hover:text-secondary transition-colors">
							<FaMoneyBillWave />
							<span>Income</span>
						</button>
						<button onClick={() => handleComponentChange("Expense")} className="flex items-center text-xl justify-center space-x-2 px-10 hover:text-secondary transition-colors">
							<FaMoneyCheckAlt />
							<span>Expense</span>
						</button>
						<button onClick={() => handleComponentChange("Budget")} className="flex items-center justify-center text-xl space-x-2 px-10 hover:text-secondary transition-colors">
							<FaBullseye />
							<span>Budget</span>
						</button>
					</nav>
				</div>

				<div className="py-4">
					<button onClick={handleLogout} className="flex items-center space-x-2 text-xl px-10 hover:text-secondary transition-colors">
						<FaSignOutAlt />
						<span>Log Out</span>
					</button>
				</div>
			</div>
			<div className={`fixed inset-0 z-10 md:hidden ${sidebarOpen ? "block" : "hidden"}`} onClick={() => setSidebarOpen(false)}></div>
			{/* Content Area */}
			<div className="w-full md:w-8/9 ml-auto">
				<div>
					<header className="flex items-center justify-between mb-4 px-16 p-4 bg-secondary text-white shadow-md z-30">
						<button className="text-white hover:text-black md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
							<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
							</svg>
						</button>
						<div className="flex items-center space-x-4">
							<div className="text-lg text-white font-bold">Welcome Back {username}</div>
						</div>
						<button className="text-gray-600 hover:text-black" onClick={() => setShowProfile((prev) => !prev)}>
							<div className="flex items-center justify-center bg-primary rounded-full w-12 h-12">
								<FaUser className="text-white w-8 h-8" />
							</div>
						</button>
					</header>
				</div>
				<div className="p-16">{renderComponent()}</div>
				<footer className="bg-white text-primary fixed w-full bottom-0 right-0 py-4">
					<div className="container mx-auto text-center">
						<p className="text-sm">&copy; {new Date().getFullYear()} Budget Mita. All rights reserved.</p>
					</div>
				</footer>
			</div>
		</div>
	)
}

export default Dashboard
