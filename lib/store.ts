import { create } from 'zustand'

// Define the types for our quiz state
export interface QuizState {
  selectedSubject: string
  selectedExam: string
  setSelectedSubject: (subject: string) => void
  setSelectedExam: (exam: string) => void
  resetSelections: () => void
}

// Create the Zustand store
export const useQuizStore = create<QuizState>((set) => ({
  // Initial state
  selectedSubject: '',
  selectedExam: '',
  
  // Actions
  setSelectedSubject: (subject: string) => set({ selectedSubject: subject }),
  setSelectedExam: (exam: string) => set({ selectedExam: exam }),
  resetSelections: () => set({ selectedSubject: '', selectedExam: '' }),
}))

// Export the store hook for use in components
export default useQuizStore
