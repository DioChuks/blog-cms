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
  { date: "13/6", "Visitors": 271,},
  { date: "13/6", "Visitors": 242,},
  { date: "13/6", "Visitors": 258,},
  { date: "13/6", "Visitors": 266,},
  { date: "13/6", "Visitors": 240,},
  { date: "13/6", "Visitors": 189,},
  { date: "13/6", "Visitors": 49,},
  { date: "13/6", "Visitors": 80,},
  { date: "13/6", "Visitors": 150,},
  { date: "13/6", "Visitors": 50,},
  { date: "13/6", "Visitors": 6,},
  { date: "13/6", "Visitors": 20,},
];

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
            padding={{ left: 30, right: 30 }}
          />
          <YAxis
            type="number"
            domain={[0.0, 300.0]}
            className="text-[10px]"
            tickCount={6}
            tickLine={false}
            tickMargin={10}
            allowDecimals={false}
            // axisLine={false}
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
