const AnalyticsCard = ({ title, value, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5">

      <p className="text-gray-400">
        {title}
      </p>

      <h1
        className={`text-3xl font-bold ${color}`}
      >
        {value}
      </h1>

    </div>
  );
};

export default AnalyticsCard;
