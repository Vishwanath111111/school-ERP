'use client';

import React, { useState, useEffect } from 'react';
import { Teacher, TeacherRequest, DepartmentType, DesignationType } from '@/types/teacher';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { isValidEmail, isValidPhone } from '@/lib/utils';
import { UserCheck, Mail, Phone, BookOpen, Award, Calendar, MapPin } from 'lucide-react';

export interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TeacherRequest) => Promise<void>;
  initialData?: Teacher | null;
}

const DEPARTMENT_OPTIONS = [
  { value: 'SCIENCE', label: 'Science' },
  { value: 'MATHEMATICS', label: 'Mathematics' },
  { value: 'ENGLISH', label: 'English' },
  { value: 'COMPUTER_SCIENCE', label: 'Computer Science' },
  { value: 'SOCIAL_STUDIES', label: 'Social Studies' },
  { value: 'ARTS', label: 'Arts' },
  { value: 'PHYSICAL_EDUCATION', label: 'Physical Education' },
  { value: 'LANGUAGES', label: 'Languages' },
];

const DESIGNATION_OPTIONS = [
  { value: 'HEAD_OF_DEPARTMENT', label: 'Head of Department (HOD)' },
  { value: 'SENIOR_TEACHER', label: 'Senior Teacher' },
  { value: 'ASSISTANT_TEACHER', label: 'Assistant Teacher' },
  { value: 'SPORTS_COACH', label: 'Sports Coach' },
  { value: 'LAB_ASSISTANT', label: 'Lab Assistant' },
];

const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
];

export const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<TeacherRequest>({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'SCIENCE',
    designation: 'SENIOR_TEACHER',
    qualification: '',
    assignedSubject: '',
    assignedClass: '',
    joiningDate: new Date().toISOString().split('T')[0],
    gender: 'MALE',
    salary: 50000,
    isActive: true,
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        employeeId: initialData.employeeId,
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        phone: initialData.phone,
        department: initialData.department,
        designation: initialData.designation,
        qualification: initialData.qualification,
        assignedSubject: initialData.assignedSubject,
        assignedClass: initialData.assignedClass || '',
        joiningDate: initialData.joiningDate,
        gender: initialData.gender,
        salary: initialData.salary || 50000,
        isActive: initialData.isActive,
        address: initialData.address || '',
      });
    } else {
      setFormData({
        employeeId: `TCH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: 'SCIENCE',
        designation: 'SENIOR_TEACHER',
        qualification: '',
        assignedSubject: '',
        assignedClass: '',
        joiningDate: new Date().toISOString().split('T')[0],
        gender: 'MALE',
        salary: 50000,
        isActive: true,
        address: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';
    if (!formData.assignedSubject.trim()) newErrors.assignedSubject = 'Assigned subject is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch {
      // Handled in parent page toast alert
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Teacher Record' : 'Register New Teacher'}
      description={
        initialData
          ? 'Update teacher profile details and department allocation.'
          : 'Add a new educator profile to Greenwood School ERP.'
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Employee ID & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Employee ID"
            required
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            error={errors.employeeId}
            placeholder="e.g. TCH-2026-101"
            leftIcon={<UserCheck className="w-4 h-4 text-indigo-500" />}
          />
          <Select
            label="Gender"
            required
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'MALE' | 'FEMALE' | 'OTHER' })}
            options={GENDER_OPTIONS}
          />
        </div>

        {/* Row 2: First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            error={errors.firstName}
            placeholder="e.g. Robert"
          />
          <Input
            label="Last Name"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            error={errors.lastName}
            placeholder="e.g. Chen"
          />
        </div>

        {/* Row 3: Department & Designation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Department"
            required
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value as DepartmentType })}
            options={DEPARTMENT_OPTIONS}
          />
          <Select
            label="Designation"
            required
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value as DesignationType })}
            options={DESIGNATION_OPTIONS}
          />
        </div>

        {/* Row 4: Subject & Classes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Primary Subject"
            required
            value={formData.assignedSubject}
            onChange={(e) => setFormData({ ...formData, assignedSubject: e.target.value })}
            error={errors.assignedSubject}
            placeholder="e.g. Physics"
            leftIcon={<BookOpen className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Assigned Classes"
            value={formData.assignedClass || ''}
            onChange={(e) => setFormData({ ...formData, assignedClass: e.target.value })}
            placeholder="e.g. Class 11-A, 12-A"
          />
        </div>

        {/* Row 5: Qualification & Joining Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Educational Qualification"
            required
            value={formData.qualification}
            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
            error={errors.qualification}
            placeholder="e.g. Ph.D. in Physics, B.Ed."
            leftIcon={<Award className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Joining Date"
            type="date"
            required
            value={formData.joiningDate}
            onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
            leftIcon={<Calendar className="w-4 h-4 text-indigo-500" />}
          />
        </div>

        {/* Row 6: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="e.g. robert.chen@greenwood.edu"
            leftIcon={<Mail className="w-4 h-4 text-indigo-500" />}
          />
          <Input
            label="Phone Number"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
            placeholder="e.g. +91 98765 43210"
            leftIcon={<Phone className="w-4 h-4 text-indigo-500" />}
          />
        </div>

        {/* Row 7: Address */}
        <Input
          label="Residential Address"
          value={formData.address || ''}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter residential address"
          leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
        />

        {/* Actions Bar */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {initialData ? 'Save Changes' : 'Register Teacher'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
