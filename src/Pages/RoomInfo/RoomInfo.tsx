import { motion, useIsPresent } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import one from "../Rooms/Assets/1.svg";
import two from "../Rooms/Assets/2.svg";
import three from "../Rooms/Assets/3.svg";
import four from "../Rooms/Assets/4.svg";
import five from "../Rooms/Assets/5.svg";
import six from "../Rooms/Assets/6.svg";
import { TbBolt, TbDropletHalf2Filled, TbThermometer } from "react-icons/tb";
import { Chart } from "react-google-charts";

interface Room {
  humidity: number;
  icon_id: number;
  id: number;
  lastpresence: number;
  name: string;
  temperature: number;
  watthour: number;
}

interface HistoryUnit {
  created_at: string;
  humidity: number;
  temperature: number;
  watthour: number;
}

export default function RoomInfo() {
  const roomId = useParams().roomId;
  const isPresent = useIsPresent();
  const [roomData, setRoomData] = useState<Room>();
  const [history, setHistory] = useState<HistoryUnit[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryUnit[]>([]);
  const [isCelcius, setIsCelcius] = useState<boolean>(true);
  const navigate = useNavigate();

  async function fetchRoomData() {
    let res = await fetch(`${import.meta.env.VITE_API_URL}/room?id=${roomId}`, {
      method: "GET",
      credentials: "include",
    });
    if (res.status >= 400 || !res) {
      navigate("/rooms");
      return;
    }
    let data = await res.json();
    setRoomData(data);
  }

  async function fetchRoomHistory() {
    let res = await fetch(
      `${import.meta.env.VITE_API_URL}/room/history?id=${roomId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (res.status >= 400 || !res) {
        navigate("/rooms");
      return;
    }
    let data = await res.json();
    setHistory(data);
  }

  useEffect(() => {
    fetchRoomData();
    fetchRoomHistory();

    const interval = setInterval(() => {
      fetchRoomData();
      fetchRoomHistory();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFilteredHistory(history.reverse().slice(0, 120).reverse());
  }, [history]);

  let watthourData = [];
  watthourData.push(["Time", "Watthour"]);
  filteredHistory.forEach((unit) => {
    watthourData.push([unit.created_at, unit.watthour]);
  });

  let data = [];
  data.push(["Time", "Temperature", "Humidity"]);
  filteredHistory.forEach((unit) => {
    data.push([unit.created_at, unit.temperature, unit.humidity]);
  });

  const options = {
    isStacked: true,
    height: 300,
    legend: { position: "top", maxLines: 3 },
    vAxis: { minValue: 0 },
    hAxis: { textPosition: "none" },
    colors: ["#ff8c00", "#00bfff"],
  };

  // @ts-ignore
  return (
    <div className="flex-1 flex flex-col w-2/3 gap-16 mx-auto py-8">
      <h1 className="text-4xl text-center roboto text-gray-100">
        {roomData?.name}
      </h1>
      <div className="flex items-center justify-between w-full">
        <img
          src={
            roomData?.icon_id === 1
              ? one
              : roomData?.icon_id === 2
              ? two
              : roomData?.icon_id === 3
              ? three
              : roomData?.icon_id === 4
              ? four
              : roomData?.icon_id === 5
              ? five
              : six
          }
          alt=""
          className="w-[250px]"
        />
        <div className="flex flex-col items-end gap-8">
          <div className="w-3/5 flex items-center rounded-full overflow-hidden mt-4 text-white border-2 border-bgLght">
            <p
              className={`w-full ${
                isCelcius ? "bg-bgLght" : "bg-bgClr"
              } text-center py-2 cursor-pointer transition-all duration-300`}
              onClick={() => setIsCelcius(true)}
            >
              °C
            </p>
            <p
              className={`w-full ${
                !isCelcius ? "bg-bgLght" : "bg-bgClr"
              } text-center py-2 cursor-pointer transition-all duration-300`}
              onClick={() => setIsCelcius(false)}
            >
              °F
            </p>
          </div>
          <p className="text-3xl text-gray-100 quicksand flex items-center gap-2">
            Temperature:{" "}
            {isCelcius
              ? roomData?.temperature.toFixed(1) + "°C"
              : ((roomData?.temperature || 0) * 1.8 + 32).toFixed(1) + "°F"}
            <TbThermometer />
          </p>
          <p className="text-3xl text-gray-100 quicksand flex items-center gap-2">
            Humidity: {roomData?.humidity.toFixed(1)}%
            <TbDropletHalf2Filled />
          </p>
          <p className="text-3xl text-gray-100 quicksand flex items-center gap-2">
            Watthour: {roomData?.watthour.toFixed(1)}Wh ~ {((roomData?.watthour || 0) / 1000).toFixed(4) *.9}zł
            <TbBolt />
          </p>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden">
        <Chart
          chartType="AreaChart"
          width="100%"
          height="300px"
          data={data}
          options={options}
        />
      </div>
      <div className="rounded-xl overflow-hidden">
        <Chart
          chartType="AreaChart"
          width="100%"
          height="300px"
          data={watthourData}
          options={options}
        />
      </div>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{
          scaleX: 0,
          transition: { duration: 0.6, ease: "circOut" },
        }}
        exit={{ scaleX: 1, transition: { duration: 0.6, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen bg-indigo-400 z-50"
      />
    </div>
  );
}
