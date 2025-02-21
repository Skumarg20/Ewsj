'use client'
import { useRouter } from "next/navigation";
// import getTimeTable from '@/state/store/timetablestore'
import useStudyPlanStore from "@/state/store/timetablestore";
import { useLoading } from "@/app/loader/context/loadingprovider";
const useRedirectToDashboard = () => {
  const router = useRouter();
  const {setLoading}=useLoading();
  const getTimeTable = useStudyPlanStore((state) => state.getTimeTable);
  const redirectToDashboard = async () => {  
     
    router.push("/dashboard"); 
    await getTimeTable(setLoading);
  };

  return redirectToDashboard;
};

export default useRedirectToDashboard;
