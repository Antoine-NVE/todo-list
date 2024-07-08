import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewTask, Task } from '../models/task.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private readonly API = 'http://localhost:3000/api/task';

    constructor(private http: HttpClient) {}

    public create(task: NewTask): Observable<Task> {
        return this.http.post<Task>(this.API, task).pipe(catchError(this.handleError));
    }

    public readOne(id: string): Observable<Task> {
        return this.http.get<Task>(`${this.API}/${id}`).pipe(catchError(this.handleError));
    }

    public readAll(): Observable<Task[]> {
        return this.http.get<Task[]>(this.API).pipe(catchError(this.handleError));
    }

    public update(task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.API}/${task._id}`, task).pipe(catchError(this.handleError));
    }

    public delete(id: string): Observable<Task> {
        return this.http.delete<Task>(`${this.API}/${id}`).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('Erreur client ou réseau : ' + error.error);
        } else {
            console.error('Erreur serveur : ' + error.error);
        }

        return throwError(() => 'Une erreur est survenue.');
    }
}
