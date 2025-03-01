import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

const data = [
  { date: "2023/06/12 08:00", "Visitors": 314 },
  { date: "2023/06/12 09:00", "Visitors": 280 },
  { date: "2023/06/12 10:00", "Visitors": 290 },
  { date: "2023/06/12 11:00", "Visitors": 275 },
  { date: "2023/06/12 12:00", "Visitors": 320 },
  { date: "2023/06/13 08:00", "Visitors": 230 },
  { date: "2023/06/13 09:00", "Visitors": 210 },
  { date: "2023/06/13 10:00", "Visitors": 180 },
  { date: "2023/06/13 11:00", "Visitors": 200 },
  { date: "2023/06/13 12:00", "Visitors": 250 },
  { date: "2023/06/14 08:00", "Visitors": 350 },
  { date: "2023/06/14 09:00", "Visitors": 330 },
  { date: "2023/06/14 10:00", "Visitors": 360 },
];

let max = Math.max.apply(null,
  data.map(function (o) { return o.Visitors; }));

max = max + 10;

const VisitorsChart = () => {
  const [period, setPeriod] = useState(7);

  const handlePeriodChange = (newPeriod: number) => {
    if (period >= 365) {
      setPeriod(7);
      return;
    }
    setPeriod(newPeriod);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3
          className="text-sm text-[#2F3F67] font-semibold"
        >
          SITE VISITORS
        </h3>
        <div className="flex items-center">
          <button
            className="inline-flex py-2 px-2 w-fit items-center gap-1 text-[#5C6E9A] font-normal text-sm lg:text-[15px]"
            onClick={() => handlePeriodChange(period * 2)}
          >
            Last {period} days
            <ChevronDownIcon />
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
        <defs>
            <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#87FD70" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#70FD79" stopOpacity={0}/>
            </linearGradient>
        </defs>
          <XAxis
            dataKey="date"
            className="text-[10px] text-[#C2C8D5]"
            tickLine={false}
            tickMargin={10}
            tickSize={10}
            padding={{ left: 0, right: 30 }}
          />
          <YAxis
            type="number"
            domain={[0.0, max]}
            className="text-[10px]"
            tickCount={data.length+1}
            tickLine={false}
            tickMargin={10}
            allowDecimals={false}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity="0.5" />
          <Tooltip />
          <Area type="monotone" dataKey="Visitors" stroke="#82ca9d" fillOpacity={1} fill="url(#colorV)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsChart;
