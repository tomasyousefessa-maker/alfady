/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryId =
  | 'all'
  | 'bible'
  | 'ot_figures'
  | 'nt_figures'
  | 'christ_life'
  | 'christ_miracles'
  | 'apostles'
  | 'church_history'
  | 'feasts'
  | 'saints'
  | 'coptic_heritage';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
}

export interface Question {
  id: number;
  category: CategoryId;
  categoryName: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, or 3
  explanation: string;
  reference?: string; // biblical reference or church history source
}

export interface AnswerRecord {
  questionId: number;
  question: string;
  options: [string, string, string, string];
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  explanation: string;
  reference?: string;
}

export type ScreenState = 'home' | 'quiz' | 'result' | 'review' | 'categories';
