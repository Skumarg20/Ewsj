import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import { getAuthHeader } from "../../lib/api";
import {
  WeeklyStudyPlan,
  StudyPlanUsingGetApi,
  targetedStudyPlan,
} from "@/interface/studyPlan";
interface WeeklyStudyPlanState {
  StudyPlanUsingGetApi: StudyPlanUsingGetApi | null;
  weeklyPlan: WeeklyStudyPlan | null;
  loading: boolean;
  error: string | null;
  getWeeklyPlan: () => Promise<void>;
  postWeeklyPlan: (plan: WeeklyStudyPlan) => Promise<void>;
}
interface TargetStudyPlanState {
  studyPlanUsingGetApi: StudyPlanUsingGetApi | null;
  targetPlan: targetedStudyPlan | null;
  targetloading: boolean;
  targeterror: string | null;
  getTargetPlan: () => Promise<void>;
  postTargetPlan: (plan: targetedStudyPlan) => Promise<void>;
}

export const useWeeklyStudyPlanStore = create<WeeklyStudyPlanState>((set) => ({
  weeklyPlan: null,
  loading: false,
  error: null,
  StudyPlanUsingGetApi: null,

  getWeeklyPlan: async () => {
    set({ loading: true, error: null });
    try {
      const response: AxiosResponse<StudyPlanUsingGetApi> = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/study-plan/weekly-plan`,
        {
          headers: {
            ...getAuthHeader(),
          },
        }
      );
      const weeklyData = response.data?.weeklyData || null;
      set({ weeklyPlan: weeklyData, loading: false });
    } catch (error) {
      console.log(error, "this is error");
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch weekly plan",
        loading: false,
      });
    }
  },

  postWeeklyPlan: async (plan: WeeklyStudyPlan) => {
    set({ loading: true, error: null });
    try {
      const response: AxiosResponse<WeeklyStudyPlan> = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/study-plan/weekly-plan`,
        plan,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
        }
      );
      console.log(response.data, "this is data is comming after saving");

      set({ weeklyPlan: response.data, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to save weekly plan",
        loading: false,
      });
    }
  },
}));

export const useTargetStudyPlanStore = create<TargetStudyPlanState>((set) => ({
  targetPlan: null,
  targetloading: false,
  targeterror: null,
  studyPlanUsingGetApi: null,

  getTargetPlan: async () => {
    set({ targetloading: true, targeterror: null });
    try {
      const response: AxiosResponse<{ targetData: targetedStudyPlan }> =
        await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/study-plan/target-plan`,
          {
            headers: {
              ...getAuthHeader(),
            },
          }
        );
      const targetData = response.data?.targetData || null;
      console.log(response.data, "this is response data");
      console.log(targetData, "this is target data");
      set({ targetPlan: targetData, targetloading: false });
    } catch (error) {
      console.error("Error fetching target plan:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Failed to fetch target plan";
      set({
        targeterror: errorMessage,
        targetloading: false,
      });
    }
  },

  postTargetPlan: async (plan: targetedStudyPlan) => {
    set({ targetloading: true, targeterror: null });
    try {
      const response: AxiosResponse<targetedStudyPlan> = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/study-plan/target-plan`,
        plan,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
        }
      );
      console.log(response.data, "this is data is comming after saving");

      set({ targetPlan: response.data, targetloading: false });
    } catch (error) {
      set({
        targeterror:
          error instanceof Error ? error.message : "Failed to save target plan",
        targetloading: false,
      });
    }
  },
}));
