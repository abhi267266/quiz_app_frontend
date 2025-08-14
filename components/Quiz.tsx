'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useQuizStore } from '@/lib/store'
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react'

// Mock questions structure - you'll replace this with your actual data
const mockQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Cu"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "Which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3
  },
  {
    id: 8,
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What is the main component of the sun?",
    options: ["Liquid lava", "Molten iron", "Hot gases", "Solid rock"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "South Africa", "Australia", "India"],
    correctAnswer: 2
  }
]

interface QuizProps {
  onBackToDashboard: () => void
}

export default function Quiz({ onBackToDashboard }: QuizProps) {
  const { selectedSubject, selectedExam, resetSelections } = useQuizStore()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(10).fill(-1))
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitQuiz()
    }
  }, [timeLeft, isSubmitted])

  const handleAnswerSelect = (answerIndex: number) => {
    if (!isSubmitted) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = answerIndex
      setAnswers(newAnswers)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    if (isSubmitted) return
    
    let correctCount = 0
    answers.forEach((answer, index) => {
      if (answer === mockQuestions[index].correctAnswer) {
        correctCount++
      }
    })
    
    setScore(correctCount)
    setIsSubmitted(true)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getQuestionStatus = (questionIndex: number) => {
    if (answers[questionIndex] === -1) return 'unanswered'
    if (isSubmitted) {
      return answers[questionIndex] === mockQuestions[questionIndex].correctAnswer ? 'correct' : 'incorrect'
    }
    return 'answered'
  }

  const handleBackToDashboard = () => {
    resetSelections()
    setIsSubmitted(false)
    setCurrentQuestion(0)
    setAnswers(new Array(10).fill(-1))
    setTimeLeft(30 * 60)
    setScore(0)
    onBackToDashboard()
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#111827]">
              Quiz Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-bold text-[#10B981]">
              {score}/10
            </div>
            <p className="text-lg text-gray-600">
              You scored {score} out of 10 questions correctly!
            </p>
            <div className="space-y-3">
              <Button 
                onClick={handleBackToDashboard}
                className="w-full bg-[#3B82F6] hover:bg-[#2563EB]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">QuizMaster</h1>
              <p className="text-gray-600">
                {selectedSubject} • {selectedExam}
              </p>
            </div>
            
            {/* Timer */}
            <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-red-500" />
              <span className={`text-lg font-mono font-bold ${
                timeLeft < 300 ? 'text-red-600' : 'text-red-500'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">
              {answers.filter(answer => answer !== -1).length}/10 answered
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#3B82F6] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(answers.filter(answer => answer !== -1).length / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 10 }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  currentQuestion === index
                    ? 'bg-[#3B82F6] text-white shadow-md'
                    : getQuestionStatus(index) === 'unanswered'
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : getQuestionStatus(index) === 'correct'
                    ? 'bg-[#10B981] text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of 10
              </span>
              <span className="text-sm text-gray-500">
                {answers[currentQuestion] !== -1 ? 'Answered' : 'Unanswered'}
              </span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Question */}
            <div>
              <h2 className="text-xl font-semibold text-[#111827] leading-relaxed">
                {mockQuestions[currentQuestion].question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {mockQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isSubmitted}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    answers[currentQuestion] === index
                      ? 'border-[#3B82F6] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${
                    isSubmitted && index === mockQuestions[currentQuestion].correctAnswer
                      ? 'border-[#10B981] bg-green-50'
                      : isSubmitted && answers[currentQuestion] === index && index !== mockQuestions[currentQuestion].correctAnswer
                      ? 'border-red-500 bg-red-50'
                      : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === index
                        ? 'border-[#3B82F6] bg-[#3B82F6]'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQuestion] === index && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-[#111827] font-medium">
                      {String.fromCharCode(65 + index)}. {option}
                </span>
                  </div>
                  
                  {/* Show correct/incorrect indicators */}
                  {isSubmitted && (
                    <div className="mt-2 flex items-center space-x-2">
                      {index === mockQuestions[currentQuestion].correctAnswer ? (
                        <CheckCircle className="w-5 h-5 text-[#10B981]" />
                      ) : answers[currentQuestion] === index ? (
                        <XCircle className="w-5 h-5 text-red-500" />
                      ) : null}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentQuestion === 9 ? (
                <Button
                  onClick={handleSubmitQuiz}
                  disabled={answers.includes(-1)}
                  className="bg-[#10B981] hover:bg-[#059669] px-8"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-[#3B82F6] hover:bg-[#2563EB] px-8"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
