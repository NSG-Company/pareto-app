export interface Task {
  id: string;
  title: string;
  description: string;
  impact: number; // 1-10 schaal
  timeSpent: number; // in uren
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'done';
  createdAt: Date;
  updatedAt: Date;
  isIncomeGenerating: boolean; // Geeft aan of de taak bijdraagt aan inkomsten
} 