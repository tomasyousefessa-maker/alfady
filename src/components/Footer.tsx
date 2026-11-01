/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CrossIcon, BibleIcon, DoveIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto border-t border-amber-900/15 bg-[#faf7f2]/95 py-6 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
        {/* Decorative Christian Symbols */}
        <div className="flex items-center justify-center gap-4 text-amber-800/70">
          <BibleIcon className="w-4 h-4 text-amber-700/80" />
          <span className="w-6 h-px bg-amber-900/20"></span>
          <CrossIcon className="w-4 h-4 text-amber-800" />
          <span className="w-6 h-px bg-amber-900/20"></span>
          <DoveIcon className="w-4 h-4 text-amber-700/80" />
        </div>

        {/* Required Copyright & Attribution */}
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-semibold text-stone-800">
            جميع الحقوق محفوظة © 2026
          </p>
          <p className="text-xs sm:text-sm text-amber-900 font-bold">
            إنشاء وتصميم: توماس يوسف – Tomas Yousef
          </p>
        </div>

        <p className="text-[11px] text-stone-500 max-w-md mx-auto leading-relaxed">
          «سِرَاجٌ لِرِجْلِي كَلاَمُكَ وَنُورٌ لِسَبِيلِي» (مزمور 119: 105)
          · لعبة تعليمية مسيحية تهدف لنشر المعرفة الروحية والكتابية بطريقة ممتعة ومجانية للجميع.
        </p>
      </div>
    </footer>
  );
};
