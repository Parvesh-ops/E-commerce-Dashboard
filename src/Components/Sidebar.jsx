import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>

      <nav className="flex flex-col gap-2">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Home</Link>
        <Link to="/products" className="hover:bg-gray-700 p-2 rounded">Products</Link>
       <Link to="/charts" className="hover:bg-gray-700 p-2 rounded">Charts</Link>

      </nav>
    </aside>
  );
}
