import { useAuth } from "../context/AuthContext"

const Home = () => {
  const { user } = useAuth()
  return (
    <div className="flex justify-center text-slate-50">
      <div>
        <h1 className="text-4xl font-bold">Welcome to Task Manager</h1>
        <p className="text-lg">Welcome to your dashboard, remember to register and login</p>
        <p className="text-lg">You are logged in as: {
          user ? user.email : "Guest"
        } </p>
      </div>
    </div>
  )
}

export default Home