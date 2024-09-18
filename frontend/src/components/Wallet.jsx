import { useState, useEffect } from "react"
import axios from "axios"
import background from "../assets/background.png"
import OverlayImage from "../assets/overlay.png"
import { FaEdit, FaTimes } from "react-icons/fa"

const Wallet = () => {
	const apiUrl = import.meta.env.VITE_API_BASE_URL
	const [wallets, setWallets] = useState([])
	const [newWallet, setNewWallet] = useState({ name: "", balance: "" })
	const [errors, setErrors] = useState({ name: "", balance: "" })
	const [editingWallet, setEditingWallet] = useState(null)

	useEffect(() => {
		const fetchWallets = async () => {
			try {
				const response = await axios.get(`${apiUrl}/api/wallets/`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
				setWallets(response.data)
			} catch (error) {
				console.error("Error fetching wallets:", error)
			}
		}

		fetchWallets()
	}, [apiUrl])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setNewWallet({ ...newWallet, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		let hasErrors = false
		const newErrors = { name: "", balance: "" }

		if (!newWallet.name) {
			newErrors.name = "Wallet name is required"
			hasErrors = true
		}

		if (!newWallet.balance || isNaN(newWallet.balance)) {
			newErrors.balance = "Valid balance is required"
			hasErrors = true
		}

		setErrors(newErrors)

		if (hasErrors) return

		try {
			if (editingWallet) {
				const response = await axios.put(`${apiUrl}/api/wallets/${editingWallet.id}`, newWallet, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})

				setWallets((prevWallets) => prevWallets.map((wallet) => (wallet.id === response.data.id ? response.data : wallet)))
				setNewWallet({ name: "", balance: "" })
				setEditingWallet(null)
			} else {
				const response = await axios.post(`${apiUrl}/api/wallets/`, newWallet, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})

				setWallets((prevWallets) => [...prevWallets, response.data])
				setNewWallet({ name: "", balance: "" })
			}
		} catch (error) {
			console.error("Error handling wallet:", error)
		}
	}

	const handleEdit = (wallet) => {
		setNewWallet({ name: wallet.name, balance: wallet.balance })
		setEditingWallet(wallet)
	}

	const handleDelete = async (walletId) => {
		try {
			await axios.delete(`${apiUrl}/api/wallets/${walletId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})

			setWallets((prevWallets) => prevWallets.filter((wallet) => wallet.id !== walletId))
		} catch (error) {
			console.error("Error deleting wallet:", error)
		}
	}

	const colorClasses = ["bg-primary", "bg-secondary", "bg-accent", "bg-secondaryHover"]

	return (
		<div>
			{/* wallets form and total balance section */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
				<div className="bg-white p-4 rounded-lg">
					<h2 className="text-xl font-semibold mb-4 text-primary">{editingWallet ? "Edit Wallet" : "Add Wallet"}</h2>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-md font-medium text-primary">Wallet name</label>
							<input
								type="text"
								name="name"
								value={newWallet.name}
								onChange={handleInputChange}
								className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
							{errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
						</div>
						<div className="mb-4">
							<label className="block text-md font-medium text-primary">Initial Balance</label>
							<input
								type="number"
								name="balance"
								value={newWallet.balance}
								onChange={handleInputChange}
								className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
							{errors.balance && <p className="text-red-500 text-sm">{errors.balance}</p>}
						</div>
						<div className="flex space-x-4">
							<button type="submit" className="bg-secondary hover:bg-secondaryHover text-white px-4 py-2 rounded-md">
								{editingWallet ? "UPDATE" : "SAVE"}
							</button>
							<button
								type="button"
								className="bg-accent hover:bg-accentHover text-white px-4 py-2 rounded-md"
								onClick={() => {
									setNewWallet({ name: "", balance: "" })
									setEditingWallet(null)
								}}>
								CANCEL
							</button>
						</div>
					</form>
				</div>
				<div className="bg-primary text-white p-4 relative rounded-lg md:col-span-1 flex flex-col justify-center items-center">
					<img src={background} alt="Overlay" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 z-0" />
					<h2 className="text-xl font-semibold mb-2">TOTAL BALANCE</h2>
					<p className="text-sm mb-8">Your current Balance is</p>
					<p className="text-3xl font-bold">
						<span className="text-xl">KES</span> {wallets.reduce((total, wallet) => total + wallet.balance, 0).toLocaleString()}
					</p>
				</div>
			</div>

			{/* Wallets display Section */}
			<div>
				<h3 className="text-xl text-primary font-semibold mb-5">My Wallets</h3>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{wallets.map((wallet, index) => {
						const colorClass = colorClasses[index % colorClasses.length]
						return (
							<div key={wallet.id} className={`relative p-4 rounded-lg shadow-lg overflow-hidden ${colorClass} text-white`}>
								<img src={OverlayImage} alt="Overlay" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-75 z-0" />
								<h4 className="text-lg font-medium mb-20">{wallet.name}</h4>

								<div className="relative z-10 flex justify-between">
									<p className="text-lg font-bold">
										<span className="text-sm">KES</span> {wallet.balance.toLocaleString()}
									</p>
									<div>
										<button type="button" className="bg-white hover:bg-whiteHover text-primary px-2 py-2 rounded-full mx-1" onClick={() => handleEdit(wallet)}>
											<FaEdit />
										</button>
										<button type="button" className="bg-white hover:bg-whiteHover text-primary px-2 py-2 rounded-full mx-1" onClick={() => handleDelete(wallet.id)}>
											<FaTimes />
										</button>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Wallet
