import withAuth from "@/lib/withAuth";
import dynamic from "next/dynamic";
const SoloStudy = dynamic(() => import("./solostudy"), { ssr: false });

const DashboardPage = () => {
  return (
    <div>
      <SoloStudy /> 
    </div>
  );
};

export default withAuth(DashboardPage);