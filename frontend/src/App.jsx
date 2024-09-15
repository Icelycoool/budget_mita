import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Landing from "./components/Landing"
import Signup from "./components/Signup"
import Login from "./components/Login"
import PasswordReset from "./components/PasswordReset"

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/reset-password/:token" element={<PasswordReset />} />
				<Route path="/reset-password" element={<PasswordReset />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/" element={<Landing />} />
			</Routes>
		</Router>
	)
}

export default App
