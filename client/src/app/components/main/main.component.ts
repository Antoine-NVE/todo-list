import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { NewTask, Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [TaskCardComponent, CommonModule, ReactiveFormsModule],
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
    @ViewChild('taskInput')
    public taskInput!: ElementRef<HTMLInputElement>;

    public tasksDone: Task[] = [];
    public taskNotDone: Task[] = [];

    public isSubmitted: boolean = false;
    public isLoading: boolean = false;

    public addingNewTask: boolean = false; // Affichage du formulaire d'ajout
    public taskForm!: FormGroup;

    constructor(private taskService: TaskService, private cdRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.taskForm = new FormGroup({
            task: new FormControl('', [Validators.required, Validators.maxLength(192)]),
        });

        this.taskService.readAll().subscribe({
            next: (tasks) => {
                // On sépare les tâches effectuées de celles en cours
                this.tasksDone = tasks.filter((task) => task.isDone);
                this.taskNotDone = tasks.filter((task) => !task.isDone);
            },
            error: (error) => console.error(error),
        });
    }

    // Affichage du formulaire
    public openForm() {
        this.addingNewTask = true;

        // On demande à détecter les changements car sinon le focus se fait sur un élément pas encore existant
        // Cela marcherait avec un setTimeout()
        this.cdRef.detectChanges();
        this.taskInput.nativeElement.focus(); // On met le focus sur l'input
    }

    // Fermeture du formulaire
    public closeForm() {
        this.addingNewTask = false;
        this.isSubmitted = false;
        this.taskForm.reset();
    }

    public taskFormSubmit() {
        this.isSubmitted = true;

        if (!this.taskForm.get('task')!.errors) {
            this.isLoading = true;

            const task: NewTask = {
                task: this.taskForm.get('task')!.value,
                isDone: false,
            };

            this.taskService.create(task).subscribe({
                next: (task) => {
                    this.isLoading = false;

                    // On ferme le formulaire et on ajoute la nouvelle tâche à notre array
                    this.closeForm();
                    this.taskNotDone.push(task);
                },
                error: (error) => (this.isLoading = false),
            });
        }
    }

    // Permet de récupérer les tâches des composants enfants
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
