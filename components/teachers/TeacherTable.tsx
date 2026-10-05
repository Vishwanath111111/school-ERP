'use client';

import React from 'react';
import { Teacher } from '@/types/teacher';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Eye, Edit2, Trash2, Mail, Phone, BookOpen, Award } from 'lucide-react';

export interface TeacherTableProps {
  teachers: Teacher[];
  onView: (teacher: Teacher) => void;
  onEdit: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
}

export const TeacherTable: React.FC<TeacherTableProps> = ({
  teachers,
  onView,
  onEdit,
  onDelete,
}) => {
  const formatDepartment = (dept: string) => {
    return dept
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formatDesignation = (desig: string) => {
    switch (desig) {
      case 'HEAD_OF_DEPARTMENT':
        return 'HOD';
      case 'SENIOR_TEACHER':
        return 'Senior Teacher';
      case 'ASSISTANT_TEACHER':
        return 'Assistant Teacher';
      case 'SPORTS_COACH':
        return 'Sports Coach';
      default:
        return desig;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Teacher / Employee ID</TableHead>
          <TableHead>Department & Designation</TableHead>
          <TableHead>Assigned Subject & Class</TableHead>
          <TableHead>Qualification</TableHead>
          <TableHead>Contact Info</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachers.map((teacher) => (
          <TableRow key={teacher.id}>
            {/* Teacher Name & Avatar */}
            <TableCell>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center border border-indigo-200 dark:border-indigo-800 shrink-0">
                  {teacher.firstName.charAt(0)}
                  {teacher.lastName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {teacher.firstName} {teacher.lastName}
                  </h4>
                  <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                    {teacher.employeeId}
                  </span>
                </div>
              </div>
            </TableCell>

            {/* Department & Designation */}
            <TableCell>
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200 block">
                  {formatDepartment(teacher.department)}
                </span>
                <Badge
                  variant={teacher.designation === 'HEAD_OF_DEPARTMENT' ? 'danger' : 'info'}
                  size="sm"
                >
                  {formatDesignation(teacher.designation)}
                </Badge>
              </div>
            </TableCell>

            {/* Subject & Class */}
            <TableCell>
              <div className="space-y-0.5">
                <div className="flex items-center space-x-1 text-xs font-semibold text-slate-900 dark:text-white">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{teacher.assignedSubject}</span>
                </div>
                {teacher.assignedClass && (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    {teacher.assignedClass}
                  </span>
                )}
              </div>
            </TableCell>

            {/* Qualification */}
            <TableCell>
              <div className="flex items-center space-x-1.5 text-xs text-slate-700 dark:text-slate-300">
                <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate max-w-[140px]">{teacher.qualification}</span>
              </div>
            </TableCell>

            {/* Contact Details */}
            <TableCell>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate max-w-[150px]">{teacher.email}</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                  <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{teacher.phone}</span>
                </div>
              </div>
            </TableCell>

            {/* Status */}
            <TableCell>
              <Badge variant={teacher.isActive ? 'success' : 'danger'}>
                {teacher.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(teacher)}
                  title="View Profile"
                  className="h-8 w-8 p-0 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(teacher)}
                  title="Edit Teacher"
                  className="h-8 w-8 p-0 text-slate-600 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(teacher)}
                  title="Delete Teacher"
                  className="h-8 w-8 p-0 text-slate-600 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
