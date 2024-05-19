package com.example.stuuse.controller;

import com.example.stuuse.dao.entity.Content;
import com.example.stuuse.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(
        path = "api/content",
        produces = MediaType.APPLICATION_JSON_VALUE
)
public class ContentController {

    private final ContentService contentService;

    @Autowired
    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping
    public ResponseEntity<List<Content>> getAllContent() {
        return ResponseEntity.ok(contentService.getAllContent());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Content> getContentById(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(contentService.getContentById(id));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Content> saveContent(@RequestBody Content content) {
        return ResponseEntity.ok(contentService.saveContent(content));
    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Content> updateContent(@PathVariable(name = "id") Long id, @RequestBody Content content) {
        return ResponseEntity.ok(contentService.updateContent(id, content));
    }

    @DeleteMapping(path = "/{id}")
    public void deleteContentById(@PathVariable(name = "id") Long id) {
        contentService.deleteContentById(id);
    }

}
