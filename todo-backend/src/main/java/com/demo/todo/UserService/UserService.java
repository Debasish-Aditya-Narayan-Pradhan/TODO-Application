package com.demo.todo.UserService;

import com.demo.todo.UserRepo.UserRepo;
import com.demo.todo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;
    public User getUser(String email)
    {
        return userRepo.findByEmail(email);
    }
    public User addUser(User user)
    {
        return userRepo.save(user);
    }
}
