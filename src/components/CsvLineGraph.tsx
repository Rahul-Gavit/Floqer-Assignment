import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSalaries } from "../hooks/useSalaries";

const CsvLineGraph = () => {
  const { data } = useSalaries();

  return (
    <div className="border shadow-md rounded-md">
      <h2 className="text-lg text-violet-500 underline font-medium px-6 pt-8">
        Salaries Data Over Time
      </h2>
      <div className="p-12">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_jobs"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="avg_salary_usd" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CsvLineGraph;
