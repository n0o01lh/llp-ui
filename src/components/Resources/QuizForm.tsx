import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Edit, PlusCircle, Trash2 } from "lucide-react";

type Question = {
  id: number;
  question: string;
  questionType: string;
  answerSelectionType: string;
  answers: string[];
  correctAnswer: number[];
  explanation: string;
  point: number;
};

export type Quiz = {
  quizTitle: string;
  quizSynopsis: string;
  questions: Question[];
};

interface QuizFormProps {
  setCurrentQuiz: (quiz: Quiz) => void;
  currentQuiz?: Quiz;
}

const QuizForm: React.FC<QuizFormProps> = (props) => {
  const { currentQuiz, setCurrentQuiz } = props;
  const [quiz, setQuiz] = useState<Quiz>({
    quizTitle: "",
    quizSynopsis: "",
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: 0,
    question: "",
    questionType: "text",
    answerSelectionType: "multiple",
    answers: [""],
    correctAnswer: [],
    explanation: "",
    point: 0,
  });
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(
    null
  );

  const addQuestion = () => {
    if (
      currentQuestion.question &&
      currentQuestion.answers.length > 1 &&
      currentQuestion.correctAnswer.length > 0
    ) {
      if (editingQuestionId !== null) {
        setQuiz((prev) => ({
          ...prev,
          questions: prev.questions.map((q) =>
            q.id === editingQuestionId ? currentQuestion : q
          ),
        }));
        setEditingQuestionId(null);
      } else {
        setQuiz((prev) => ({
          ...prev,
          questions: [
            ...prev.questions,
            { ...currentQuestion, id: prev.questions.length },
          ],
        }));
      }
      setCurrentQuestion({
        id: quiz.questions.length + 1,
        question: "",
        questionType: "text",
        answerSelectionType: "multiple",
        answers: [""],
        correctAnswer: [],
        explanation: "",
        point: 0,
      });
    }
  };

  const removeQuestion = (id: number) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }));
  };

  const editQuestion = (id: number) => {
    const questionToEdit = quiz.questions.find((q) => q.id === id);
    if (questionToEdit) {
      setCurrentQuestion(questionToEdit);
      setEditingQuestionId(id);
    }
  };

  const addOption = () => {
    setCurrentQuestion((prev) => ({
      ...prev,
      answers: [...prev.answers, ""],
    }));
  };

  const updateOption = (index: number, value: string) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      answers: prev.answers.map((opt, i) => (i === index ? value : opt)),
    }));
  };

  const toggleCorrectAnswer = (index: number) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      correctAnswer: prev.correctAnswer.includes(index)
        ? prev.correctAnswer.filter((i) => i !== index)
        : [...prev.correctAnswer, index],
    }));
  };

  useEffect(() => {
    setCurrentQuiz(quiz);
  }, [quiz]);

  useEffect(() => {
    if (currentQuiz != undefined) {
      setQuiz(currentQuiz);
    }
  }, []);

  return (
    <div className="flex items-center justify-center dark:bg-gray-900">
      <Card className="w-full">
        <CardContent className="p-5">
          <div className="space-y-4">
            <div>
              <Label htmlFor="quiz-title">Quiz Title</Label>
              <Input
                id="quiz-title"
                value={quiz.quizTitle}
                onChange={(e) =>
                  setQuiz((prev) => ({ ...prev, quizTitle: e.target.value }))
                }
                placeholder="Enter quiz title"
              />
            </div>
            <div>
              <Label htmlFor="quiz-description">Quiz Description</Label>
              <Textarea
                id="quiz-description"
                value={quiz.quizSynopsis}
                onChange={(e) =>
                  setQuiz((prev) => ({ ...prev, quizSynopsis: e.target.value }))
                }
                placeholder="Enter quiz description"
              />
            </div>
            {/*             
                Adding Questions to the Quiz
             */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="question-text">Question</Label>
                  <Input
                    id="question-text"
                    value={currentQuestion.question}
                    onChange={(e) =>
                      setCurrentQuestion((prev) => ({
                        ...prev,
                        question: e.target.value,
                      }))
                    }
                    placeholder="Enter question text"
                  />
                </div>
                <div>
                  <Label htmlFor="question-score">Question Score</Label>
                  <Input
                    id="question-score"
                    type="number"
                    value={currentQuestion.point}
                    onChange={(e) =>
                      setCurrentQuestion((prev) => ({
                        ...prev,
                        point: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="Enter question score"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Options</Label>
                  {currentQuestion.answers.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`option-${index}`}
                        checked={currentQuestion.correctAnswer.includes(index)}
                        onCheckedChange={() => toggleCorrectAnswer(index)}
                      />
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                      />
                    </div>
                  ))}
                  <Button onClick={addOption} variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Option
                  </Button>
                </div>
              </div>
              <Button onClick={addQuestion} className="w-full">
                {editingQuestionId !== null
                  ? "Update Question"
                  : "Add Question"}
              </Button>
              <div className="space-y-2">
                <Label>Added Questions</Label>
                {quiz.questions.map((q, index) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded"
                  >
                    <span>
                      {index + 1}. {q.question}
                    </span>
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editQuestion(q.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(q.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizForm;
