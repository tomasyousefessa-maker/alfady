/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { CrossIcon } from './Icons';

interface RosaryTrackProps {
  total: number;
  currentIndex: number;
  answers: (boolean | null)[];
}

export const RosaryTrack: React.FC<RosaryTrackProps> = ({
  total,
  currentIndex,
  answers,
}) => {
  return (
    <div className="w-full bg-white/70 backdrop-blur-xs border border-amber-900/10 rounded-2xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3 text-xs text-stone-600 font-medium">
        <div className="flex items-center gap-1.5 text-amber-900">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
          <span className="font-semibold">المسبحة التفاعلية</span>
          <span className="text-stone-400">·</span>
          <span>الحبة {Math.min(currentIndex + 1, total)} من {total}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-stone-500">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs"></span>
            صحيحة
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-xs"></span>
            خاطئة
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-300/60 inline-block"></span>
            الحالية
          </span>
        </div>
      </div>

      {/* Beads string */}
      <div className="relative py-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-center min-w-max gap-1 sm:gap-2 px-2">
          {/* Start Cross Pendant */}
          <div className="flex items-center">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-900 text-amber-200 shadow-sm border border-amber-700"
            >
              <CrossIcon className="w-4 h-4" />
            </motion.div>
            <div className="w-2.5 sm:w-4 h-0.5 bg-gradient-to-l from-amber-700/40 to-amber-900/80"></div>
          </div>

          {/* Beads */}
          {Array.from({ length: total }).map((_, index) => {
            const status = answers[index];
            const isCurrent = index === currentIndex;

            let beadBg = 'bg-stone-200 border-stone-300 text-stone-400';
            let label = String(index + 1);

            if (status === true) {
              beadBg = 'bg-emerald-500 border-emerald-600 text-white shadow-xs shadow-emerald-400/40';
            } else if (status === false) {
              beadBg = 'bg-rose-500 border-rose-600 text-white shadow-xs shadow-rose-400/40';
            } else if (isCurrent) {
              beadBg = 'bg-amber-400 border-amber-500 text-amber-950 font-bold ring-4 ring-amber-400/30 shadow-sm';
            }

            return (
              <React.Fragment key={index}>
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.15 : status !== null ? 1.05 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border text-[11px] font-semibold transition-colors duration-300 select-none ${beadBg}`}
                  title={`الحبة رقم ${index + 1}`}
                >
                  {status === true ? (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3.5 h-3.5 stroke-[3]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : status === false ? (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 stroke-[3]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </motion.svg>
                  ) : (
                    label
                  )}
                </motion.div>

                {/* Connector cord */}
                {index < total - 1 && (
                  <div
                    className={`h-0.5 w-1.5 sm:w-2.5 transition-colors duration-300 ${
                      index < currentIndex ? 'bg-amber-700/60' : 'bg-stone-300'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
