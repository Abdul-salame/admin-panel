
import { useEffect, useState } from "react";
import {
  Users,
  MapPin,
  Briefcase,
  Handshake,
  TrendingUp,
  FileText
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const stats = [
  { label: "Youth Reached", value: 2500, icon: Users },
  { label: "States Covered", value: 33, icon: MapPin },
  { label: "Programs Implemented", value: 8, icon: Briefcase },
  { label: "Institutional Partners", value: 7, icon: Handshake },
  { label: "Direct Jobs Created", value: 70, icon: TrendingUp },
  { label: "Policies Influenced", value: 3, icon: FileText }
];

export default function Dashboard() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const increment = Math.ceil(stat.value / 40);

      return setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];
          if (updated[index] < stat.value) {
            updated[index] = Math.min(updated[index] + increment, stat.value);
          }
          return updated;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

    
  const chartData = stats.map((item) => ({
    name: item.label,
    value: item.value,
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
        {stats.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="bg-white p-6 rounded-xl shadow border flex items-center gap-4"
            >
              <div className="p-4 rounded-lg bg-blue-100 text-blue-600">
                <Icon size={28} />
              </div>

              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <h2 className="text-3xl font-bold text-blue-600">
                  {counts[i]}
                  {item.value >= 100 ? "+" : ""}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📊 IMPACT CHART */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-bold mb-4">
          Program Impact Overview
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
