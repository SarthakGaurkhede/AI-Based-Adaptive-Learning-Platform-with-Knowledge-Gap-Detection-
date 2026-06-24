import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-black/10 rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="text-gray-500 mb-1">{label}</p>
        <p className="font-bold text-primary">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function ProgressChart({
  data = [],
  title = "Learning Progress",
  dataKey = "value",
}) {
  if (!data.length) {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6">
        <h2 className="text-headline-md font-bold text-on-surface mb-4">
          {title}
        </h2>

        <div className="h-44 flex flex-col items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined text-3xl">
            show_chart
          </span>
          <p className="text-xs mt-2">No quiz data yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-6">
      <h2 className="text-headline-md font-bold text-on-surface mb-4">
        {title}
      </h2>

      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4648d4" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#4648d4" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e9ff"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#464554" }}
            />

            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#464554" }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#4648d4"
              strokeWidth={2.5}
              fill="url(#colorScore)"
              dot={{ r: 4, fill: "#4648d4", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#4648d4" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}