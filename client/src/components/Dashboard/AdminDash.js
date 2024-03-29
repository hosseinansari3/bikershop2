import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { PieChart, Pie, Cell } from "recharts";

function AdminDash() {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 340, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 210, pv: 2400, amt: 2400 },
    { name: "Page E", uv: 334, pv: 2400, amt: 2400 },
    { name: "Page F", uv: 240, pv: 2400, amt: 2400 },
  ];

  const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <h1 className="my-4 fs-2 fw-bold">Dashboard</h1>
      <div className="grid gap-4 mb-8 md:grid-cols-4 xl:grid-cols-4">
        <div className="min-w-0 rounded-lg   overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full">
          <div className="p-4 border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-green-100 bg-teal-500">
            <div className="text-center xl:mb-0 mb-3">
              <div className="text-center inline-block text-3xl text-white dark:text-green-100 bg-teal-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="bi bi-stack"
                  viewBox="0 0 16 16"
                >
                  <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z" />
                  <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z" />
                </svg>
              </div>
              <div>
                <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
                  Today Orders
                </p>
                <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">
                  $0.00
                </p>
              </div>
              <div className="flex text-center text-xs font-normal text-gray-50 dark:text-gray-100">
                <div className="px-1 mt-3">Cash : $0.00</div>
                <div className="px-1 mt-3">card : $0.00</div>
                <div className="px-1 mt-3">Credit : $0.00</div>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg   overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full">
          <div className="p-4 border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-orange-100 bg-orange-400">
            <div className="text-center xl:mb-0 mb-3">
              <div className="text-center inline-block text-3xl text-white dark:text-orange-100 bg-orange-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="bi bi-stack"
                  viewBox="0 0 16 16"
                >
                  <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z" />
                  <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z" />
                </svg>
              </div>
              <div>
                <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
                  Yesterday Orders
                </p>
                <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">
                  $0.00
                </p>
              </div>
              <div className="flex text-center text-xs font-normal text-gray-50 dark:text-gray-100">
                <div className="px-1 mt-3">Cash : $0.00</div>
                <div className="px-1 mt-3">card : $0.00</div>
                <div className="px-1 mt-3">Credit : $0.00</div>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg   overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full">
          <div className="p-4 border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-green-100 bg-blue-500">
            <div className="text-center xl:mb-0 mb-3">
              <div className="text-center inline-block text-3xl text-white dark:text-green-100 bg-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="bi bi-cart3"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </div>
              <div>
                <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
                  This Month
                </p>
                <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">
                  $3625.99
                </p>
              </div>
              <div className="flex text-center text-xs font-normal text-gray-50 dark:text-gray-100">
                <div className="px-1 mt-3">Cash : $0.00</div>
                <div className="px-1 mt-3">card : $0.00</div>
                <div className="px-1 mt-3">Credit : $0.00</div>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg   overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full">
          <div className="p-4 border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-green-100 bg-green-500">
            <div className="text-center xl:mb-0 mb-3">
              <div className="text-center inline-block text-3xl text-white dark:text-green-100 bg-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  class="bi bi-cart4"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
              </div>
              <div>
                <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">
                  All-Time Sales
                </p>
                <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">
                  $28486.47
                </p>
              </div>
              <div className="flex text-center text-xs font-normal text-gray-50 dark:text-gray-100">
                <div className="px-1 mt-3">Cash : $0.00</div>
                <div className="px-1 mt-3">card : $0.00</div>
                <div className="px-1 mt-3">Credit : $0.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="min-w-0 rounded-lg   overflow-hidden bg-white dark:bg-gray-800 flex h-full">
          <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                class="bi bi-cart4"
                viewBox="0 0 16 16"
              >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
              </svg>
            </div>
            <div>
              <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-gray-400">
                <span>Total Order</span>
              </h6>
              <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">
                49
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg   overflow-hidden bg-white dark:bg-gray-800 flex h-full">
          <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                class="bi bi-cart4"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                <path
                  fill-rule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                />
              </svg>
            </div>
            <div>
              <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-gray-400">
                <span>Orders Pending</span>
                <span className="text-red-500 text-sm font-semibold">
                  (4420.77)
                </span>
              </h6>
              <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">
                49
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg   overflow-hidden bg-white dark:bg-gray-800 flex h-full">
          <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                class="bi bi-truck"
                viewBox="0 0 16 16"
              >
                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
            </div>
            <div>
              <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-gray-400">
                <span>Orders Processing</span>
              </h6>
              <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">
                49
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg   overflow-hidden bg-white dark:bg-gray-800 flex h-full">
          <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
            <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                class="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </div>
            <div>
              <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-gray-400">
                <span>Orders Delivered</span>
              </h6>
              <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">
                49
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 my-8">
        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            Weekly sales
          </p>
          <LineChart
            width={400}
            height={300}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800 ">
          <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
            Best Selling Products
          </p>
          <div className="flex justify-center">
            <PieChart width={300} height={400}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                viewBox={{ x: "100", y: "100", width: "200", height: "130" }}
                label={renderCustomizedLabel}
                outerRadius={140}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
      <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
        Recent Orders
      </h1>
      <div className="w-full overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-800">
              <tr>
                <td className="px-4 py-3">INVOICE NO</td>
                <td className="px-4 py-3">ORDER TIME</td>
                <td className="px-4 py-3">Customer Name</td>
                <td className="px-4 py-3">METHOD</td>
                <td className="px-4 py-3">AMOUNT</td>
                <td className="px-4 py-3">STATUS</td>
                <td className="px-4 py-3">ACTION</td>
                <td className="px-4 py-3">INVOICE</td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400 dark:bg-gray-900">
              <tr>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">10034</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">May 30, 2023 9:23 AM</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="text-sm">NHJJJJ</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">Cash</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">$91.18</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                      Delivered
                    </span>
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none">
                    <option value="status" hidden="">
                      Delivered
                    </option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right flex justify-end">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-green-600 focus:outline-none"
                    >
                      <p data-tip="true" data-for="receipt" currentitem="false">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="6 9 6 2 18 2 18 9"></polyline>
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                          <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                      </p>
                    </button>
                    <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                      <a href="#">
                        <p data-tip="true" data-for="view" currentitem="false">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                          </svg>
                        </p>
                      </a>
                    </span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">10034</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">May 30, 2023 9:23 AM</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="text-sm">NHJJJJ</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">Cash</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">$91.18</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-510 bg-yellow-100 dark:text-white dark:bg-yellow-600">
                      Pending
                    </span>
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none">
                    <option value="status" hidden="">
                      Delivered
                    </option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right flex justify-end">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-green-600 focus:outline-none"
                    >
                      <p data-tip="true" data-for="receipt" currentitem="false">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="6 9 6 2 18 2 18 9"></polyline>
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                          <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                      </p>
                    </button>
                    <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                      <a href="#">
                        <p data-tip="true" data-for="view" currentitem="false">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                          </svg>
                        </p>
                      </a>
                    </span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">10034</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">May 30, 2023 9:23 AM</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="text-sm">NHJJJJ</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">Cash</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">$91.18</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                      Delivered
                    </span>
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none">
                    <option value="status" hidden="">
                      Delivered
                    </option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right flex justify-end">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-green-600 focus:outline-none"
                    >
                      <p data-tip="true" data-for="receipt" currentitem="false">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="6 9 6 2 18 2 18 9"></polyline>
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                          <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                      </p>
                    </button>
                    <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                      <a href="#">
                        <p data-tip="true" data-for="view" currentitem="false">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                          </svg>
                        </p>
                      </a>
                    </span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">10034</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">May 30, 2023 9:23 AM</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="text-sm">NHJJJJ</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">Cash</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">$91.18</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                      Delivered
                    </span>
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none">
                    <option value="status" hidden="">
                      Delivered
                    </option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right flex justify-end">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-green-600 focus:outline-none"
                    >
                      <p data-tip="true" data-for="receipt" currentitem="false">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="6 9 6 2 18 2 18 9"></polyline>
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                          <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                      </p>
                    </button>
                    <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                      <a href="#">
                        <p data-tip="true" data-for="view" currentitem="false">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                          </svg>
                        </p>
                      </a>
                    </span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">10034</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">May 30, 2023 9:23 AM</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="text-sm">NHJJJJ</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">Cash</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">$91.18</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                      Delivered
                    </span>
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none">
                    <option value="status" hidden="">
                      Delivered
                    </option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right flex justify-end">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-green-600 focus:outline-none"
                    >
                      <p data-tip="true" data-for="receipt" currentitem="false">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="6 9 6 2 18 2 18 9"></polyline>
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                          <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                      </p>
                    </button>
                    <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                      <a href="#">
                        <p data-tip="true" data-for="view" currentitem="false">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                          </svg>
                        </p>
                      </a>
                    </span>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">10034</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm">May 30, 2023 9:23 AM</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="text-sm">NHJJJJ</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">Cash</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold">$91.18</span>
                </td>
                <td className="px-4 py-3 text-xs">
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                      Delivered
                    </span>
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border border-gray-50 bg-gray-50 dark:border-gray-700 h-8 rounded-md text-xs focus:border-gray-400 focus:outline-none">
                    <option value="status" hidden="">
                      Delivered
                    </option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right flex justify-end">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-green-600 focus:outline-none"
                    >
                      <p data-tip="true" data-for="receipt" currentitem="false">
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="6 9 6 2 18 2 18 9"></polyline>
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                          <rect x="6" y="14" width="12" height="8"></rect>
                        </svg>
                      </p>
                    </button>
                    <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                      <a href="#">
                        <p data-tip="true" data-for="view" currentitem="false">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                          </svg>
                        </p>
                      </a>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800">
          <div className="flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400">
            <span className="flex items-center font-semibold tracking-wide uppercase">
              SHOWING 1-8 OF 53
            </span>
            <div className="flex mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-not-allowed">
                      <svg
                        class="h-3 w-3"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300">
                      1
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                      2
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                      3
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                      4
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                      5
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                      {" "}
                      6
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10">
                      7
                    </button>
                  </li>

                  <li>
                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none p-2 rounded-md text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent opacity-50 cursor-not-allowed">
                      <svg
                        class="h-3 w-3"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDash;
