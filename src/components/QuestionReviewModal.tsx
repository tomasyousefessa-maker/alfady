/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { AnswerRecord } from '../types';
import { CheckCircle2, XCircle, ArrowRight, BookOpen } from 'lucide-react';

interface QuestionReviewModalProps {
  answers: AnswerRecord[];
  onBack: () => void;
  onPlayAgain: () => void;
}

const OPTION_LETTERS = ['أ', 'ب', 'ج', 'د'];

export const QuestionReviewModal: React.FC<QuestionReviewModalProps> = ({
  answers,
  onBack,
  onPlayAgain,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 hover:text-amber-900 cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لصفحة النتيجة</span>
        </button>

        <span className="text-xs text-stone-500 font-medium">
          مراجعة {answers.length} سؤالاً
        </span>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onPlayAgain}
          className="px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-bold hover:bg-amber-900 cursor-pointer shadow-2xs"
        >
          العب مرة أخرى
        </motion.button>
      </motion.div>

      {/* Questions List */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="space-y-4"
      >
        {answers.map((record, index) => {
          return (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`bg-white rounded-2xl border p-5 shadow-2xs ${
                record.isCorrect ? 'border-emerald-200/80' : 'border-rose-200/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">
                    {record.question}
                  </h3>
                </div>

                {record.isCorrect ? (
                  <span className="flex items-center gap-1 text-emerald-700 text-xs font-bold shrink-0 bg-emerald-50 px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    إجابة صحيحة
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-700 text-xs font-bold shrink-0 bg-rose-50 px-2.5 py-1 rounded-md">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    إجابة خاطئة
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 text-xs">
                {record.options.map((opt, optIdx) => {
                  const isUserSelection = optIdx === record.selectedIndex;
                  const isCorrectAnswer = optIdx === record.correctIndex;

                  let optClass = 'bg-stone-50 border-stone-200 text-stone-600';
                  if (isCorrectAnswer) {
                    optClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                  } else if (isUserSelection && !record.isCorrect) {
                    optClass = 'bg-rose-50 border-rose-300 text-rose-950 font-medium line-through';
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-2.5 rounded-lg border flex items-center gap-2 ${optClass}`}
                    >
                      <span className="font-bold shrink-0">{OPTION_LETTERS[optIdx]} -</span>
                      <span className="leading-snug">{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Explanation & Reference */}
              <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600 leading-relaxed bg-[#fdfbf7] p-3 rounded-xl">
                <p className="mb-1">{record.explanation}</p>
                {record.reference && (
                  <div className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>المرجع: {record.reference}</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
