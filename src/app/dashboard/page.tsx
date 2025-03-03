
'use client';
import React, { useEffect } from 'react'
import Dashboard from '../screen/dashboard'
import withAuth from '@/lib/withAuth'
import useStudyPlanStore from '@/state/store/timetablestore';
import {useLoading} from '@/app/loader/context/loadingprovider'


function DashboardPage() {
  const {getTimeTable} =useStudyPlanStore();
  const {setLoading}=useLoading();

  useEffect(() => {
    getTimeTable(setLoading); 
  });
  return (
    <>
    <Dashboard/>
    </>
    
  )
}
export default withAuth(DashboardPage);