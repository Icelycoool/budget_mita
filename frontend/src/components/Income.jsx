import { useState, useEffect } from "react"
import axios from "axios"

const Income = () => {
	const [wallets, setWallets] = useState([])
	const [selectedWallet, setSelectedWallet] = useState("")
	const [amount, setAmount] = useState("")
	const [category, setCategory] = useState("")
	const [dateReceived, setDateReceived] = useState("")
	const [history, setHistory] = useState([])
	const [editingIncomeId, setEditingIncomeId] = useState(null)

	useEffect(() => {
		const fetchWallets = async () => {
			try {
				const response = await axios.get("/api/wallets/", {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
				setWallets(response.data)
			} catch (error) {
				console.error("Error fetching wallets", error)
			}
		}

		const fetchIncomes = async () => {
			try {
				const response = await axios.get("/api/income/", {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
				setHistory(response.data)
			} catch (error) {
				console.error("Error fetching incomes", error)
			}
		}

		fetchWallets()
		fetchIncomes()
	}, [])

	const handleAddOrUpdateIncome = async () => {
		try {
			const newIncome = {
				wallet_id: selectedWallet,
				amount: parseFloat(amount),
				category,
				date_received: dateReceived,
			}

			if (editingIncomeId) {
				await axios.put(`/api/income/${editingIncomeId}`, newIncome, {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
				alert("Income updated successfully")
				setEditingIncomeId(null)
			} else {
				// Add income
				await axios.post("/api/income/", newIncome, {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
				alert("Income added successfully")
			}
		} catch (error) {
			console.error("Error adding/updating income", error)
		}
	}

	const handleDeleteIncome = async (id) => {
		try {
			await axios.delete(`/api/income/${id}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			setHistory(history.filter((income) => income.id !== id))
		} catch (error) {
			console.error("Error deleting income", error)
		}
	}

	const handleEditIncome = (income) => {
		setSelectedWallet(income.wallet_id)
		setAmount(income.amount)
		setCategory(income.category)
		setDateReceived(income.date_received)
		setEditingIncomeId(income.id)
	}

	return (
		<div>
			{/* Income Addition / Updating Form */}
			<div className="bg-white p-4 rounded-lg mb-6">
				<h2 className="text-xl text-primary font-semibold mb-4">{editingIncomeId ? "Edit Income" : "Add an Income"}</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-md font-medium text-primary">Wallet name</label>
						<select className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm" value={selectedWallet} onChange={(e) => setSelectedWallet(e.target.value)}>
							<option value="">Select a wallet</option>
							{wallets.map((wallet) => (
								<option key={wallet.id} value={wallet.id}>
									{wallet.name} (Balance: KES {wallet.balance.toLocaleString()})
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block text-md font-medium text-primary">Amount</label>
						<input type="number" className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm" value={amount} onChange={(e) => setAmount(e.target.value)} />
					</div>
					<div>
						<label className="block text-md font-medium text-primary">Category</label>
						<input type="text" className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm" value={category} onChange={(e) => setCategory(e.target.value)} />
					</div>
					<div>
						<label className="block text-md font-medium text-primary">Income Date</label>
						<input type="date" className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm" value={dateReceived} onChange={(e) => setDateReceived(e.target.value)} />
					</div>
				</div>
				<div className="flex space-x-4 mt-4">
					<button className="bg-secondary hover:bg-secondaryHover text-white px-4 py-2 rounded-md" onClick={handleAddOrUpdateIncome}>
						{editingIncomeId ? "UPDATE" : "SAVE"}
					</button>
					<button className="bg-accent hover:bg-accentHover text-white px-4 py-2 rounded-md" onClick={() => setEditingIncomeId(null)}>
						CANCEL
					</button>
				</div>
			</div>

			{/* Incomes History Table */}
			<div>
				<h3 className="text-xl font-semibold mb-4">History</h3>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border border-primary">
						<thead className="bg-primary">
							<tr>
								<th className="px-4 py-2 border text-left text-md font-medium text-white">Date</th>
								<th className="px-4 py-2 border text-left text-md font-medium text-white">Amount</th>
								<th className="px-4 py-2 border text-left text-md font-medium text-white">Category</th>
								<th className="px-4 py-2 border text-left text-md font-medium text-white">Action</th>
							</tr>
						</thead>
						<tbody>
							{history.map((item) => (
								<tr key={item.id} className="border-t">
									<td className="px-4 py-2 border">{item.date_received}</td>
									<td className="px-4 py-2 border">KES {item.amount.toLocaleString()}</td>
									<td className="px-4 py-2 border">{item.category}</td>
									<td className="px-4 py-2 border">
										<button className="bg-secondary hover:bg-secondaryHover text-white px-4 py-2 mx-1 rounded-md" onClick={() => handleDeleteIncome(item.id)}>
											Delete
										</button>
										<button className="bg-accent hover:bg-accentHover text-white px-4 py-2 mx-1 rounded-md" onClick={() => handleEditIncome(item)}>
											Edit
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default Income
