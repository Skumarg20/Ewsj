"use client";
import * as React from "react";
import { extendTheme } from "@mui/material/styles";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaNotesMedical } from "react-icons/fa6";
import { MdOutlineMoreTime, MdGroups2 } from "react-icons/md";
import { GrNodes } from "react-icons/gr";
import { AppProvider, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Profile from "../utils/Profile";
import RightDashboard from "../components/RightDashboard";
import TimeTable from "@/app/timetable/index";
import StudyPlan from "../studyplan/page";
import Clusters from "../talksphere/clusters";
import Notes from "@/app/notes/page"
import TimerModal from '@/app/components/TimeModel/index'
const NAVIGATION = [
  { kind: "header", title: "Sanjeev Kumar" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "studyplan", title: "Study Plan", icon: <AiOutlineSchedule /> },
  { segment: "timetable", title: "Time Table", icon: <MdOutlineMoreTime /> },
  { segment: "notes", title: "Notes", icon: <FaNotesMedical /> },
  { kind: "divider" },
  { kind: "header", title: "TalkSphere" },
  {
    segment: "group",
    title: "Clusters",
    icon: <MdGroups2 />,
    children: [
      { segment: "hbhsales", title: "Sales", icon: <DescriptionIcon />, groupId: "sal8777es" },
      { segment: "traf98fic", title: "Traffic", icon: <DescriptionIcon />, groupId: "traff38587ic" },
    ],
  },
  { segment: "peers", title: "Peers", icon: <GrNodes /> },
];


const demoTheme = extendTheme({
  colorSchemes: { light: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});


function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  return React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    }),
    [pathname]
  );
}



// 📌 DYNAMIC PAGE CONTENT (NOW HANDLES `/group/:groupId`)
function PageContent({ pathname }: { pathname: string }) {
  console.log(pathname);

  const isGroupPage = pathname.startsWith("/group/");
  console.log(isGroupPage);

  const groupId = isGroupPage ? pathname.split("/")[2] : null;
  console.log(groupId);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {pathname === "/dashboard" && <RightDashboard />}
      {pathname === "/studyplan" && <StudyPlan />}
      {pathname === "/timetable" && <TimeTable />}
      {pathname === "/group" && <Clusters />}
      {pathname==="/notes" && <Notes />}
      {isGroupPage && (
        <Typography variant="h4" sx={{ mt: 2, textAlign: "center" }}>
          Viewing Group: <b>{groupId}</b>
          <h1>hello</h1>
        </Typography>
      )}
    </Box>
  );
}
// function StopWatch(){
//   return <>
//   <Stopwatch/>
//   </>
// }

export default function Dashboard(props: any) {
  const { window } = props;
  const router = useDemoRouter("/dashboard");
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "Ewsj",
        homeUrl: "/dashboard",
      }}
      router={router}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: ()=><TimerModal/>,
          sidebarFooter: () => (
            <Profile
              user={{
                name: "John Doe",
                email: "john.doe@example.com",
                avatarUrl: "https://www.example.com/avatar.jpg",
              }}
            />
          ),
        }}
      >
       
        <PageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

