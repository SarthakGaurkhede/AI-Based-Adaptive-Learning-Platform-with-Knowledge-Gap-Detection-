import TeacherLayout from "../../components/layouts/TeacherLayout";
import AnalyticsCard from "../../components/dashboard/AnalyticsCard";
import ProgressChart from "../../components/dashboard/ProgressChart";

const Dashboard = () => {
  return (
    <TeacherLayout>

      {/* Hero Section */}

      <div className="bg-gradient-to-r from-indigo-700 to-purple-600 rounded-3xl p-6 md:p-10 text-white shadow mb-8">

  <h3 className="uppercase text-xs md:text-sm">
    Welcome Back
  </h3>

  <h1 className="text-3xl md:text-5xl font-bold mt-2">
    Hello, Teacher!
  </h1>

  <p className="mt-4 text-gray-200 text-sm md:text-base">
    Manage courses and track student performance.
  </p>

</div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <AnalyticsCard
          title="Courses"
          value="12"
          color="text-indigo-600"
        />

        <AnalyticsCard
          title="Students"
          value="150"
          color="text-green-600"
        />

        <AnalyticsCard
          title="Quizzes"
          value="35"
          color="text-red-500"
        />

        <AnalyticsCard
          title="Completion"
          value="85%"
          color="text-purple-600"
        />

      </div>

      {/* Chart */}

      <ProgressChart />

    </TeacherLayout>
  );
};

export default Dashboard;