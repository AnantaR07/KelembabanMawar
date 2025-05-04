import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { getMawarHistory } from "./api/firebaseconfig";
import { Line } from "react-chartjs-2";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Leaf } from "lucide-react"; // ikon daun

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL:
    "https://kelembabanmawar-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [mawarData, setMawarData] = useState([]);
  const [isOn, setIsOn] = useState(false);

  const handleToggleSwitch = () => {
    const newStatus = isOn ? "mati" : "hidup";
    setIsOn(!isOn);
    update(ref(database, "/plant"), { statusPompa: newStatus })
      .then(() => console.log(`Status diperbarui: ${newStatus}`))
      .catch((error) => console.error("Gagal memperbarui status:", error));
  };

  useEffect(() => {
    const statusRef = ref(database, "/plant/statusPompa");
    const unsubscribe = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        const status = snapshot.val();
        setIsOn(status === "hidup");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getMawarHistory((data) => {
      const latestData = data.slice(-6).reverse();
      setMawarData(latestData);
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen font-sans">
      <Navbar />
      <header className="text-center p-10 bg-green-500 text-white rounded-b-3xl shadow-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center gap-3"
        >
          <Leaf size={32} />
          <h1 className="text-4xl font-bold tracking-wide">Monitoring Mawar</h1>
        </motion.div>
        <p className="mt-2 text-sm opacity-90">
          Sistem Monitoring & Pengontrolan Pompa Air Otomatis
        </p>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Dashboard
          mawarData={mawarData}
          isOn={isOn}
          handleToggleSwitch={handleToggleSwitch}
        />
        <DataTable mawarData={mawarData} />
      </main>
      <Footer />
    </div>
  );
}

const Dashboard = ({ mawarData, isOn, handleToggleSwitch }) => {
  const mawarChartData = {
    labels: mawarData.map((item) => item.waktu),
    datasets: [
      {
        label: "Kelembaban Mawar (%)",
        data: mawarData.map((item) => item.kelembaban),
        borderColor: "#059669",
        backgroundColor: "rgba(16,185,129,0.4)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Grafik Kelembaban Tanah
        </h2>
        <Line data={mawarChartData} />
      </motion.div>

      <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-center items-center hover:shadow-2xl transition-shadow duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Status Pompa
        </h2>
        <div
          className={`w-44 h-44 flex items-center justify-center rounded-full text-xl font-bold transition-all duration-300 shadow-md ${
            isOn ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {isOn ? "Pompa Menyala" : "Pompa Mati"}
        </div>
        <motion.button
          onClick={handleToggleSwitch}
          className="mt-6 px-6 py-2 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
          whileTap={{ scale: 0.9 }}
        >
          {isOn ? "Matikan Pompa" : "Nyalakan Pompa"}
        </motion.button>
      </motion.div>
    </div>
  );
};

const DataTable = ({ mawarData }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-6 overflow-x-auto"
      whileHover={{ scale: 1.01 }}
    >
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
        Data Sensor Kelembaban
      </h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-green-100 text-gray-700">
            <th className="p-2 border-b">Tanggal</th>
            <th className="p-2 border-b">Hari</th>
            <th className="p-2 border-b">Waktu</th>
            <th className="p-2 border-b">Kelembaban</th>
            <th className="p-2 border-b">Persentase</th>
            <th className="p-2 border-b">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {mawarData.map((item, index) => (
            <tr
              key={index}
              className={`text-center ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="p-2 border-b">{item.tanggal}</td>
              <td className="p-2 border-b">{item.hari}</td>
              <td className="p-2 border-b">{item.waktu}</td>
              <td className="p-2 border-b">{item.kelembaban}</td>
              <td className="p-2 border-b">{item.persentase}%</td>
              <td className="p-2 border-b">{item.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default App;
