import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { getMawarHistorySecond } from "./api/firebaseconfig";
import { Line } from "react-chartjs-2";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update, onValue, set } from "firebase/database";
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
import { Leaf } from "lucide-react";

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
  const [isMenyiram, setIsMenyiram] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState("");

  const handleToggleSwitch = () => {
    const newStatus = isOn ? "mati" : "hidup";
    setIsOn(!isOn);
    update(ref(database, "/plant"), { statusPompa: newStatus })
      .then(() => console.log(`Status diperbarui: ${newStatus}`))
      .catch((error) => console.error("Gagal memperbarui status:", error));
  };

  const handleCekKelembaban = () => {
    setIsMenyiram(true);
    update(ref(database, "/plant"), { cekKelembaban: "true" })
      .then(() => {
        setTimeout(() => {
          setIsMenyiram(false);
        }, 6000);
      })
      .catch((error) => {
        console.error("Gagal memperbarui cek kelembaban:", error);
        setIsMenyiram(false);
      });
  };

  const handlePlantChange = (value) => {
    if (value === "mawar") {
      set(ref(database, "/plant/tanaman"), "pertama");
      window.location.href = "/";
    } else if (value === "tanaman2") {
      set(ref(database, "/plant/tanaman"), "kedua");
      window.location.href = "/tanamanmawardua";
    }
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
    getMawarHistorySecond((data) => {
      const latestData = data.slice(-6).reverse();
      setMawarData(latestData);
    });
  }, [selectedPlant]);

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen font-sans">
      <Navbar />
      <header className="text-center p-10 bg-rose-600 text-white rounded-b-3xl shadow-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center gap-3"
        >
          <Leaf size={28} className="md:size-32" />
          <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
            Monitoring Tanaman 2
          </h1>
        </motion.div>
        <p className="mt-2 text-xs md:text-sm opacity-90">
          Sistem Monitoring & Pengontrolan Pompa Air Otomatis
        </p>
      </header>

      <div className="flex flex-col items-center mt-10 p-6 bg-white rounded-xl shadow-xl w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          🌱 Pilih Tanaman Mawar
        </h2>

        <div className="relative w-full">
          <select
            value={selectedPlant}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedPlant(value);
              if (value) {
                handlePlantChange(value);
              }
            }}
            className="block w-full appearance-none bg-green-50 border border-green-300 text-green-700 py-3 px-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 ease-in-out"
          >
            <option value="">🌼 -- Pilih Tanaman Mawar --</option>
            <option value="mawar">Tanaman Mawar 1</option>
            <option value="tanaman2">Tanaman Mawar 2</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        <Dashboard
          mawarData={mawarData}
          isOn={isOn}
          isMenyiram={isMenyiram}
          handleToggleSwitch={handleToggleSwitch}
          handleCekKelembaban={handleCekKelembaban}
        />
        <DataTable mawarData={mawarData} />
      </main>
      <Footer />
    </div>
  );
}

const Dashboard = ({
  mawarData,
  isOn,
  isMenyiram,
  handleToggleSwitch,
  handleCekKelembaban,
}) => {
  const mawarChartData = {
    labels: mawarData.map((item) => item.waktu),
    datasets: [
      {
        label: "Kelembaban Tanah (%)",
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
          onClick={handleCekKelembaban}
          className="mt-4 px-6 py-2 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          whileTap={{ scale: 0.9 }}
        >
          {isMenyiram ? "Melakukan Pengecekan..." : "Cek Kelembaban Sekarang"}
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
            <th className="p-2 border-b">Status Pompa</th>
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
              <td className="p-2 border-b">{item.status_pompa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default App;
