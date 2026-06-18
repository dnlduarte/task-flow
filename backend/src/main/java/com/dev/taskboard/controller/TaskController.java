package com.dev.taskboard.controller;

import com.dev.taskboard.model.Task;
import com.dev.taskboard.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskRepository repository;

    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Task> findAll() {
        return repository.findAll();
    }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return repository.save(task);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task dados){
        Task task = repository.findById(id).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));

        task.setTitle(dados.getTitle());
        task.setDescription(dados.getDescription());
        task.setDone(dados.isDone());

        return repository.save(task);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        repository.deleteById(id);
    }
}
