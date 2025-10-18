package com.trustscan.dao;

import com.trustscan.model.Document;
import com.trustscan.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByPatient(Patient patient);
    List<Document> findByPatientPatientCode(String patientCode);
}