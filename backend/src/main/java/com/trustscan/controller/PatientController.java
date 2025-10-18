package com.trustscan.controller;

import com.trustscan.dao.UserRepository;
import com.trustscan.model.Patient;
import com.trustscan.model.User;
import com.trustscan.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")
public class PatientController {
    
    @Autowired
    private PatientService patientService;
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/{patientCode}")
    public ResponseEntity<?> getPatientByCode(@PathVariable String patientCode) {
        Optional<Patient> patient = patientService.getPatientByCode(patientCode);
        
        if (patient.isPresent()) {
            return ResponseEntity.ok(patient.get());
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> createPatient(@RequestBody CreatePatientRequest request) {
        try {
            Optional<User> userOpt = userRepository.findById(request.getUserId());
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            Patient patient = patientService.createPatient(
                userOpt.get(),
                request.getFullName(),
                request.getContactNumber()
            );
            
            return ResponseEntity.ok(patient);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/check-code/{patientCode}")
    public ResponseEntity<?> checkPatientCode(@PathVariable String patientCode) {
        boolean exists = patientService.checkPatientCodeExists(patientCode);
        return ResponseEntity.ok().body(Map.of("exists", exists));
    }
    
    // Request DTO class
    public static class CreatePatientRequest {
        private Long userId;
        private String fullName;
        private String contactNumber;
        
        // Getters and setters
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getContactNumber() { return contactNumber; }
        public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    }
}