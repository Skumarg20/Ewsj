'use client'
import RightDashboard from "@/app/components/RightDashboard";
import withAuth from "@/lib/withAuth";

function DashboardPage() {
  return <RightDashboard />;
}
export default withAuth(DashboardPage);