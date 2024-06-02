package com.example.stuuse.dao;

import com.example.stuuse.dao.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByLogin(String login);
    List<User> findByLoginOrEmail(String login, String email);
}