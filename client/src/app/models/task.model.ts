export interface NewTask {
    task: string;
    isDone: boolean;
}

export interface Task extends NewTask {
    _id: string;
}
