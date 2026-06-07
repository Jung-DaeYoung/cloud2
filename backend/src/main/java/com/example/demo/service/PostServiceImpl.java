package com.example.demo.service;

import com.example.demo.dao.PostDAO;
import com.example.demo.domain.Post;
import com.example.demo.dto.PostDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {
    private final PostDAO postDAO;

    public PostServiceImpl(PostDAO postDAO) {
        this.postDAO = postDAO;
    }

    @Override
    public List<PostDTO> getAllPosts() {
        List<Post> posts = postDAO.findAll();
        Collections.reverse(posts);
        return posts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PostDTO getPostById(Long id) {
        return postDAO.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public PostDTO createPost(PostDTO postDTO) {
        Post post = convertToEntity(postDTO);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        Post savedPost = postDAO.save(post);
        return convertToDTO(savedPost);
    }

    @Override
    public PostDTO updatePost(Long id, PostDTO postDTO) {
        return postDAO.findById(id).map(post -> {
            post.setTitle(postDTO.getTitle());
            post.setContent(postDTO.getContent());
            post.setAuthor(postDTO.getAuthor());
            post.setUpdatedAt(LocalDateTime.now());
            return convertToDTO(post);
        }).orElse(null);
    }

    @Override
    public void deletePost(Long id) {
        postDAO.deleteById(id);
    }

    private PostDTO convertToDTO(Post post) {
        PostDTO dto = new PostDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setAuthor(post.getAuthor());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setUpdatedAt(post.getUpdatedAt());
        return dto;
    }

    private Post convertToEntity(PostDTO dto) {
        Post post = new Post();
        post.setId(dto.getId());
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setAuthor(dto.getAuthor());
        return post;
    }
}
