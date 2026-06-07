package com.example.demo.dao;

import com.example.demo.domain.Post;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class MemoryPostDAOImpl implements PostDAO {
    private final List<Post> posts = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong();

    @Override
    public List<Post> findAll() {
        return new ArrayList<>(posts);
    }

    @Override
    public Optional<Post> findById(Long id) {
        return posts.stream()
                .filter(post -> post.getId().equals(id))
                .findFirst();
    }

    @Override
    public Post save(Post post) {
        if (post.getId() == null) {
            post.setId(counter.incrementAndGet());
            posts.add(post);
        }
        return post;
    }

    @Override
    public void deleteById(Long id) {
        posts.removeIf(post -> post.getId().equals(id));
    }
}
