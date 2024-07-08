import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-card',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './task-card.component.html',
    styleUrl: './task-card.component.css',
})
export class TaskCardComponent implements OnInit {
    @Input()
    public task!: Task;

    @Output()
    public updatedTask: EventEmitter<Task> = new EventEmitter<Task>();

    public taskForm: FormGroup = new FormGroup({
        task: new FormControl('', Validators.required),
        isDone: new FormControl(''),
    });

    constructor(private taskService: TaskService) {}

    ngOnInit(): void {
        // On vient remplir l'input et la checkbox
        this.taskForm.patchValue({
            task: this.task.task,
            isDone: this.task.isDone,
        });
    }

    public changeIsDone() {
        this.task.isDone = this.taskForm.get('isDone')!.value;

        this.taskService.update(this.task).subscribe({
            next: (task) => this.updatedTask.emit(task),
            error: (error) => console.error(error),
        });
    }
}
