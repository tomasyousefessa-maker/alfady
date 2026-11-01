/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { CrossIcon, DoveIcon, RosaryBeadsIcon } from './Icons';
import { Play, BookOpen, Award, LayoutGrid } from 'lucide-react';

interface HomeScreenProps {
  onStartGame: () => void;
  onExploreCategories: () => void;
  totalQuestionsCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartGame,
  onExploreCategories,
  totalQuestionsCount,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 sm:space-y-8">
      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative bg-white/95 rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-10 text-center overflow-hidden"
      >
        {/* Subtle background ecclesiastical watermarks */}
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-amber-100/40 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-amber-200/30 blur-2xl pointer-events-none"></div>

        {/* Floating cross icon centerpiece with subtle breath animation */}
        <div className="relative z-10 flex items-center justify-center mb-5">
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            className="relative cursor-default"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 text-amber-200 flex items-center justify-center shadow-lg border border-amber-600/50">
              <CrossIcon className="w-10 h-10 sm:w-12 sm:h-12 text-amber-300 drop-shadow-sm" />
            </div>
            {/* Small decorative emblem */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md border border-amber-200 text-amber-800"
            >
              <DoveIcon className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="relative z-10 space-y-2 mb-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-xs sm:text-sm font-bold text-amber-800 tracking-wide"
          >
            المسبحة الدينية الإلكترونية
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-950 font-['Amiri',serif] tracking-tight"
          >
            اختبر معلوماتك الدينية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="text-sm sm:text-base text-stone-600 max-w-md mx-auto leading-relaxed"
          >
            رحلة روحية وثقافية ممتعة عبر حبات المسبحة لاختبار معلوماتك في الكتاب المقدس وسير القديسين والألحان الكنسية.
          </motion.p>

          {/* Prominent Creator Tag on Home */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="pt-2"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#faf7f2] border border-amber-900/15 text-xs text-stone-700 font-medium shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
              <span>تم الإنشاء بواسطة:</span>
              <span className="text-amber-950 font-bold">توماس يوسف (Tomas Yousef)</span>
            </div>
          </motion.div>
        </div>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStartGame}
            className="w-full sm:w-auto min-w-[220px] flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 hover:from-amber-800 hover:to-black text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
            <span>ابدأ اللعبة</span>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExploreCategories}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#faf7f2] hover:bg-stone-100 text-stone-800 font-bold text-sm sm:text-base border border-stone-300/80 shadow-2xs transition-colors cursor-pointer"
          >
            <LayoutGrid className="w-4 h-4 text-amber-800" />
            <span>استعراض الأقسام</span>
          </motion.button>
        </motion.div>

        {/* Feature summary indicators */}
        <div className="relative z-10 grid grid-cols-3 gap-2 pt-8 mt-8 border-t border-stone-200/60 text-center">
          <div className="p-2">
            <div className="text-amber-900 font-extrabold text-base sm:text-lg font-['Cairo',sans-serif]">
              {totalQuestionsCount}+
            </div>
            <div className="text-[11px] text-stone-500 font-medium">سؤال موثّق</div>
          </div>
          <div className="p-2 border-x border-stone-200/60">
            <div className="text-amber-900 font-extrabold text-base sm:text-lg font-['Cairo',sans-serif]">
              10
            </div>
            <div className="text-[11px] text-stone-500 font-medium">أقسام كنسية</div>
          </div>
          <div className="p-2">
            <div className="text-amber-900 font-extrabold text-base sm:text-lg font-['Cairo',sans-serif]">
              100%
            </div>
            <div className="text-[11px] text-stone-500 font-medium">مجانية وبسيطة</div>
          </div>
        </div>
      </motion.div>

      {/* Highlights / Features Grid with Staggered Entrance */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3.5"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ y: -3 }}
          className="bg-white/80 rounded-2xl border border-stone-200/80 p-4 text-right shadow-2xs transition-shadow hover:shadow-sm"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center mb-2.5 border border-amber-200/60">
            <RosaryBeadsIcon className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm mb-1">المسبحة التفاعلية</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            تتبّع تقدمك حبة بحبة مع كل إجابة صحيحة أو خاطئة في تصميم روحي مبهج.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ y: -3 }}
          className="bg-white/80 rounded-2xl border border-stone-200/80 p-4 text-right shadow-2xs transition-shadow hover:shadow-sm"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center mb-2.5 border border-emerald-200/60">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm mb-1">شواهد وشروحات</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            توضيح فوري للإجابة الصحيحة مع ذكر الآيات والسنكسار والمصادر الكنسية.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ y: -3 }}
          className="bg-white/80 rounded-2xl border border-stone-200/80 p-4 text-right shadow-2xs transition-shadow hover:shadow-sm"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center mb-2.5 border border-amber-200/60">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm mb-1">نظام النقاط والتشجيع</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            10 نقاط لكل إجابة صحيحة مع رسائل روحية تشجيعية ومراجعة شاملة.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
