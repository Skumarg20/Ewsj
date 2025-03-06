// src/stores/useStudyPlanStore.ts
import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance"; // Import your custom axios instance
import { AxiosError } from "axios"; // Import AxiosError
import { getAuthHeader } from "../../lib/api";
import { StudyPlanInterface, StudySession } from "@/interface/studysession";

interface StudyPlanState {
  formData: StudyPlanInterface | null;
  studyPlan: StudyPlanInterface | null;
  currentStudyPlan: StudyPlanInterface | null;
  setFormData: (data: StudyPlanInterface | null) => void;
  saveStudyPlan: (
    setLoading: (loading: boolean) => void,
    generatedTimeTable: StudyPlanInterface
  ) => Promise<StudyPlanInterface | void>;
  getTimeTable: (setLoading: (loading: boolean) => void) => Promise<void>;
  updateSession: (
    sessionId: string,
    updatedData: Partial<StudySession>,
    setLoading: (loading: boolean) => void
  ) => Promise<void>;
}

const useStudyPlanStore = create<StudyPlanState>((set, get) => ({
  formData: null,
  studyPlan: null,
  currentStudyPlan: null,

  setFormData: (data) => set({ formData: data }),

  saveStudyPlan: async (setLoading, generatedTimeTable) => {
    if (!generatedTimeTable) {
      console.error("No study plan available to save!");
      return;
    }

    try {
      setLoading(true);
      // Use axiosInstance instead of axios
      const response = await axiosInstance.post("/timetables", generatedTimeTable);

      if (response.data) {
      
        set({ studyPlan: response.data });
        return response.data;
      }
    } catch (error) {
      const axiosError = error as AxiosError; // Type the error as AxiosError
      console.error("Error saving study plan:", axiosError.response?.data || axiosError.message);
      throw axiosError; // Re-throw to let the caller handle it (e.g., show error toast)
    } finally {
      setLoading(false);
    }
  },

  getTimeTable: async (setLoading) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/timetables/currenttimetable", {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
      
        set({ currentStudyPlan: response.data });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("error getting data", axiosError.response?.data || axiosError.message);
    } finally {
      setLoading(false);
    }
  },

  updateSession: async (sessionId, updatedData, setLoading) => {
    try {
      setLoading(true);

      const { currentStudyPlan } = get();
      if (!currentStudyPlan || !currentStudyPlan.schedule) {
        console.error("No current study plan or schedule to update!");
        return;
      }

      const sessionIndex = currentStudyPlan.schedule.findIndex((session) => session?.id === sessionId);
      if (sessionIndex === -1) {
        console.error("Session not found in the schedule!");
        return;
      }

      const updatedSession = {
        ...currentStudyPlan.schedule[sessionIndex],
        ...updatedData,
      };

      const updatedSchedule = [...currentStudyPlan.schedule];
      updatedSchedule[sessionIndex] = updatedSession;

      const response = await axiosInstance.patch(`/timetables/session/${sessionId}`, updatedSession);

      if (response.data) {
       
        set({ currentStudyPlan: { ...currentStudyPlan, schedule: updatedSchedule } });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error updating session:", axiosError.response?.data || axiosError.message);
    } finally {
      setLoading(false);
    }
  },
}));

export default useStudyPlanStore;