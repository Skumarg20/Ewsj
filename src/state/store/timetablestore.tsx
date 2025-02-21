import { create } from "zustand";
import axios from "axios";
import {getAuthHeader} from '../../lib/api'
import { StudyPlanInterface,StudySession } from "@/interface/studysession";



interface StudyPlanState {
  formData: StudyPlanInterface | null;
  studyPlan: StudyPlanInterface | null;
  finalTimeTable: StudyPlanInterface | null;
  currentStudyPlan: StudyPlanInterface | null;
  setFormData: (data: StudyPlanInterface | null) => void;
  fetchStudyPlan: (data: StudyPlanInterface | null, setLoading: (loading: boolean) => void,) => Promise<void>;
  saveStudyPlan: (setLoading: (loading: boolean) => void) => Promise<void>;
  getTimeTable:(setLoading:(loading:boolean)=>void)=>Promise<void>;
  updateSession: (sessionId: string, updatedData: Partial<StudySession>, setLoading: (loading: boolean) => void) => Promise<void>;
}

const useStudyPlanStore = create<StudyPlanState>((set, get) => ({
  formData: null,
  studyPlan: null,
  finalTimeTable: null,
  currentStudyPlan:null,
  
  setFormData: (data) => set({ formData: data }),
 
  fetchStudyPlan: async (formData, setLoading) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/timetables/generatetimetable", formData, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(), 
        },
      });

      if (response.data) {
        set({ studyPlan: response.data.data });
        console.log(response.data.data,"this is response comming");
      }
    } catch (error) {
      console.error("Error fetching study plan:", error);
    } finally {
      setLoading(false);
    }
  },
 
  saveStudyPlan: async (setLoading) => {
    const { studyPlan } = get();
    if (!studyPlan) {
      console.error("No study plan available to save!");
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/timetables", JSON.stringify(studyPlan), {
        headers: {
          ...getAuthHeader(), 
          "Content-Type": "application/json",
        },
      });
  
      if (response.data) {
        console.log("Study plan saved successfully:", response.data);
        set({ studyPlan: response.data });
        return true;
      }
    } catch (error) {
      console.error("Error saving study plan:", error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  },
  getTimeTable:async (setLoading)=>{
    try {
      setLoading(true);
      const response=await axios.get('http://localhost:5000/timetables/currenttimetable',{
        headers: {
          ...getAuthHeader(), 
          "Content-Type": "application/json",
        },

      });
      if(response.data){
        console.log("you are getting data succesfully",response.data);
        set({ currentStudyPlan: response.data });
      }
    } catch (error) {
      console.error("error getting data",error)
    } finally{
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

      const sessionIndex = currentStudyPlan.schedule.findIndex(session => session?.id === sessionId);
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
        // Update the currentStudyPlan state after the update
        set({ currentStudyPlan: { ...currentStudyPlan, schedule: updatedSchedule } });
      }
    } catch (error) {
      console.error("Error updating session:", error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  },
}));

export default useStudyPlanStore;
