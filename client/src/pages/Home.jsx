import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="min-h-screen flex justify-center text-slate-50">
      <div>
        <h1 className="text-4xl font-bold">Welcome to Task Manager</h1>
        <p className="text-lg">Welcome to your dashboard, remember to register and login</p>
        <p className="text-lg">You are logged in</p>
      </div>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default Home