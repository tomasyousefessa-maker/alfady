/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CrossIcon, DoveIcon, BibleIcon } from './Icons';
import { Volume2, VolumeX, RotateCcw, LayoutGrid, Info } from 'lucide-react';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onGoHome: () => void;
  onOpenCategories: () => void;
  onRestartQuiz?: () => void;
  onOpenInfo: () => void;
  isQuizActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleMute,
  onGoHome,
  onOpenCategories,
  onRestartQuiz,
  onOpenInfo,
  isQuizActive,
}) => {
  return (
    <header className="w-full bg-[#faf7f2]/90 backdrop-blur-md border-b border-amber-900/15 sticky top-0 z-30 transition-all">
      <div className="max-w-4xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={onGoHome}
          className="flex items-center gap-3 text-right group cursor-pointer focus:outline-hidden"
          title="العودة للصفحة الرئيسية"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-800 to-amber-950 text-amber-200 flex items-center justify-center shadow-sm border border-amber-700/60 group-hover:scale-105 transition-transform">
            <CrossIcon className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-bold text-amber-950 tracking-tight font-['Amiri',serif]">
                المسبحة الدينية
              </h1>
              <span className="text-stone-300 hidden sm:inline">|</span>
              <span className="text-xs text-amber-800/80 font-medium hidden sm:inline">
                اختبر معلوماتك
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium">
              تم الإنشاء بواسطة <span className="text-amber-900 font-semibold">توماس يوسف (Tomas Yousef)</span>
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Categories Button */}
          <button
            onClick={onOpenCategories}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 bg-white/80 hover:bg-amber-50 hover:text-amber-900 border border-stone-200 shadow-2xs transition-colors cursor-pointer"
            title="اختيار قسم محدد"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">الأقسام</span>
          </button>

          {/* Restart Quiz if in quiz */}
          {isQuizActive && onRestartQuiz && (
            <button
              onClick={onRestartQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 bg-white/80 hover:bg-amber-50 hover:text-amber-900 border border-stone-200 shadow-2xs transition-colors cursor-pointer"
              title="إعادة بدء الأسئلة"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">إعادة</span>
            </button>
          )}

          {/* Sound Mute/Unmute */}
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-lg text-xs border transition-colors cursor-pointer shadow-2xs ${
              isMuted
                ? 'bg-stone-100 text-stone-400 border-stone-200 hover:text-stone-600'
                : 'bg-white/80 text-amber-900 border-stone-200 hover:bg-amber-50'
            }`}
            title={isMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم الصوت'}
            aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* About / Info */}
          <button
            onClick={onOpenInfo}
            className="p-2 rounded-lg text-xs bg-white/80 text-stone-700 border border-stone-200 hover:bg-amber-50 hover:text-amber-900 transition-colors cursor-pointer shadow-2xs"
            title="عن اللعبة والمطور"
            aria-label="عن اللعبة"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
