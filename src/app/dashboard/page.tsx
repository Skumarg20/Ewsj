'use client';
import RightDashboard from "@/app/components/RightDashboard";
import withAuth from "@/lib/withAuth";
import { useTargetStudyPlanStore, useWeeklyStudyPlanStore } from "@/state/store/studyplanstore";
import useStudyPlanStore from '@/state/store/timetablestore';
import { useEffect, useState } from 'react';

function DashboardPage() {
  const { getTimeTable } = useStudyPlanStore();
  const { getWeeklyPlan } = useWeeklyStudyPlanStore();
  const { getTargetPlan } = useTargetStudyPlanStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTimeTable(setLoading);
    getWeeklyPlan();
    getTargetPlan();
  }, [getTimeTable, getWeeklyPlan, getTargetPlan]);

  if (loading) return <div>Loading...</div>;
  return <RightDashboard />;
}

export default withAuth(DashboardPage);