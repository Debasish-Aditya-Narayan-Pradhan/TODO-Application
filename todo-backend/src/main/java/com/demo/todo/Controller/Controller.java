package com.demo.todo.Controller;

import com.demo.todo.UserService.UserService;
import com.demo.todo.UserService.UserTaskService;
import com.demo.todo.entity.User;
import com.demo.todo.entity.UserTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/user")
public class Controller {
    @Autowired
    UserService userService;

    @Autowired
    UserTaskService userTaskService;

    @GetMapping("/getUser/{email}/{password}")
    public String getUser(@PathVariable("email") String email,@PathVariable("password") String password)
    {
        User user = userService.getUser(email);
        if(user == null) return "-1";
        if(user.getPassword().equals(password))
        {
            return ""+user.getId();
        }
        return "0";
    }
    @PostMapping("/add")
    public String addUser(@RequestBody User user)
    {
        User user1 = userService.getUser(user.getEmail());
        if(user1 != null)
        {
            return "1";
        }
        userService.addUser(user);
        return "0";
    }

    @PostMapping("/add/task/{id}")
    public UserTask addTask(@RequestBody UserTask userTask,@PathVariable("id") Integer id)
    {
        return userTaskService.addTask(userTask,id);
    }

    @GetMapping("/get/task/{id}")
    public List<UserTask> getUserTaskByUserId(@PathVariable("id") Integer id)
    {
        List<UserTask> userTaskList = userTaskService.getTaskByUserId(id);
        for(UserTask userTask:userTaskList)
        {
            userTask.setUser(null);
        }
        return userTaskList;
    }
    @GetMapping("/get/{id}")
    public UserTask getUserTaskById(@PathVariable("id") Integer id)
    {
        return userTaskService.getUserTask(id);
    }
    @PutMapping("/edit/task/{id}")
    public UserTask EditById(@RequestBody UserTask userTask,@PathVariable("id") Integer id)
    {
        return userTaskService.EditById(userTask,id);
    }
    @GetMapping("/delete/task/{id}")
    public UserTask deleteById(@PathVariable("id") Integer id)
    {
        return userTaskService.deleteById(id);
    }
}
