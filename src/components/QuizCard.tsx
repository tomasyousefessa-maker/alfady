/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, ArrowLeft, BookOpen, Sparkles, Award } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
  onNextQuestion: () => void;
  score: number;
  correctCount: number;
  wrongCount: number;
  isLastQuestion: boolean;
}

const OPTION_LETTERS = ['أ', 'ب', 'ج', 'د'];

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNextQuestion,
  score,
  correctCount,
  wrongCount,
  isLastQuestion,
}) => {
  const isAnswered = selectedOption !== null;
  const isCorrect = isAnswered && selectedOption === question.correctIndex;

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    sound.playBeadClick();

    if (idx === question.correctIndex) {
      sound.playCorrect();
      try {
        confetti({
          particleCount: 28,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
          disableForReducedMotion: true,
        });
      } catch {
        // ignore
      }
    } else {
      sound.playWrong();
    }

    onSelectOption(idx);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Score and Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xs border border-amber-900/10 rounded-xl px-4 py-3 flex items-center justify-between text-xs sm:text-sm shadow-2xs"
      >
        <div className="flex items-center gap-1.5 font-bold text-amber-950">
          <Award className="w-4 h-4 text-amber-600" />
          <span>النقاط:</span>
          <span className="text-amber-700 font-extrabold text-base">{score}</span>
          <span className="text-[11px] text-stone-400 font-normal">(+10 لكل إجابة)</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 font-semibold">
          <div className="flex items-center gap-1 text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>صحيحة: {correctCount}</span>
          </div>
          <div className="flex items-center gap-1 text-rose-700">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>خاطئة: {wrongCount}</span>
          </div>
        </div>
      </motion.div>

      {/* Main Question Card with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: -20, scale: 0.99 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.99 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-5 sm:p-7 relative overflow-hidden"
        >
          {/* Subtle decorative watermark */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-amber-50 rounded-br-full -z-0 opacity-40 pointer-events-none"></div>

          {/* Question Header & Category */}
          <div className="flex items-center justify-between gap-2 mb-4 relative z-10 text-xs font-medium text-stone-500">
            <div className="flex items-center gap-2">
              <span className="text-amber-900 font-bold bg-amber-50 border border-amber-200/70 px-2.5 py-1 rounded-md text-xs">
                {question.categoryName}
              </span>
              <span className="text-stone-300">·</span>
              <span>السؤال {currentIndex + 1} من {totalQuestions}</span>
            </div>
            <span className="text-[11px] text-stone-400">10 نقاط</span>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-2xl font-bold text-stone-900 leading-relaxed mb-6 relative z-10 font-['Cairo',sans-serif]">
            {question.question}
          </h2>

          {/* 4 Choices */}
          <div className="space-y-3 relative z-10" role="radiogroup" aria-label="خيارات الإجابة">
            {question.options.map((optionText, idx) => {
              let optionStyles = 'border-stone-200 bg-stone-50/60 text-stone-800';
              let badgeStyles = 'bg-stone-200 text-stone-700';

              if (isAnswered) {
                if (idx === question.correctIndex) {
                  optionStyles = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold ring-2 ring-emerald-400/30';
                  badgeStyles = 'bg-emerald-600 text-white';
                } else if (idx === selectedOption) {
                  optionStyles = 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400/20';
                  badgeStyles = 'bg-rose-600 text-white';
                } else {
                  optionStyles = 'border-stone-200 bg-stone-100/50 text-stone-400 opacity-60';
                  badgeStyles = 'bg-stone-200 text-stone-400';
                }
              }

              return (
                <motion.button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(idx)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  whileHover={!isAnswered ? { scale: 1.012, x: -2 } : {}}
                  whileTap={!isAnswered ? { scale: 0.985 } : {}}
                  className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-right transition-colors duration-200 cursor-pointer ${
                    isAnswered ? 'cursor-default' : ''
                  } ${optionStyles}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-bold shrink-0 transition-colors ${badgeStyles}`}
                    >
                      {OPTION_LETTERS[idx]}
                    </span>
                    <span className="text-sm sm:text-base font-medium leading-snug">
                      {optionText}
                    </span>
                  </div>

                  {/* Status indicator on answer */}
                  {isAnswered && (
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="shrink-0 mr-2"
                    >
                      {idx === question.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      )}
                      {idx === selectedOption && idx !== question.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Immediate Result Feedback Banner */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 16, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="mt-6 pt-5 border-t border-stone-100 relative z-10"
              >
                {isCorrect ? (
                  <motion.div
                    initial={{ scale: 0.97 }}
                    animate={{ scale: 1 }}
                    className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 text-emerald-950 mb-5"
                  >
                    <div className="flex items-center gap-2 font-bold text-base sm:text-lg text-emerald-800 mb-1.5">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span>إجابة صحيحة، أحسنت! (+10 نقاط)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
                      {question.explanation}
                    </p>
                    {question.reference && (
                      <div className="mt-2 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>الشاهد / المرجع: {question.reference}</span>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.97 }}
                    animate={{ scale: 1 }}
                    className="bg-rose-50/80 border border-rose-200 rounded-xl p-4 text-rose-950 mb-5"
                  >
                    <div className="flex items-center gap-2 font-bold text-base sm:text-lg text-rose-800 mb-1.5">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>إجابة غير صحيحة، حاول مرة أخرى</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-800 mb-2 font-semibold">
                      الإجابة الصحيحة هي:{' '}
                      <span className="text-emerald-800 font-bold underline">
                        {question.options[question.correctIndex]}
                      </span>
                    </p>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {question.explanation}
                    </p>
                    {question.reference && (
                      <div className="mt-2 text-[11px] text-amber-900 font-semibold flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>الشاهد / المرجع: {question.reference}</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Next Question / Finish Button */}
                <div className="flex items-center justify-end">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      sound.playBeadClick();
                      onNextQuestion();
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all cursor-pointer group"
                  >
                    <span>{isLastQuestion ? 'عرض النتيجة النهائية' : 'السؤال التالي'}</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
