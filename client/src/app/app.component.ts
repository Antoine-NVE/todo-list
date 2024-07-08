import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { Task } from './models/task.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [TaskCardComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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
