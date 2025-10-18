package com.trustscan.dao;

import com.trustscan.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByPatientCode(String patientCode);
    Optional<Patient> findByUserId(Long userId);
    boolean existsByPatientCode(String patientCode);
}