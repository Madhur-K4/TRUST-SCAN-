package com.trustscan.controller;

import com.trustscan.model.Document;
import com.trustscan.model.DocumentType;
import com.trustscan.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class DocumentController {
    
    @Autowired
    private DocumentService documentService;
    
    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(
            @RequestParam String patientCode,
            @RequestParam String title,
            @RequestParam DocumentType documentType,
            @RequestParam(required = false) String description,
            @RequestParam MultipartFile file) {
        
        try {
            // In real implementation, get user from JWT token
            // User user = getCurrentUser();
            
            Document document = documentService.uploadDocument(
                patientCode, title, documentType, description, file, null // user
            );
            
            return ResponseEntity.ok(document);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("File upload failed");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/patient/{patientCode}")
    public ResponseEntity<List<Document>> getPatientDocuments(@PathVariable String patientCode) {
        List<Document> documents = documentService.getDocumentsByPatientCode(patientCode);
        return ResponseEntity.ok(documents);
    }
    
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id) {
        try {
            Document document = documentService.getDocumentById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));
            
            Path filePath = Paths.get(document.getFilePath());
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, 
                           "attachment; filename=\"" + document.getTitle() + "\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
            }
            
            return ResponseEntity.notFound().build();
        } catch (MalformedURLException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id) {
        try {
            documentService.deleteDocument(id);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("File deletion failed");
        }
    }
}