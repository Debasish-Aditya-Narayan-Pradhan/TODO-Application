package com.demo.todo.UserService;

import com.demo.todo.UserRepo.UserRepo;
import com.demo.todo.UserRepo.UserTaskRepo;
import com.demo.todo.entity.User;
import com.demo.todo.entity.UserTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserTaskService {
    @Autowired
    UserTaskRepo userTaskRepo;
    @Autowired
    UserRepo userRepo;
    public UserTask addTask(UserTask userTask,Integer id)
    {
        Optional<User> op = userRepo.findById(id);
        if(op.isPresent())
        {
            userTask.setUser(op.get());
        }
        return userTaskRepo.save(userTask);
    }

    public List<UserTask> getTaskByUserId(Integer id)
    {
        return userTaskRepo.getUserTaskByUserId(id);
    }

    public UserTask EditById(UserTask userTask,Integer id)
    {
        Optional<UserTask> op = userTaskRepo.findById(id);
        if(op.isPresent())
        {
            UserTask userTask1 = op.get();
            userTask1.setTask(userTask.getTask());
            userTask1.setStartDate(userTask.getStartDate());
            userTask1.setEndDate(userTask.getEndDate());
            userTask1.setDuration(userTask.getDuration());
            userTask1.setStatus(userTask.getStatus());

            return userTaskRepo.save(userTask1);
        }
        return null;
    }

    public UserTask getUserTask(Integer id)
    {
        Optional<UserTask> userTask = userTaskRepo.findById(id);
        if(userTask.isPresent())
        {
            return userTask.get();
        }
        return null;
    }
    public UserTask deleteById(Integer id)
    {
        Optional<UserTask> op = userTaskRepo.findById(id);
        userTaskRepo.deleteById(id);
        if(op.isPresent())
        {
            return op.get();
        }
        return null;
    }
}
