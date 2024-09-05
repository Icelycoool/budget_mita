import { useState } from "react"

const Budget = () => {
	const [history, setHistory] = useState([
		{ start_date: "2024-09-01", end_date: "2024-09-30", amount: "KES 10,000", name: "September", action: "Edit/Delete" },
		{ start_date: "2024-09-01", end_date: "2024-09-30", amount: "KES 10,000", name: "September", action: "Edit/Delete" },
		{ start_date: "2024-09-01", end_date: "2024-09-30", amount: "KES 10,000", name: "September", action: "Edit/Delete" },
		{ start_date: "2024-09-01", end_date: "2024-09-30", amount: "KES 10,000", name: "September", action: "Edit/Delete" },
	])

	return (
		<div>
			{/* Create a Budget Form */}
			<div className="bg-white p-4 rounded-lg mb-6">
				<h2 className="text-xl text-primary font-semibold mb-4">Create a Budget</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-md font-medium text-primary">Budget Name</label>
						<input type="text" className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md" />
					</div>
					<div>
						<label className="block text-md font-medium text-primary">Amount</label>
						<input type="text" className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md" />
					</div>
					<div>
						<label className="block text-md font-medium text-primary">Start Date</label>
						<input type="date" className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md" />
					</div>
					<div>
						<label className="block text-md font-medium text-primary">End Date</label>
						<input type="date" className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md" />
					</div>
				</div>
				<div className="flex space-x-4 mt-4">
					<button className="bg-secondary hover:bg-secondaryHover text-white px-4 py-2 rounded-md">SAVE</button>
					<button className="bg-accent hover:bg-accentHover text-white px-4 py-2 rounded-md">CANCEL</button>
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
										<button className="bg-secondary hover:bg-secondaryHover text-white px-4 py-2 mx-1 rounded-md">Delete</button>
										<button className="bg-accent hover:bg-accentHover text-white px-4 py-2 mx-1 rounded-md">Edit</button>
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
