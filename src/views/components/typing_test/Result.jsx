import "./result.scss";
import { getWpm, getAcc, getWpmSec, saveResult } from "./result_logic";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const Result = () => {
  const wpmSec = getWpmSec();
  var sec = [];
  var datas = [];
  for (let index = 0; index < wpmSec.length; index++) {
    sec.push(index + 1);
  }
  console.log(wpmSec);
  const data = {
    labels: sec,
    datasets: [
      {
        type: 'line',
        label: "wpm",
        data: wpmSec,
        backgroundColor: "rgb(240, 255, 255)",
        borderColor: "rgb(140, 150, 150)",
        fill: false
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        type: "linear",
        grace: -10,
        beginAtZero: true,
        ticks: {
          stepSize: 40,
        },
        title: {
          color: "rgb(240, 255, 255, 0.7)",
          display: true,
          text: "Words per minute",
          font: {
            size: 12,
          },
        },
        stacked: true
      },
      x: {
        title: {
          color: "rgb(240, 255, 255, 0.7)",
          display: true,
          text: "Time",
          font: {
            size: 16,
          },
        },
        ticks:{
          stepSize: 2
        },
        grid:{
          offset: true
        }
      }
    },
    maintainAspectRatio: false,
  };

  const res = saveResult();
  console.log(res);

  return (
    <div id="result_container">
      <div id="result_info">
        <div id="wpm">
          <h1 className="heading">wpm</h1>
          <h1 className="data">{getWpm()}</h1>
        </div>
        <div id="acc">
          <h1 className="heading">acc</h1>
          <h1 className="data">{getAcc() + "%"}</h1>
        </div>
      </div>
      <div id="chart">
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
};

export default Result;
