import { useNavigate } from "react-router-dom"

const Landing = () => {
	const navigate = useNavigate()

	return (
		<div>
			<h1>Welcome to Budget Mita</h1>
			<button type="button" onClick={() => navigate("/login")}>
				Login
			</button>
			<button type="button" onClick={() => navigate("/signup")}>
				Signup
			</button>
			<button type="button" onClick={() => navigate("/dashboard")}>
				Demo
			</button>
		</div>
	)
}

export default Landing
