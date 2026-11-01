/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CrossIcon } from './Icons';
import { X, User, Sparkles } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl border border-stone-200 shadow-xl max-w-lg w-full p-6 text-right relative overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-900 text-amber-200 flex items-center justify-center shadow-xs">
                <CrossIcon className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-amber-950 font-['Amiri',serif]">
                  عن المسبحة الدينية – اختبر معلوماتك
                </h3>
                <p className="text-xs text-stone-500">
                  لعبة دينية وتعليمية مسيحية
                </p>
              </div>
            </div>

            {/* Creator highlight */}
            <div className="bg-[#faf7f2] border border-amber-900/10 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                <User className="w-4 h-4 text-amber-700" />
                <span>منشئ ومصمم اللعبة:</span>
              </div>
              <p className="text-sm font-bold text-stone-900">
                توماس يوسف – Tomas Yousef
              </p>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                تم تطوير هذه اللعبة بهدف خدمة الكنيسة وتقديم وسيلة سهلة وممتعة وبسيطة وخفيفة لاختبار وتنمية المعلومات الدينية المسيحية لجميع الأعمار بدون تسجيل أو اشتراكات.
              </p>
            </div>

            {/* How to play */}
            <div className="space-y-2 mb-4 text-xs text-stone-600">
              <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>طريقة اللعب:</span>
              </h4>
              <ul className="space-y-1.5 pr-4 list-disc text-stone-700">
                <li>يظهر لكل سؤال 4 اختيارات، اختر الإجابة التي تراها صحيحة.</li>
                <li>تحصل على 10 نقاط مقابل كل إجابة صحيحة.</li>
                <li>تظهر النتيجة فورياً مع توضيح الشاهد الكتابي والمرجع الكنسي.</li>
                <li>تتتبع حبات المسبحة تقدمك وإجاباتك طوال الجولة.</li>
                <li>يمكنك مراجعة جميع الأسئلة والشواهد في نهاية الجولة أو إعادة اللعب بأسئلة جديدة.</li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-amber-900 text-white font-bold text-sm hover:bg-amber-950 transition-colors cursor-pointer"
            >
              فهمت، شكراً لك
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
