package com.trustscan.service;

import com.trustscan.dao.PatientRepository;
import com.trustscan.model.Patient;
import com.trustscan.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class PatientService {
    
    @Autowired
    private PatientRepository patientRepository;
    
    public Patient createPatient(User user, String fullName, String contactNumber) {
        String patientCode = generatePatientCode();
        
        Patient patient = new Patient();
        patient.setUser(user);
        patient.setPatientCode(patientCode);
        patient.setFullName(fullName);
        patient.setContactNumber(contactNumber);
        
        return patientRepository.save(patient);
    }
    
    public Optional<Patient> getPatientByCode(String patientCode) {
        return patientRepository.findByPatientCode(patientCode);
    }
    
    public boolean checkPatientCodeExists(String patientCode) {
        return patientRepository.existsByPatientCode(patientCode);
    }
    
    private String generatePatientCode() {
        String code;
        do {
            code = "PT" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        } while (patientRepository.existsByPatientCode(code));
        
        return code;
    }
}