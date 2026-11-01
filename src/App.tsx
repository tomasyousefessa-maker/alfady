/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_QUESTIONS } from './data/questions';
import { CategoryId, Question, AnswerRecord, ScreenState } from './types';
import { sound } from './utils/sound';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RosaryTrack } from './components/RosaryTrack';
import { QuizCard } from './components/QuizCard';
import { HomeScreen } from './components/HomeScreen';
import { CategoryPicker } from './components/CategoryPicker';
import { ResultModal } from './components/ResultModal';
import { QuestionReviewModal } from './components/QuestionReviewModal';
import { InfoModal } from './components/InfoModal';

// Fisher-Yates array shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Prepare question with shuffled choices and updated correctIndex
function prepareQuestion(q: Question): Question {
  const correctOptionText = q.options[q.correctIndex];
  const shuffledOptions = shuffleArray(q.options) as [string, string, string, string];
  const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);
  return {
    ...q,
    options: shuffledOptions,
    correctIndex: newCorrectIndex,
  };
}

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Rosary answers track: true = correct, false = wrong, null = unreached
  const [answersStatus, setAnswersStatus] = useState<(boolean | null)[]>([]);
  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);

  // Scores
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);

  // Mute state
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  // Start new round
  const startQuiz = useCallback(
    (catId = selectedCategory, count = questionCount) => {
      let pool = ALL_QUESTIONS;
      if (catId !== 'all') {
        pool = ALL_QUESTIONS.filter((q) => q.category === catId);
      }

      // If pool is smaller than requested count, use all in pool
      const targetCount = Math.min(count, pool.length);
      const chosenQuestions = shuffleArray(pool)
        .slice(0, targetCount)
        .map(prepareQuestion);

      setActiveQuestions(chosenQuestions);
      setCurrentIndex(0);
      setSelectedOption(null);
      setAnswersStatus(new Array(chosenQuestions.length).fill(null));
      setAnswerRecords([]);
      setScore(0);
      setCorrectCount(0);
      setWrongCount(0);
      setScreen('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [selectedCategory, questionCount]
  );

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null || !activeQuestions[currentIndex]) return;
    const currentQ = activeQuestions[currentIndex];
    const isCorrect = idx === currentQ.correctIndex;

    setSelectedOption(idx);

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }

    // Update rosary beads
    setAnswersStatus((prev) => {
      const next = [...prev];
      next[currentIndex] = isCorrect;
      return next;
    });

    // Record for review
    setAnswerRecords((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        question: currentQ.question,
        options: currentQ.options,
        selectedIndex: idx,
        correctIndex: currentQ.correctIndex,
        isCorrect,
        explanation: currentQ.explanation,
        reference: currentQ.reference,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Quiz completed!
      setScreen('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentQuestion = activeQuestions[currentIndex];
  const isLastQuestion = currentIndex + 1 >= activeQuestions.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf6] text-stone-900 selection:bg-amber-200 selection:text-amber-950 font-['Cairo',sans-serif]">
      {/* Background ecclesiastical motifs */}
      <div className="fixed inset-0 pointer-events-none opacity-20 -z-10 bg-[radial-gradient(#d97706_0.75px,transparent_0.75px)] [background-size:24px_24px]"></div>

      {/* Persistent Header */}
      <Header
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onGoHome={() => setScreen('home')}
        onOpenCategories={() => setScreen('categories')}
        onRestartQuiz={() => startQuiz()}
        onOpenInfo={() => setIsInfoOpen(true)}
        isQuizActive={screen === 'quiz'}
      />

      {/* Main App Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col justify-start">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              <HomeScreen
                onStartGame={() => startQuiz('all', 10)}
                onExploreCategories={() => setScreen('categories')}
                totalQuestionsCount={ALL_QUESTIONS.length}
              />
            </motion.div>
          )}

          {screen === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              <CategoryPicker
                selectedCategory={selectedCategory}
                onSelectCategory={(id) => setSelectedCategory(id)}
                questionCount={questionCount}
                onChangeQuestionCount={(num) => setQuestionCount(num)}
                onStartQuiz={() => startQuiz()}
              />
            </motion.div>
          )}

          {screen === 'quiz' && currentQuestion && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="space-y-5"
            >
              {/* Interactive Rosary Track */}
              <RosaryTrack
                total={activeQuestions.length}
                currentIndex={currentIndex}
                answers={answersStatus}
              />

              {/* Quiz Card */}
              <QuizCard
                question={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={activeQuestions.length}
                selectedOption={selectedOption}
                onSelectOption={handleSelectOption}
                onNextQuestion={handleNextQuestion}
                score={score}
                correctCount={correctCount}
                wrongCount={wrongCount}
                isLastQuestion={isLastQuestion}
              />
            </motion.div>
          )}

          {screen === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
            >
              <ResultModal
                score={score}
                totalQuestions={activeQuestions.length}
                correctCount={correctCount}
                wrongCount={wrongCount}
                onPlayAgain={() => startQuiz()}
                onReviewAnswers={() => setScreen('review')}
                onChooseCategory={() => setScreen('categories')}
              />
            </motion.div>
          )}

          {screen === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <QuestionReviewModal
                answers={answerRecords}
                onBack={() => setScreen('result')}
                onPlayAgain={() => startQuiz()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Info / About Modal */}
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />

      {/* Persistent Footer on all pages */}
      <Footer />
    </div>
  );
}
