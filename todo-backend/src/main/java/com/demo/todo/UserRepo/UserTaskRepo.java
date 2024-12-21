package com.demo.todo.UserRepo;

import com.demo.todo.entity.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTaskRepo extends JpaRepository<UserTask,Integer> {
    public List<UserTask> getUserTaskByUserId(Integer userId);
}
