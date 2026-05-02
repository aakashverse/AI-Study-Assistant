import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b px-6 py-3 flex justify-between items-center">
      <h1 className="text-lg font-bold text-indigo-600">AI Study Assistant</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Hi, {user?.name}</span>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
    </nav>
  );
}