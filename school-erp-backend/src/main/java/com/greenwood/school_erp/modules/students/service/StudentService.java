package com.greenwood.school_erp.modules.students.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.greenwood.school_erp.modules.students.entity.Student;
import com.greenwood.school_erp.modules.students.repository.StudentRepository;
import com.greenwood.school_erp.modules.students.request.StudentRequest;
import com.greenwood.school_erp.modules.students.response.StudentResponse;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentResponse createStudent(StudentRequest request) {

        if (studentRepository.existsByAdmissionNo(request.getAdmissionNo())) {
            throw new RuntimeException("Admission number already exists");
        }

        Student student = Student.builder()
                .admissionNo(request.getAdmissionNo())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .className(request.getClassName())
                .section(request.getSection())
                .rollNo(request.getRollNo())
                .house(request.getHouse())
                .dateOfBirth(request.getDateOfBirth() != null ? LocalDate.parse(request.getDateOfBirth()) : null)
                .bloodGroup(request.getBloodGroup())
                .gender(request.getGender())
                .nationality(request.getNationality())
                .parentEmail(request.getParentEmail())
                .parentPhone(request.getParentPhone())
                .address(request.getAddress())
                .academicYear(request.getAcademicYear())
                .isActive(true)
                .build();

        Student saved = studentRepository.save(student);
        return mapToResponse(saved);
    }

    public List<StudentResponse> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public StudentResponse getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return mapToResponse(student);
    }

    private StudentResponse mapToResponse(Student student) {
        return StudentResponse.builder()
                .id(student.getId())
                .admissionNo(student.getAdmissionNo())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .fullName(student.getFullName())
                .className(student.getClassName())
                .section(student.getSection())
                .rollNo(student.getRollNo())
                .house(student.getHouse())
                .dateOfBirth(student.getDateOfBirth())
                .bloodGroup(student.getBloodGroup())
                .gender(student.getGender())
                .nationality(student.getNationality())
                .parentEmail(student.getParentEmail())
                .parentPhone(student.getParentPhone())
                .address(student.getAddress())
                .academicYear(student.getAcademicYear())
                .isActive(student.getIsActive())
                .createdAt(student.getCreatedAt())
                .build();
    }
}