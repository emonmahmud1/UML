import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";
import { fetcher } from "../../../../../config/axiosConfig";

const BarchartComponent = () => {
  const { data: ticketSource } = useSWR("dashboard/source", fetcher);
  // const data = [
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //   },
  // ];

  return (
    <div>
      {ticketSource && (
        <ResponsiveContainer
          className="bg-bg-white rounded-md shadow-sm"
          width="100%"
          height={300}
        >
          <h1 className=" p-2 mb1 text-lg font-medium">
            Last 6 month ticket source
            <span className="min-w-3 bg-state-state1 min-h-3 px-2 rounded-md text-primary-light font-semibold">
              {ticketSource?.data.length}
            </span>
          </h1>
          <BarChart
            margin={{ top: 0, left: 10, right: 10, bottom: 50 }}
            data={ticketSource?.data}
          >
            <></>
            <XAxis dataKey="source" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar
              radius={5}
              dataKey="count"
              fill="#F9D9E8"
              strokeWidth={1}
              barSize={40}
              activeBar={{ fill: "#F82980", strokeWidth: 4 }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarchartComponent;
