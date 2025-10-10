package com.trustscan.service;

import com.trustscan.dao.DocumentRepository;
import com.trustscan.dao.PatientRepository;
import com.trustscan.model.Document;
import com.trustscan.model.Patient;
import com.trustscan.model.User;
import com.trustscan.model.DocumentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DocumentService {
    
    @Autowired
    private DocumentRepository documentRepository;
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Value("${file.upload-dir}")
    private String uploadDir;
    
    public Document uploadDocument(String patientCode, String title, 
                                 DocumentType documentType, String description,
                                 MultipartFile file, User uploadedBy) throws IOException {
        
        Optional<Patient> patientOpt = patientRepository.findByPatientCode(patientCode);
        if (patientOpt.isEmpty()) {
            throw new RuntimeException("Patient not found");
        }
        
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Generate unique filename
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);
        
        Document document = new Document();
        document.setPatient(patientOpt.get());
        document.setTitle(title);
        document.setDocumentType(documentType);
        document.setFilePath(filePath.toString());
        document.setUploadedBy(uploadedBy);
        document.setDescription(description);
        
        return documentRepository.save(document);
    }
    
    public List<Document> getDocumentsByPatientCode(String patientCode) {
        return documentRepository.findByPatientPatientCode(patientCode);
    }
    
    public Optional<Document> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }
    
    public void deleteDocument(Long id) throws IOException {
        Optional<Document> documentOpt = documentRepository.findById(id);
        if (documentOpt.isPresent()) {
            Document document = documentOpt.get();
            Files.deleteIfExists(Paths.get(document.getFilePath()));
            documentRepository.delete(document);
        }
    }
}