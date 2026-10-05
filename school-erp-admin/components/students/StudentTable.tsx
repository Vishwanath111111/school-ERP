import React from 'react';
import { Student } from '@/types/student';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Eye, Edit3, Trash2, User, Phone, Mail } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface StudentTableProps {
  students: Student[];
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Admission No</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Class & Section</TableHead>
          <TableHead>Gender / DOB</TableHead>
          <TableHead>Guardian Contact</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            {/* Admission No */}
            <TableCell className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {student.admissionNo}
            </TableCell>

            {/* Student Name & Avatar */}
            <TableCell>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200 dark:border-slate-700">
                  {student.firstName.charAt(0)}
                  {student.lastName ? student.lastName.charAt(0) : ''}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {student.fullName || `${student.firstName} ${student.lastName || ''}`}
                  </div>
                  {student.house && (
                    <span className="text-[10px] text-slate-400 font-medium">House: {student.house}</span>
                  )}
                </div>
              </div>
            </TableCell>

            {/* Class & Section */}
            <TableCell>
              <div className="font-medium text-slate-800 dark:text-slate-200">
                Class {student.className} - {student.section || 'A'}
              </div>
              {student.rollNo && (
                <div className="text-[10px] text-slate-400">Roll No: {student.rollNo}</div>
              )}
            </TableCell>

            {/* Gender & DOB */}
            <TableCell>
              <div className="text-xs text-slate-700 dark:text-slate-300">{student.gender || 'Unspecified'}</div>
              <div className="text-[10px] text-slate-400">{formatDate(student.dateOfBirth)}</div>
            </TableCell>

            {/* Guardian Contact */}
            <TableCell>
              {student.parentPhone || student.parentEmail ? (
                <div className="space-y-0.5 text-xs">
                  {student.parentPhone && (
                    <div className="flex items-center space-x-1 text-slate-700 dark:text-slate-300">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{student.parentPhone}</span>
                    </div>
                  )}
                  {student.parentEmail && (
                    <div className="flex items-center space-x-1 text-slate-500 text-[11px] truncate max-w-[150px]">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span className="truncate">{student.parentEmail}</span>
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic">No contact info</span>
              )}
            </TableCell>

            {/* Status */}
            <TableCell>
              <Badge variant={student.isActive ? 'success' : 'danger'} dot>
                {student.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(student)}
                  title="View Student Details"
                  className="px-2 py-1 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(student)}
                  title="Edit Student"
                  className="px-2 py-1 text-slate-500 hover:text-amber-600 dark:hover:text-amber-400"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(student)}
                  title="Delete Student"
                  className="px-2 py-1 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400"
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
