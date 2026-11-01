/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { CrossIcon, BibleIcon } from './Icons';
import { RotateCcw, CheckCircle2, XCircle, ListChecks, LayoutGrid, Share2 } from 'lucide-react';

interface ResultModalProps {
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  onPlayAgain: () => void;
  onReviewAnswers: () => void;
  onChooseCategory: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  score,
  totalQuestions,
  correctCount,
  wrongCount,
  onPlayAgain,
  onReviewAnswers,
  onChooseCategory,
}) => {
  const maxScore = totalQuestions * 10;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  useEffect(() => {
    sound.playFanfare();

    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
        });
      } catch {
        // ignore
      }
    }
  }, [percentage]);

  // Encouraging spiritual messages according to score
  let messageTitle = 'مبارك ومثمر!';
  let messageBody = 'نشكر الله على المعرفة والنعمة. استمر في القراءة والتعلم الروحي.';
  let badgeColor = 'text-amber-800 bg-amber-50 border-amber-200';

  if (percentage === 100) {
    messageTitle = 'ممتاز جداً وعظيم!';
    messageBody = 'معرفتك الكتابية والكنسية رائعة ومبهرة! بارك الرب حكمتك وزادك نعمة وبركة دائماً.';
    badgeColor = 'text-emerald-800 bg-emerald-50 border-emerald-200';
  } else if (percentage >= 80) {
    messageTitle = 'رائع جداً ومبارك!';
    messageBody = 'لديك حصيلة دينية وكتابية ممتازة جداً. واصل البحث في كلمة الله وسير القديسين العطرة.';
    badgeColor = 'text-emerald-800 bg-emerald-50 border-emerald-200';
  } else if (percentage >= 60) {
    messageTitle = 'جيد جداً!';
    messageBody = 'أداء طيب ومحاولة مباركة! الكتاب المقدس وتاريخ الكنيسة بحر واسع ممتع للاستكشاف والتعلم.';
    badgeColor = 'text-blue-800 bg-blue-50 border-blue-200';
  } else {
    messageTitle = 'محاولة مباركة!';
    messageBody = 'فرصة رائعة لزيادة المعرفة الروحية والتعمق في كلمة الله الحية وسير الشهداء والقديسين.';
    badgeColor = 'text-stone-800 bg-stone-100 border-stone-200';
  }

  const handleShare = () => {
    const text = `حققت ${score} نقطة (${correctCount} من ${totalQuestions} إجابات صحيحة) في لعبة "المسبحة الدينية – اختبر معلوماتك"! اختبر معلوماتك الدينية المسيحية الآن.`;
    if (navigator.share) {
      navigator.share({
        title: 'المسبحة الدينية – اختبر معلوماتك',
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text}\n${window.location.href}`).then(() => {
        alert('تم نسخ النتيجة لمشاركتها مع أصدقائك!');
      }).catch(() => {});
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-5">
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-lg p-6 sm:p-8 text-center relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="flex items-center justify-center mb-3">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-950 text-amber-200 flex items-center justify-center shadow-md border border-amber-600/40"
          >
            <CrossIcon className="w-8 h-8 text-amber-300" />
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl sm:text-2xl font-black text-amber-950 font-['Amiri',serif] mb-1"
        >
          النتيجة النهائية
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-xs text-stone-500 mb-6"
        >
          المسبحة الدينية – اختبر معلوماتك
        </motion.p>

        {/* Score Ring / Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-[#faf7f2] border border-amber-900/10 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-4xl sm:text-5xl font-black text-amber-900 font-['Cairo',sans-serif]">
              {score}
            </span>
            <span className="text-stone-400 text-lg font-bold">/ {maxScore} نقطة</span>
          </div>
          <div className="text-xs font-semibold text-amber-800 mb-4">
            النسبة المئوية: {percentage}%
          </div>

          {/* Counts */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200/70 text-xs sm:text-sm">
            <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-3 flex flex-col items-center">
              <div className="flex items-center gap-1 text-emerald-800 font-bold mb-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>إجابات صحيحة</span>
              </div>
              <span className="text-xl font-black text-emerald-700">{correctCount}</span>
            </div>

            <div className="bg-rose-50 border border-rose-200/60 rounded-xl p-3 flex flex-col items-center">
              <div className="flex items-center gap-1 text-rose-800 font-bold mb-0.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>إجابات خاطئة</span>
              </div>
              <span className="text-xl font-black text-rose-700">{wrongCount}</span>
            </div>
          </div>
        </motion.div>

        {/* Encouraging Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className={`p-4 rounded-2xl border ${badgeColor} text-right mb-6`}
        >
          <div className="font-bold text-sm sm:text-base mb-1 flex items-center gap-1.5">
            <BibleIcon className="w-4 h-4 text-amber-700" />
            <span>{messageTitle}</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed opacity-90 font-medium">
            {messageBody}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {/* Play Again (Primary User Action) */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPlayAgain}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold text-base shadow-sm hover:shadow transition-all cursor-pointer group"
          >
            <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform" />
            <span>العب مرة أخرى</span>
          </motion.button>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Review Answers */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onReviewAnswers}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer"
            >
              <ListChecks className="w-4 h-4 text-amber-800" />
              <span>مراجعة الإجابات</span>
            </motion.button>

            {/* Choose Another Category */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onChooseCategory}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4 text-amber-800" />
              <span>أقسام الأسئلة</span>
            </motion.button>
          </div>

          {/* Share score */}
          <button
            type="button"
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة نتيجتي مع أصدقائي</span>
          </button>
        </div>
      </div>
    </div>
  );
};
