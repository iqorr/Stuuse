package com.example.stuuse.dao;

import com.example.stuuse.dao.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {
}
