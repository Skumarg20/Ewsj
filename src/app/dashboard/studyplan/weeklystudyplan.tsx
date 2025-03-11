import { motion } from 'framer-motion';
import { FaBook, FaRunning, FaClock, FaSchool, FaCalendarAlt } from 'react-icons/fa';
import { WeeklyStudyPlan } from '@/interface/studyPlan';
type Props={
    data:WeeklyStudyPlan;
}
const WeeklyStudyDashboard = ({ data}:Props) => {
  const { dailyPlan, dailyHours, subjects, chapters, schoolSchedule } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-4 mb-4 shadow-xl"
      >
        <div className="flex items-center gap-4">
          <FaCalendarAlt className="w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold">Weekly Study Plan</h1>
            <p className="mt-2 opacity-90">&quot;Success is the sum of small efforts, repeated day in and day out.&quot;</p>
          </div>
        </div>
      </motion.header>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaClock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Daily Hours</h3>
              <p className="text-2xl font-bold">{dailyHours} hours</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaBook className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">Subjects</h3>
              <p className="text-2xl font-bold">{subjects.join(', ')}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
  variants={itemVariants}
  className="bg-white p-4 sm:p-6 rounded-xl shadow-lg" // Reduced padding on mobile
>
  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"> {/* Stack on mobile, row on larger screens */}
    <div className="p-2 sm:p-3 bg-green-100 rounded-lg flex-shrink-0"> {/* Smaller padding on mobile */}
      <FaRunning className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" /> {/* Smaller icon on mobile */}
    </div>
    <div className="w-full"> {/* Full width for flexibility */}
      <h3 className="text-gray-500 text-xs sm:text-sm">Chapters</h3> {/* Smaller text on mobile */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mt-1"> {/* Wrap tags on mobile, smaller gap */}
        {chapters.map((chapter) => (
          <span
            key={chapter}
            className="bg-green-100 text-green-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm" // Smaller tags on mobile
          >
            {chapter}
          </span>
        ))}
      </div>
    </div>
  </div>
</motion.div>

        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FaSchool className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm">School Schedule</h3>
              <p className="text-lg font-semibold">{schoolSchedule}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Daily Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dailyPlan.map((plan, index) => {
          const [dayPart, ...activities] = plan.split(' - ');
          const [day, time] = dayPart.split(': ');
         
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <span className="text-blue-600 font-bold">{day.split(' ')[1]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{day}</h3>
                  <p className="text-sm text-gray-500">{time}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {activities.map((activity, i) => {
                  const [task, duration] = activity.split(' (');
                  const times = duration ? duration.replace(')', '') : 'N/A';
                  return (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{task}</span>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {times}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-600">
        <div className="flex items-center justify-center gap-2">
          <FaRunning className="w-5 h-5 text-purple-600" />
          <p>Stay consistent! You&apos;ve got this! 💪</p>
        </div>
      </footer>
    </div>
  );
};

export default WeeklyStudyDashboard;