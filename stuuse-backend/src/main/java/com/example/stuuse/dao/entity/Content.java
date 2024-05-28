package com.example.stuuse.dao.entity;

import com.example.stuuse.dao.enums.TypeOfContent;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "content")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_id")
    private Long contentId;

    @Column(name = "type_of_content")
    private TypeOfContent typeOfContent;

    @Column(name = "title")
    private String title;

    @Column(name = "address")
    private String address;

    @Column(name = "image")
    private String image;

    @Column(name = "discount_code")
    private String discountCode;

    @Column(name = "description")
    private String description;

    @Column(name = "is_verified", columnDefinition = "boolean default false")
    private boolean isVerified;

    @Column(name = "likes", columnDefinition = "integer default 0")
    private int likes;

    @Column(name = "dislikes", columnDefinition = "integer default 0")
    private int dislikes;

}

