import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Konfigurasi Firebase
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

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fungsi untuk mengambil data mawar dari Firebase
export const getMawarHistory = (callback) => {
  const historyRef = ref(database, "plant/sensorData"); // Path untuk data mawar

  onValue(
    historyRef,
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          kelembaban: data[key].kelembaban,
          keterangan: data[key].keterangan,
          persentase: data[key].persentase,
          waktu: data[key].waktu,
          tanggal: data[key].tanggal,
          hari: data[key].hari,
        }));
        callback(formattedData);
      } else {
        callback([]);
      }
    },
    (error) => {
      console.log("Error fetching mawar data: ", error);
      callback([]);
    }
  );
};
