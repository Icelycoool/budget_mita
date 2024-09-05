import { useState } from "react"
import OverlayImage from "../assets/overlay.png"
import background from "../assets/background.png"

const Wallet = () => {
	const [wallets, setWallets] = useState([
		{ name: "Wallet 1", balance: 20000 },
		{ name: "Wallet 1", balance: 20000 },
		{ name: "Wallet 1", balance: 20000 },
		{ name: "Wallet 1", balance: 20000 },
	])

	const colorClasses = ["bg-primary", "bg-secondary", "bg-accent", "bg-secondaryHover"]

	return (
		<div>
			{/* Add Wallet and Total Balance Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
				<div className="bg-white p-4 rounded-lg ">
					<h2 className="text-xl font-semibold mb-4 text-primary">Add Wallet</h2>
					<div className="mb-4">
						<label className="block text-md font-medium text-primary">Wallet name</label>
						<input type="text" className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
					</div>
					<div className="mb-4">
						<label className="block text-md font-medium text-primary">Initial Balance</label>
						<input type="text" className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
					</div>
					<div className="flex space-x-4">
						<button className="bg-secondary hover:bg-secondaryHover text-white px-4 py-2 rounded-md">SAVE</button>
						<button className="bg-accent hover:bg-accentHover text-white px-4 py-2 rounded-md">CANCEL</button>
					</div>
				</div>
				<div className="bg-primary text-white p-4 relative rounded-lg md:col-span-1 flex flex-col justify-center items-center">
					<img src={background} alt="Overlay" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 z-0" />
					<h2 className="text-xl font-semibold mb-2">TOTAL BALANCE</h2>
					<p className="text-sm mb-8">Your current Balance is</p>
					<p className="text-3xl font-bold">
						<span className="text-xl">KES</span> 20,000
					</p>
				</div>
			</div>

			{/* Wallet Cards Section */}
			<div>
				<h3 className="text-xl text-primary font-semibold mb-5">My Wallets</h3>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{wallets.map((wallet, index) => {
						const colorClass = colorClasses[index % colorClasses.length]
						return (
							<div key={index} className={`relative p-4 rounded-lg shadow-lg overflow-hidden  ${colorClass} text-white`}>
								<img src={OverlayImage} alt="Overlay" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-75 z-0" />
								<h4 className="text-lg font-medium mb-20">{wallet.name}</h4>
								<p className="mt-2 text-lg font-bold float-end">
									<span className="text-sm">KES</span> {wallet.balance}
								</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Wallet
