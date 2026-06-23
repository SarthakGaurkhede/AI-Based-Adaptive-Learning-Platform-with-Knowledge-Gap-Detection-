import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  {day:"Mon",students:40},
  {day:"Tue",students:55},
  {day:"Wed",students:60},
  {day:"Thu",students:90},
  {day:"Fri",students:80},
  {day:"Sat",students:100},
  {day:"Sun",students:120}
];

const ProgressChart = () => {
  return (

    <div className="bg-white p-6 rounded-2xl shadow h-[350px]">

      <h2 className="font-bold text-xl mb-6">
        Learning Progress
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="day"/>
          <YAxis/>
          <Tooltip/>
          <Line
            type="monotone"
            dataKey="students"
            stroke="#6D28D9"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default ProgressChart;
