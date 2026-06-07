package com.example.demo.dao;

import com.example.demo.domain.Post;
import java.util.List;
import java.util.Optional;

public interface PostDAO {
    List<Post> findAll();
    Optional<Post> findById(Long id);
    Post save(Post post);
    void deleteById(Long id);
}
