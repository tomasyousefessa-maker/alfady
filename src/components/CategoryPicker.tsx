/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/questions';
import { CategoryId } from '../types';
import { CrossIcon, BibleIcon } from './Icons';
import {
  BookOpen,
  Users,
  UserCheck,
  Sun,
  Sparkles,
  Compass,
  Landmark,
  Calendar,
  Flame,
  Music,
  ArrowLeft,
  Play,
} from 'lucide-react';

interface CategoryPickerProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  questionCount: number;
  onChangeQuestionCount: (count: number) => void;
  onStartQuiz: () => void;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedCategory,
  onSelectCategory,
  questionCount,
  onChangeQuestionCount,
  onStartQuiz,
}) => {
  const getCategoryIcon = (iconName: string, isSelected: boolean) => {
    const iconClass = `w-5 h-5 ${isSelected ? 'text-amber-800' : 'text-stone-600'}`;
    switch (iconName) {
      case 'cross':
        return <CrossIcon className={iconClass} />;
      case 'book-open':
        return <BookOpen className={iconClass} />;
      case 'users':
        return <Users className={iconClass} />;
      case 'user-check':
        return <UserCheck className={iconClass} />;
      case 'sun':
        return <Sun className={iconClass} />;
      case 'sparkles':
        return <Sparkles className={iconClass} />;
      case 'compass':
        return <Compass className={iconClass} />;
      case 'landmark':
        return <Landmark className={iconClass} />;
      case 'calendar':
        return <Calendar className={iconClass} />;
      case 'flame':
        return <Flame className={iconClass} />;
      case 'music':
        return <Music className={iconClass} />;
      default:
        return <BibleIcon className={iconClass} />;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Title & Description */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-950 font-['Amiri',serif]">
          أقسام الأسئلة الدينية
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
          اختر القسم الذي ترغب في اختبار معلوماتك فيه، أو اختر الاختبار الشامل ليضم أسئلة من كل الأقسام
        </p>
      </motion.div>

      {/* Question Count Selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <div className="text-xs sm:text-sm font-semibold text-stone-800">
          عدد أسئلة المسبحة (حبات الجولة):
        </div>
        <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl">
          {[10, 15, 20].map((num) => (
            <motion.button
              key={num}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onChangeQuestionCount(num)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                questionCount === num
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {num} أسئلة
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Categories Grid with Staggered Entrance */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              type="button"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelectCategory(cat.id)}
              className={`text-right p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 relative overflow-hidden ${
                isSelected
                  ? 'bg-amber-50/90 border-amber-500 shadow-sm ring-2 ring-amber-400/30'
                  : 'bg-white border-stone-200/80 hover:border-amber-300 hover:bg-[#fcfaf7]'
              }`}
            >
              {/* Category Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                  isSelected
                    ? 'bg-amber-100/90 border-amber-300 text-amber-900'
                    : 'bg-stone-100 border-stone-200 text-stone-600'
                }`}
              >
                {getCategoryIcon(cat.iconName, isSelected)}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={`text-sm sm:text-base font-bold leading-snug ${
                      isSelected ? 'text-amber-950 font-extrabold' : 'text-stone-900'
                    }`}
                  >
                    {cat.name}
                  </h3>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                      محدد
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="pt-2 flex justify-center"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStartQuiz}
          className="w-full sm:w-auto min-w-[260px] flex items-center justify-center gap-2.5 py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 hover:from-amber-800 hover:to-black text-white font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition-all cursor-pointer group"
        >
          <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
          <span>ابدأ الأسئلة الآن</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
};
