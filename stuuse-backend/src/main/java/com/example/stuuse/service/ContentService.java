package com.example.stuuse.service;

import com.example.stuuse.dao.ContentRepository;
import com.example.stuuse.dao.entity.Content;
import com.example.stuuse.exception.ContentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {

    private final ContentRepository contentRepository;

    @Autowired
    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public List<Content> getAllContent() {
        return contentRepository.findAll();
    }

    public Content getContentById(Long id) {
        return contentRepository.findById(id)
                .orElseThrow(() -> new ContentNotFoundException(String.format("Content of ID %s does not exists.", id)));
    }

    public Content saveContent(Content content) {
        return contentRepository.save(content);
    }

    public Content updateContent(Long id, Content content) {
        content.setContentId(id);
        return contentRepository.save(content);
    }

    public void deleteContentById(Long id) {
        if (contentRepository.findById(id).isPresent()) {
            contentRepository.deleteById(id);
        } else {
            throw new ContentNotFoundException(String.format("Content of ID %s does not exists.", id));
        }
    }

}
