import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { debounceTime } from 'rxjs';

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

    public taskForm!: FormGroup;

    public taskCardVisible: boolean = true;
    public isLoading: boolean = false;

    constructor(private taskService: TaskService) {}

    ngOnInit(): void {
        // Création du formulaire
        this.taskForm = new FormGroup({
            task: new FormControl(this.task.task, [Validators.required, Validators.maxLength(192)]),
            isDone: new FormControl(this.task.isDone, Validators.required),
        });

        // Event listener sur l'input
        this.taskForm
            .get('task')!
            .valueChanges.pipe(debounceTime(300)) // On limite le spam de requêtes grâce au debounce
            .subscribe((value) => {
                if (!this.taskForm.get('task')!.errors) {
                    this.task.task = value;

                    // On met à jour la tâche dans la BDD
                    this.taskService.update(this.task).subscribe({
                        error: (error) => console.error(error),
                    });
                }
            });

        // Event listener sur la checkbox
        this.taskForm.get('isDone')!.valueChanges.subscribe((value) => {
            this.taskForm.get('isDone')!.disable({ emitEvent: false }); // On désactive avec emitEvent sur false car apparemment valueChanges détecte les changements de statut

            this.task.isDone = value;

            // On met à jour la tâche dans la BDD
            this.taskService.update(this.task).subscribe({
                next: (task) => this.updatedTask.emit(task), // On envoie la tâche au composant parent pour changer l'emplacement
                error: (error) => {
                    this.task.isDone = !this.task.isDone; // On remet l'objet comme avant

                    // On remet la checkbox comme avant
                    this.taskForm.patchValue(
                        {
                            isDone: this.task.isDone,
                        },
                        {
                            emitEvent: false, // Pour éviter une boucle infinie
                        }
                    );

                    this.taskForm.get('isDone')!.enable({ emitEvent: false }); // On réactive
                },
            });
        });
    }

    public deleteTask() {
        this.isLoading = true;

        this.taskService.delete(this.task._id).subscribe({
            next: (task) => (this.taskCardVisible = false), // On cache la carte
            error: (error) => (this.isLoading = false), // On réactive le bouton delete
        });
    }
}
