package com.greenwood.school_erp.modules.teachers.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greenwood.school_erp.modules.teachers.dto.request.TeacherRequest;
import com.greenwood.school_erp.modules.teachers.dto.response.TeacherResponse;
import com.greenwood.school_erp.modules.teachers.entity.Teacher;
import com.greenwood.school_erp.modules.teachers.repository.TeacherRepository;

@Service
@Transactional
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Transactional(readOnly = true)
    public List<TeacherResponse> getAllTeachers() {
        return teacherRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TeacherResponse getTeacherById(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + id));
        return mapToResponse(teacher);
    }

    public TeacherResponse createTeacher(TeacherRequest request) {
        if (teacherRepository.existsByEmployeeId(request.getEmployeeId())) {
            throw new IllegalArgumentException("Employee ID already exists: " + request.getEmployeeId());
        }
        if (teacherRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists: " + request.getEmail());
        }

        Teacher teacher = Teacher.builder()
                .employeeId(request.getEmployeeId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .department(request.getDepartment())
                .designation(request.getDesignation())
                .qualification(request.getQualification())
                .assignedSubject(request.getAssignedSubject())
                .assignedClass(request.getAssignedClass())
                .joiningDate(request.getJoiningDate())
                .gender(request.getGender())
                .salary(request.getSalary())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .address(request.getAddress())
                .build();

        Teacher saved = teacherRepository.save(teacher);
        return mapToResponse(saved);
    }

    public TeacherResponse updateTeacher(Long id, TeacherRequest request) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + id));

        teacher.setFirstName(request.getFirstName());
        teacher.setLastName(request.getLastName());
        teacher.setEmail(request.getEmail());
        teacher.setPhone(request.getPhone());
        teacher.setDepartment(request.getDepartment());
        teacher.setDesignation(request.getDesignation());
        teacher.setQualification(request.getQualification());
        teacher.setAssignedSubject(request.getAssignedSubject());
        teacher.setAssignedClass(request.getAssignedClass());
        teacher.setJoiningDate(request.getJoiningDate());
        teacher.setGender(request.getGender());
        teacher.setSalary(request.getSalary());
        if (request.getIsActive() != null) {
            teacher.setIsActive(request.getIsActive());
        }
        teacher.setAddress(request.getAddress());

        Teacher updated = teacherRepository.save(teacher);
        return mapToResponse(updated);
    }

    public void deleteTeacher(Long id) {
        if (!teacherRepository.existsById(id)) {
            throw new RuntimeException("Teacher not found with ID: " + id);
        }
        teacherRepository.deleteById(id);
    }

    private TeacherResponse mapToResponse(Teacher teacher) {
        return TeacherResponse.builder()
                .id(teacher.getId())
                .employeeId(teacher.getEmployeeId())
                .firstName(teacher.getFirstName())
                .lastName(teacher.getLastName())
                .email(teacher.getEmail())
                .phone(teacher.getPhone())
                .department(teacher.getDepartment())
                .designation(teacher.getDesignation())
                .qualification(teacher.getQualification())
                .assignedSubject(teacher.getAssignedSubject())
                .assignedClass(teacher.getAssignedClass())
                .joiningDate(teacher.getJoiningDate())
                .gender(teacher.getGender())
                .salary(teacher.getSalary())
                .isActive(teacher.getIsActive())
                .address(teacher.getAddress())
                .build();
    }
}
