import { useState } from "react"
import { FaWallet, FaMoneyBillWave, FaMoneyCheckAlt, FaBullseye, FaSignOutAlt, FaUser } from "react-icons/fa"
import { AiFillDashboard } from "react-icons/ai"
import logo from "../assets/logo-white-01.svg"
import Wallet from "../components/Wallet"

const Dashboard = () => {
	const [activeComponent, setActiveComponent] = useState("Wallet")
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const renderComponent = () => {
		switch (activeComponent) {
			case "Dashboard":
				return <Summary />
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

	return (
		<div className="min-h-screen flex">
			{/* Sidebar */}
			<div
				className={`text-center min-h-screen  text-white w-1/10 bg-primary p-5 flex flex-col md:justify-between fixed md:relative transform ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0 transition-transform duration-300 ease-in-out z-20`}>
				<div>
					<div className="w-10 h-10 mx-auto mb-20">
						<img src={logo} alt="Budget Mita logo" />
					</div>
					<div className="text-2xl font-bold uppercase mb-10">Menu</div>
					<nav className="space-y-6">
						<button onClick={() => setActiveComponent("Dashboard")} className="flex items-center justify-center text-xl space-x-2 px-10 hover:text-secondary transition-colors">
							<AiFillDashboard />
							<span>Dashboard</span>
						</button>
						<button onClick={() => setActiveComponent("Wallet")} className="flex items-center justify-center text-xl space-x-2 px-10 hover:text-secondary transition-colors">
							<FaWallet />
							<span>Wallet</span>
						</button>
						<button onClick={() => setActiveComponent("Income")} className="flex items-center justify-center text-xl space-x-2 px-10 hover:text-secondary transition-colors">
							<FaMoneyBillWave />
							<span>Income</span>
						</button>
						<button onClick={() => setActiveComponent("Expense")} className="flex items-center text-xl justify-center space-x-2 px-10 hover:text-secondary transition-colors">
							<FaMoneyCheckAlt />
							<span>Expense</span>
						</button>
						<button onClick={() => setActiveComponent("Budget")} className="flex items-center justify-center text-xl space-x-2 px-10 hover:text-secondary transition-colors">
							<FaBullseye />
							<span>Budget</span>
						</button>
					</nav>
				</div>

				<div className="py-4">
					<button className="flex items-center space-x-2 text-xl px-10 hover:text-secondary transition-colors">
						<FaSignOutAlt />
						<span>Log Out</span>
					</button>
				</div>
			</div>

			{/* Overlay */}
			<div className={`fixed inset-0 z-10 md:hidden ${sidebarOpen ? "block" : "hidden"}`} onClick={() => setSidebarOpen(false)}></div>

			{/* Content Area */}
			<div className="w-full md:w-9/10 ml-auto">
				<div className="bg-secondary">
					<header className="flex items-center justify-between mb-4 px-10 p-4">
						<button className="text-white hover:text-black md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
							<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
							</svg>
						</button>
						<div className="flex items-center space-x-4">
							<div className="text-lg text-white font-bold">Welcome Back Mohamed</div>
						</div>
						<button className="text-gray-600 hover:text-black">
							<div className="flex items-center justify-center bg-primary rounded-full w-12 h-12">
								<FaUser className="text-white w-8 h-8" />
							</div>
						</button>
					</header>
				</div>
				<div className="p-5">{renderComponent()}</div>
			</div>
		</div>
	)
}

const Summary = () => <div>Summary Component</div>
const Income = () => <div>Income Component</div>
const Expense = () => <div>Expense Component</div>
const Budget = () => <div>Budget Component</div>

export default Dashboard
