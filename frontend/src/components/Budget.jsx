import { useState, useEffect } from "react"
import axios from "axios"

const Budget = () => {
	const apiUrl = import.meta.env.VITE_API_BASE_URL
	const [history, setHistory] = useState([])
	const [newBudget, setNewBudget] = useState({
		name: "",
		amount: "",
		start_date: "",
		end_date: "",
	})
	const [isEditing, setIsEditing] = useState(false)
	const [editBudgetId, setEditBudgetId] = useState(null)

	useEffect(() => {
		axios
			.get(`${apiUrl}/api/budget/`, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then((response) => setHistory(response.data))
			.catch((error) => console.error(error))
	}, [apiUrl])

	const handleSaveOrUpdate = () => {
		if (isEditing) {
			axios
				.put(`${apiUrl}/api/budget/${editBudgetId}`, newBudget, {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
				.then((response) => {
					setHistory(history.map((item) => (item.id === editBudgetId ? response.data : item)))
					resetForm()
				})
				.catch((error) => console.error(error))
		} else {
			axios
				.post(`${apiUrl}/api/budget/`, newBudget, {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				})
				.then((response) => {
					setHistory([...history, response.data])
					resetForm()
				})
				.catch((error) => console.error(error))
		}
	}

	const resetForm = () => {
		setNewBudget({
			name: "",
			amount: "",
			start_date: "",
			end_date: "",
		})
		setIsEditing(false)
		setEditBudgetId(null)
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setNewBudget({ ...newBudget, [name]: value })
	}

	const handleEdit = (budget) => {
		setNewBudget({
			name: budget.name,
			amount: budget.amount,
			start_date: budget.start_date,
			end_date: budget.end_date,
		})
		setIsEditing(true)
		setEditBudgetId(budget.id)
	}

	const handleDelete = (id) => {
		axios
			.delete(`${apiUrl}/api/budget/${id}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then(() => {
				setHistory(history.filter((item) => item.id !== id))
			})
			.catch((error) => console.error(error))
	}

	return (
		<div className="p-4">
			{/* Create or Edit a Budget Form */}
			<div className="bg-white p-4 rounded-lg mb-6">
				<h2 className="text-xl text-primary font-semibold mb-4">{isEditing ? "Edit Budget" : "Create a Budget"}</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-md font-medium text-primary">Budget Name</label>
						<input
							type="text"
							name="name"
							value={newBudget.name}
							onChange={handleInputChange}
							className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
						/>
					</div>
					<div>
						<label className="block text-md font-medium text-primary">Amount</label>
						<input
							type="text"
							name="amount"
							value={newBudget.amount}
							onChange={handleInputChange}
							className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
						/>
					</div>
					<div>
						<label className="block text-md font-medium text-primary">Start Date</label>
						<input
							type="date"
							name="start_date"
							value={newBudget.start_date}
							onChange={handleInputChange}
							className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
						/>
					</div>
					<div>
						<label className="block text-md font-medium text-primary">End Date</label>
						<input
							type="date"
							name="end_date"
							value={newBudget.end_date}
							onChange={handleInputChange}
							className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
						/>
					</div>
				</div>
				<div className="flex space-x-4 mt-4">
					<button onClick={handleSaveOrUpdate} className="bg-secondary hover:bg-secondaryHover text-white px-4 py-2 rounded-md">
						{isEditing ? "UPDATE" : "SAVE"}
					</button>
					<button onClick={resetForm} className="bg-accent hover:bg-accentHover text-white px-4 py-2 rounded-md">
						CANCEL
					</button>
				</div>
			</div>

			{/* Budgets Table */}
			<div>
				<h3 className="text-xl font-semibold mb-4">History</h3>
				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border border-primary">
						<thead className="bg-primary">
							<tr>
								<th className="px-4 py-2 border text-left text-md font-medium text-white">Budget</th>
								<th className="px-4 py-2 border text-left text-md font-medium text-white">Start Date</th>
								<th className="px-4 py-2 border text-left text-md font-medium text-white">End Date</th>
								<th className="px-4 py-2 border text-left text-md font-medium text-white">Amount</th>
								<th className="px-4 py-2 border text-left text-md font-medium text-white">Action</th>
							</tr>
						</thead>
						<tbody>
							{history.map((item, index) => (
								<tr key={index} className="border-t">
									<td className="px-4 py-2 border">{item.name}</td>
									<td className="px-4 py-2 border">{item.start_date}</td>
									<td className="px-4 py-2 border">{item.end_date}</td>
									<td className="px-4 py-2 border">{item.amount}</td>
									<td className="px-4 py-2 border">
										<button className="bg-secondary hover:bg-secondaryHover text-white px-4 py-2 mx-1 rounded-md" onClick={() => handleEdit(item)}>
											Edit
										</button>
										<button className="bg-accent hover:bg-accentHover text-white px-4 py-2 mx-1 rounded-md" onClick={() => handleDelete(item.id)}>
											Delete
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

export default Budget
