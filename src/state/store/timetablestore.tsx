import { create } from "zustand";
import axios, { AxiosError } from "axios"; // Import AxiosError
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
      const response = await axios.post("http://localhost:5000/timetables", generatedTimeTable, {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        console.log("Study plan saved successfully:", response.data);
        set({ studyPlan: response.data });
        return response.data;
      }
    } catch (error) {
      const axiosError = error as AxiosError; // Type the error as AxiosError
      console.error("Error saving study plan:", axiosError.response?.data || axiosError.message);
    } finally {
      setLoading(false);
    }
  },

  getTimeTable: async (setLoading) => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/timetables/currenttimetable", {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        console.log("you are getting data successfully", response.data);
        set({ currentStudyPlan: response.data });
      }
    } catch (error) {
      const axiosError = error as AxiosError; // Type the error as AxiosError
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

      const response = await axios.patch(
        `http://localhost:5000/timetables/session/${sessionId}`,
        updatedSession,
        {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        console.log("Session updated successfully:", response.data);
        set({ currentStudyPlan: { ...currentStudyPlan, schedule: updatedSchedule } });
      }
    } catch (error) {
      const axiosError = error as AxiosError; // Type the error as AxiosError
      console.error("Error updating session:", axiosError.response?.data || axiosError.message);
    } finally {
      setLoading(false);
    }
  },
}));

export default useStudyPlanStore;