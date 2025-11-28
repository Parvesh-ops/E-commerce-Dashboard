import React from 'react'
import useFetch from '../Hooks/useFetch'
import Charts from './Charts';

const Dashboard = () => {
    const { data: products, error, loading } = useFetch("/products")

    if (loading) return <p>Loading...</p>;
    if (error) return <p>failed to fetch data</p>;

    const totalProducts = products.length;
    const avgPrice = (products.reduce((acc, item) => acc + item.price, 0) / totalProducts).toFixed(2)

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Overview</h1>

            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white shadow rounded">Total Products: {totalProducts}</div>
                <div className="p-4 bg-white shadow rounded">Avg Price: ${avgPrice}</div>
                <div className="p-4 bg-white shadow rounded">
                    Categories: {new Set(products.map(p => p.category)).size}
                </div>
            </div>
            <Charts/>
        </div>
    )
}

export default Dashboard
