package com.example.demo.controller;

import com.example.demo.dto.PostDTO;
import com.example.demo.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public PostDTO getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @PostMapping
    public PostDTO createPost(@RequestBody PostDTO postDTO) {
        return postService.createPost(postDTO);
    }

    @PutMapping("/{id}")
    public PostDTO updatePost(@PathVariable Long id, @RequestBody PostDTO postDTO) {
        return postService.updatePost(id, postDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}
