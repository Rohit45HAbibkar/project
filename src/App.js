import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const App = () => {
  const [nodeStats, setNodeStats] = useState({
    node1: { packetsGenerated: 0, linkLoad: 0, packetsInQueue: 0 },
    node2: { packetsGenerated: 0, linkLoad: 0, packetsInQueue: 0 },
    node3: { packetsGenerated: 0, linkLoad: 0, packetsInQueue: 0 },
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Node 1 Packets",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Node 2 Packets",
        data: [],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "Node 3 Packets",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });

  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newStats = {
        node1: {
          packetsGenerated: Math.floor(Math.random() * 10),
          linkLoad: Math.random(),
          packetsInQueue: Math.floor(Math.random() * 5),
        },
        node2: {
          packetsGenerated: Math.floor(Math.random() * 10),
          linkLoad: Math.random(),
          packetsInQueue: Math.floor(Math.random() * 5),
        },
        node3: {
          packetsGenerated: Math.floor(Math.random() * 10),
          linkLoad: Math.random(),
          packetsInQueue: Math.floor(Math.random() * 5),
        },
      };

      setNodeStats(newStats);

      // Update chart data
      setChartData((prevData) => ({
        ...prevData,
        labels: [...prevData.labels, new Date().toLocaleTimeString()],
        datasets: prevData.datasets.map((dataset, idx) => {
          const newData =
            idx === 0
              ? newStats.node1.packetsGenerated
              : idx === 1
              ? newStats.node2.packetsGenerated
              : newStats.node3.packetsGenerated;

          return {
            ...dataset,
            data: [...dataset.data, newData],
          };
        }),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Network Traffic Simulation Dashboard</h1>

      {/* Display real-time stats */}
      <div className="stats">
        {Object.keys(nodeStats).map((node, idx) => (
          <div key={idx}>
            <h3>{node.toUpperCase()}</h3>
            <p>Packets Generated: {nodeStats[node].packetsGenerated}</p>
            <p>Link Load: {nodeStats[node].linkLoad.toFixed(2)}</p>
            <p>Packets in Queue: {nodeStats[node].packetsInQueue}</p>
          </div>
        ))}
      </div>

      {/* Chart for packet generation */}
      <Line data={chartData} />
    </div>
  );
};

export default App;
