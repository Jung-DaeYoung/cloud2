package com.example.demo.service;

import com.example.demo.dto.PostDTO;
import java.util.List;

public interface PostService {
    List<PostDTO> getAllPosts();
    PostDTO getPostById(Long id);
    PostDTO createPost(PostDTO postDTO);
    PostDTO updatePost(Long id, PostDTO postDTO);
    void deletePost(Long id);
}
