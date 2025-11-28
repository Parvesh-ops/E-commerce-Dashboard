import useFetch from "../Hooks/useFetch";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis,
  LineChart, Line, CartesianGrid,
  AreaChart, Area, ResponsiveContainer
} from "recharts";

export default function Charts() {
  const { data: products, loading } = useFetch("/products");

  if (loading) return <p>Loading charts...</p>;

  // Prepare data: category counts
  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryCounts).map(([name, value]) => ({
    name, value
  }));

  // Price trends for line & area charts
  const priceData = products.map((p) => ({
    name: p.title.slice(0, 10), // shorten title
    price: p.price
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFF"];

  return (
    <div className="p-6 grid grid-cols-2 gap-6">

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Products by Category (Pie)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Products by Category (Bar)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="value" fill="#8884d8" /> */}

            {/* OR */}

            <Bar dataKey="value">
        {chartData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>


      {/* Line Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Price Trend (Line)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Price Trend (Area)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={priceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
