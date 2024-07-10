import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [TaskCardComponent, CommonModule],
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
    public tasksDone: Task[] = [];
    public taskNotDone: Task[] = [];

    constructor(private taskService: TaskService) {}

    ngOnInit(): void {
        this.taskService.readAll().subscribe({
            next: (tasks) => {
                // On sépare les tâches effectuées de celles en cours
                this.tasksDone = tasks.filter((task) => task.isDone);
                this.taskNotDone = tasks.filter((task) => !task.isDone);
            },
            error: (error) => console.error(error),
        });
    }

    public handleTask(updatedTask: Task) {
        // On vient déplacer la tâche d'un array à l'autre
        if (updatedTask.isDone) {
            this.taskNotDone = this.taskNotDone.filter((task) => task._id !== updatedTask._id);
            this.tasksDone.push(updatedTask);
        } else {
            this.tasksDone = this.tasksDone.filter((task) => task._id !== updatedTask._id);
            this.taskNotDone.push(updatedTask);
        }
    }
}
