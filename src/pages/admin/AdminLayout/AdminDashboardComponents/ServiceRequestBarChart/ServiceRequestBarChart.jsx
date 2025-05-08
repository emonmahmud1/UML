import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import useSWR from "swr";
import { fetcher } from "../../../../../config/axiosConfig";
import Skeleton from "../../../../../components/Skeleton/Skeleton";

const ServiceRequestBarChart = ({ title, data,isLoading }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatXAxis = (tickItem) => {
    return format(parseISO(tickItem), "MMM dd");
  };

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
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //   },
  // ];
if(isLoading){
  return <Skeleton/>;
}
  return (
    <div>
      {data && (
        <ResponsiveContainer
          className="bg-bg-white rounded-md shadow-sm"
          width="100%"
          height={400}
        >
          <div className="flex justify-between p-2 mb-1 text-lg font-medium">
            <h1>
              {title}
              <span className="min-w-3 ml-2 bg-state-state1 min-h-3 px-2 rounded-md text-primary-light font-semibold">
                {data?.length}
              </span>
            </h1>
            <div className="ml-3">
              {" "}
              <label className="mr-3">
                <span className="mr-2"> Select date</span>
                <DatePicker
                  className="w-full dark:bg-[#2d7a7a] border text-center"
                  showIcon
                  toggleCalendarOnIconClick
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                />
              </label>
            </div>
          </div>

          <BarChart
            margin={{ top: 0, left: 10, right: 10, bottom: 70 }}
            data={data}
          >
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar
              radius={5}
              dataKey="count"
              fill="#F94491"
              strokeWidth={1}
              barSize={20}
              activeBar={{ fill: "#F9D9E8", strokeWidth: 4 }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ServiceRequestBarChart;
