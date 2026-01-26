
import { useState, useMemo } from "react";
import {
  CheckCircle,
  Plus,
  Trash2,
  X,
} from "lucide-react";

export default function Donations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donations, setDonations] = useState([
    {
      id: 1,
      title: "GEP Program Support",
      source: "Corporate / CSR",
      currency: "NGN",
      amount: 2500000,
      purpose: "Graduate Employability Program",
      payment: "Bank Transfer",
      status: "Ongoing",
      verified: true,
      date: "2025-01-12",
    },
    {
      id: 2,
      title: "General Youth Support",
      source: "Individual",
      currency: "USD",
      amount: 500,
      purpose: "General Donation",
      payment: "Card",
      status: "Completed",
      verified: false,
      date: "2025-02-02",
    },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    source: "Individual",
    currency: "NGN",
    amount: "",
    purpose: "",
    payment: "Bank Transfer",
    status: "Ongoing",
    date: new Date().toISOString().split("T")[0],
  });

  /* ===============================
      HANDLERS
  =============================== */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      setDonations((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleAddDonation = (e) => {
    e.preventDefault();
    const newDonation = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
      verified: false,
    };
    setDonations([newDonation, ...donations]);
    setIsModalOpen(false);
    setFormData({
      title: "",
      source: "Individual",
      currency: "NGN",
      amount: "",
      purpose: "",
      payment: "Bank Transfer",
      status: "Ongoing",
      date: new Date().toISOString().split("T")[0],
    });
  };

  /* ===============================
      AUTO CALCULATIONS
  =============================== */
  const stats = useMemo(() => {
    const now = new Date();
    const totals = {};
    const monthlyTotals = {};
    const verifiedTotals = {};
    const ongoingTotals = {};

    donations.forEach((d) => {
      const donationDate = new Date(d.date);
      const isThisMonth =
        donationDate.getMonth() === now.getMonth() &&
        donationDate.getFullYear() === now.getFullYear();

      totals[d.currency] ??= 0;
      monthlyTotals[d.currency] ??= 0;
      verifiedTotals[d.currency] ??= 0;
      ongoingTotals[d.currency] ??= 0;

      totals[d.currency] += d.amount;
      if (isThisMonth) monthlyTotals[d.currency] += d.amount;
      if (d.verified) verifiedTotals[d.currency] += d.amount;
      if (d.status === "Ongoing") ongoingTotals[d.currency] += d.amount;
    });

    return { totals, monthlyTotals, verifiedTotals, ongoingTotals };
  }, [donations]);

  return (
    <div className="p-6 space-y-10 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Manage Donations
        </h1>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-fit"
        >
          <Plus size={18} /> Add Donation
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Donations" data={stats.totals} />
        <StatCard title="This Month" data={stats.monthlyTotals} />
        <StatCard title="Verified" data={stats.verifiedTotals} />
        <StatCard title="Ongoing" data={stats.ongoingTotals} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl shadow border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              <Th>Title</Th>
              <Th>Source</Th>
              <Th>Amount</Th>
              <Th>Purpose</Th>
              <Th>Payment</Th>
              <Th>Status</Th>
              <Th>Verified</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50 dark:hover:bg-slate-800 transition">
                <Td>{d.title}</Td>
                <Td>{d.source}</Td>
                <Td>{d.currency} {d.amount.toLocaleString()}</Td>
                <Td>{d.purpose}</Td>
                <Td>{d.payment}</Td>
                <Td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${d.status === "Ongoing" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                    {d.status}
                  </span>
                </Td>
                <Td>
                  {d.verified ? <CheckCircle className="text-green-600" size={18} /> : <span className="text-xs text-gray-400 italic">Pending</span>}
                </Td>
                <Td>{d.date}</Td>
                <Td>
                  <button onClick={() => handleDelete(d.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD DONATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">New Donation</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleAddDonation} className="space-y-4">
              <input 
                required placeholder="Title (e.g. CSR Grant)" 
                className="w-full p-2 border rounded-lg dark:bg-slate-800"
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="p-2 border rounded-lg dark:bg-slate-800"
                  value={formData.currency}
                  onChange={e => setFormData({...formData, currency: e.target.value})}
                >
                  <option>NGN</option>
                  <option>USD</option>
                  <option>GBP</option>
                </select>
                <input 
                  required type="number" placeholder="Amount" 
                  className="p-2 border rounded-lg dark:bg-slate-800"
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                />
              </div>
              <input 
                required placeholder="Purpose" 
                className="w-full p-2 border rounded-lg dark:bg-slate-800"
                value={formData.purpose}
                onChange={e => setFormData({...formData, purpose: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="p-2 border rounded-lg dark:bg-slate-800"
                  value={formData.source}
                  onChange={e => setFormData({...formData, source: e.target.value})}
                >
                  <option>Individual</option>
                  <option>Corporate / CSR</option>
                  <option>Government</option>
                </select>
                <input 
                  type="date" 
                  className="p-2 border rounded-lg dark:bg-slate-800"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                Save Donation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Helpers
const StatCard = ({ title, data }) => (
  <div className="bg-white dark:bg-slate-900 rounded-xl border p-6">
    <p className="text-sm text-gray-500 mb-2">{title}</p>
    {Object.keys(data).length === 0 ? <p className="text-gray-400 text-sm">No data</p> : 
      Object.entries(data).map(([curr, val]) => (
        <p key={curr} className="text-lg font-bold">{curr} {val.toLocaleString()}</p>
      ))
    }
  </div>
);

const Th = ({ children }) => <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-300">{children}</th>;
const Td = ({ children }) => <td className="px-4 py-3 text-gray-700 dark:text-gray-200">{children}</td>;