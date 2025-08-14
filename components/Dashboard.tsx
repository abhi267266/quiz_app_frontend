'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useQuizStore } from '@/lib/store'
import Quiz from './Quiz'

// Sample data for subjects and exams
const subjects = [
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
  { value: 'history', label: 'History' },
  { value: 'geography', label: 'Geography' },
  { value: 'english', label: 'English' },
  { value: 'computer-science', label: 'Computer Science' },
]

const exams = [
  { value: 'ssc', label: 'SSC' },
  { value: 'upsc', label: 'UPSC' },
  { value: 'jee', label: 'JEE' },
  { value: 'neet', label: 'NEET' },
  { value: 'cat', label: 'CAT' },
  { value: 'gate', label: 'GATE' },
]

export default function Dashboard() {
  const { selectedSubject, selectedExam, setSelectedSubject, setSelectedExam } = useQuizStore()
  const [showQuiz, setShowQuiz] = useState(false)

  const handleStartQuiz = () => {
    if (selectedSubject && selectedExam) {
      setShowQuiz(true)
    } else {
      alert('Please select both subject and exam before starting the quiz.')
    }
  }

  const handleBackToDashboard = () => {
    setShowQuiz(false)
  }

  const isQuizReady = selectedSubject && selectedExam

  // Show Quiz component if quiz is started
  if (showQuiz) {
    return <Quiz onBackToDashboard={handleBackToDashboard} />
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <h1 className="text-3xl font-bold text-[#111827]">
              QuizMaster
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-[#111827]">
                Ready to Test Your Knowledge?
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Subject Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#111827]">
                  Select Subject
                </label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Exam Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#111827]">
                  Select Exam
                </label>
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose an exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map((exam) => (
                      <SelectItem key={exam.value} value={exam.value}>
                        {exam.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Start Quiz Button */}
              <div className="pt-4">
                <Button
                  onClick={handleStartQuiz}
                  disabled={!isQuizReady}
                  className={`w-full h-12 text-lg font-semibold transition-all duration-200 ${
                    isQuizReady
                      ? 'bg-[#3B82F6] hover:bg-[#2563EB] hover:shadow-lg transform hover:scale-[1.02]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isQuizReady ? 'Start Quiz' : 'Select Subject & Exam'}
                </Button>
              </div>

              {/* Status Indicator */}
              {isQuizReady && (
                <div className="flex items-center justify-center space-x-2 text-sm text-[#10B981]">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                  <span>Ready to start your {selectedSubject} quiz!</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
