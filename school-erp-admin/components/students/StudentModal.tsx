'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Student, StudentRequest } from '@/types/student';
import { isValidEmail, isValidPhone } from '@/lib/utils';

export interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentRequest) => Promise<void>;
  student?: Student | null;
  isLoading?: boolean;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  student,
  isLoading = false,
}) => {
  const isEditing = !!student;

  const [formData, setFormData] = useState<StudentRequest>({
    admissionNo: '',
    firstName: '',
    lastName: '',
    className: '10',
    section: 'A',
    rollNo: 1,
    house: '',
    dateOfBirth: '',
    bloodGroup: 'O+',
    gender: 'Male',
    nationality: 'Indian',
    parentEmail: '',
    parentPhone: '',
    address: '',
    academicYear: '2025-2026',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (student) {
      setFormData({
        admissionNo: student.admissionNo || '',
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        className: student.className || '10',
        section: student.section || 'A',
        rollNo: student.rollNo || 1,
        house: student.house || '',
        dateOfBirth: student.dateOfBirth || '',
        bloodGroup: student.bloodGroup || 'O+',
        gender: student.gender || 'Male',
        nationality: student.nationality || 'Indian',
        parentEmail: student.parentEmail || '',
        parentPhone: student.parentPhone || '',
        address: student.address || '',
        academicYear: student.academicYear || '2025-2026',
      });
    } else {
      setFormData({
        admissionNo: `ADM-${Math.floor(1000 + Math.random() * 9000)}`,
        firstName: '',
        lastName: '',
        className: '10',
        section: 'A',
        rollNo: Math.floor(1 + Math.random() * 40),
        house: 'Blue',
        dateOfBirth: '2010-05-15',
        bloodGroup: 'O+',
        gender: 'Male',
        nationality: 'Indian',
        parentEmail: '',
        parentPhone: '',
        address: '',
        academicYear: '2025-2026',
      });
    }
    setErrors({});
  }, [student, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.admissionNo.trim()) {
      newErrors.admissionNo = 'Admission number is required';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.className.trim()) {
      newErrors.className = 'Class name is required';
    }
    if (formData.parentEmail && !isValidEmail(formData.parentEmail)) {
      newErrors.parentEmail = 'Invalid email address format';
    }
    if (formData.parentPhone && !isValidPhone(formData.parentPhone)) {
      newErrors.parentPhone = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Student Details' : 'Register New Student'}
      description={isEditing ? 'Update student demographic and academic profile' : 'Add student record to Spring Boot system'}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Admission No, First Name, Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Admission No"
            required
            disabled={isEditing}
            value={formData.admissionNo}
            onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
            error={errors.admissionNo}
            placeholder="e.g. ADM-1001"
          />
          <Input
            label="First Name"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            error={errors.firstName}
            placeholder="e.g. Rahul"
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="e.g. Sharma"
          />
        </div>

        {/* Row 2: Class, Section, Roll No */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            label="Class"
            required
            options={[
              { value: '1', label: 'Class 1' },
              { value: '2', label: 'Class 2' },
              { value: '3', label: 'Class 3' },
              { value: '4', label: 'Class 4' },
              { value: '5', label: 'Class 5' },
              { value: '6', label: 'Class 6' },
              { value: '7', label: 'Class 7' },
              { value: '8', label: 'Class 8' },
              { value: '9', label: 'Class 9' },
              { value: '10', label: 'Class 10' },
              { value: '11', label: 'Class 11' },
              { value: '12', label: 'Class 12' },
            ]}
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
          />
          <Select
            label="Section"
            options={[
              { value: 'A', label: 'Section A' },
              { value: 'B', label: 'Section B' },
              { value: 'C', label: 'Section C' },
              { value: 'D', label: 'Section D' },
            ]}
            value={formData.section}
            onChange={(e) => setFormData({ ...formData, section: e.target.value })}
          />
          <Input
            label="Roll No"
            type="number"
            value={formData.rollNo?.toString() || ''}
            onChange={(e) => setFormData({ ...formData, rollNo: Number(e.target.value) })}
            placeholder="e.g. 15"
          />
        </div>

        {/* Row 3: DOB, Gender, Blood Group */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          />
          <Select
            label="Gender"
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          />
          <Select
            label="Blood Group"
            options={[
              { value: 'A+', label: 'A+' },
              { value: 'A-', label: 'A-' },
              { value: 'B+', label: 'B+' },
              { value: 'B-', label: 'B-' },
              { value: 'O+', label: 'O+' },
              { value: 'O-', label: 'O-' },
              { value: 'AB+', label: 'AB+' },
              { value: 'AB-', label: 'AB-' },
            ]}
            value={formData.bloodGroup}
            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
          />
        </div>

        {/* Row 4: House, Parent Email, Parent Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="School House"
            value={formData.house}
            onChange={(e) => setFormData({ ...formData, house: e.target.value })}
            placeholder="e.g. Red, Blue, Green"
          />
          <Input
            label="Parent Email"
            type="email"
            value={formData.parentEmail}
            onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
            error={errors.parentEmail}
            placeholder="guardian@example.com"
          />
          <Input
            label="Parent Phone"
            type="tel"
            value={formData.parentPhone}
            onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
            error={errors.parentPhone}
            placeholder="+91 9876543210"
          />
        </div>

        {/* Row 5: Address */}
        <Input
          label="Residential Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter full street address"
        />

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" isLoading={isLoading}>
            {isEditing ? 'Save Changes' : 'Register Student'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
