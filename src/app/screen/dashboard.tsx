"use client";
import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Box, Typography } from "@mui/material";
import { ClockIcon } from "@heroicons/react/20/solid";
import Profile from "../utils/Profile";
import RightDashboard from "../components/RightDashboard";
import TimeTable from "@/app/timetable/index"; // Import your TimeTable component
import StudyPlan from "../studyplan";

const NAVIGATION: Navigation = [
  { kind: "header", title: "Sanjeev Kumar" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "studyplan", title: "Study Plan", icon: <ClockIcon /> },
  { segment: "timetable", title: "Time Table", icon: <ClockIcon /> },
  { kind: "divider" },
  { kind: "header", title: "Analytics" },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      { segment: "sales", title: "Sales", icon: <DescriptionIcon /> },
      { segment: "traffic", title: "Traffic", icon: <DescriptionIcon /> },
    ],
  },
  { segment: "integrations", title: "Integrations", icon: <LayersIcon /> },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

// Custom hook to manage navigation
function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  return React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path: string | URL) => setPathname(String(path)),
  }), [pathname]);
}

// Function to dynamically render content
function PageContent({ pathname }: { pathname: string }) {
  console.log(pathname);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {pathname === "/dashboard" && <RightDashboard />}
      {pathname==="/studyplan" && <StudyPlan/>}
      {pathname === "/timetable" && <TimeTable />}
    </Box>
  );
}

export default function Dashboard(props: any) {
  const { window } = props;
  const router = useDemoRouter("dashboard");
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
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
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
