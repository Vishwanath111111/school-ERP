import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ClassEnrollmentSummary } from '@/types/dashboard';
import { GraduationCap } from 'lucide-react';

export interface EnrollmentChartWidgetProps {
  enrollments: ClassEnrollmentSummary[];
}

export const EnrollmentChartWidget: React.FC<EnrollmentChartWidgetProps> = ({ enrollments }) => {
  return (
    <Card className="h-full border-slate-200/80 dark:border-slate-800 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <CardTitle className="text-sm">Class Enrollment & Capacity</CardTitle>
        </div>
        <Badge variant="success" size="sm">Active Grades</Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3.5">
          {enrollments.map((item) => (
            <div key={item.className} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {item.className}
                </span>
                <span className="font-medium text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-white font-bold">{item.studentCount}</strong> / {item.capacity} ({item.percentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
