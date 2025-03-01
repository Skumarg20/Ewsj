
'use client';
import React, { useEffect } from 'react'
import Dashboard from '../screen/dashboard'
import withAuth from '@/lib/withAuth'
import useStudyPlanStore from '@/state/store/timetablestore';
import {useLoading} from '@/app/loader/context/loadingprovider'
type Props = {}

function DashboardPage({}: Props) {
  const {getTimeTable} =useStudyPlanStore();
  const {setLoading}=useLoading();

  useEffect(() => {
    getTimeTable(setLoading); 
  }, []);
  return (
    <div className='min-h-screen bg-white'>
    <Dashboard/>
    </div>
    
  )
}
export default withAuth(DashboardPage);