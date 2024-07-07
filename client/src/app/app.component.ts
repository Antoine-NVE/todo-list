import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    constructor(private taskService: TaskService) {}

    ngOnInit(): void {
        // this.taskService.create({ task: 'test', isDone: false }).subscribe({
        //     next: (task) => console.log(task),
        //     error: (error) => console.error(error),
        // });
        //
        // this.taskService.readOne('668a5578b9cb7f53514c233f').subscribe({
        //     next: (task) => console.log(task),
        //     error: (error) => console.error(error),
        // });
        //
        // this.taskService.readAll().subscribe({
        //     next: (tasks) => console.log(tasks),
        //     error: (error) => console.error(error),
        // });
        //
        // this.taskService.update({ _id: '668a5578b9cb7f53514c233f', task: 'Tâche modifiée', isDone: true }).subscribe({
        //     next: (message) => console.log(message),
        //     error: (error) => console.error(error),
        // });
        //
        // this.taskService.delete('66890acc570f594d9326d2ed').subscribe({
        //     next: (message) => console.log(message),
        //     error: (error) => console.error(error),
        // });
    }
}
