import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
} 

@Component({
  selector: 'app-todo',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})


export class TodoComponent {
   todos:TodoItem[]=[];
   newtitle:string ="";

   
   addTodo(newTitle: string) {
    if (newTitle.trim()) {
      const newTodo = {
        id: this.todos.length + 1,
        title: newTitle,
        completed: false,
      };
      this.todos.unshift(newTodo); 

    }
    this.newtitle='';
  }

  deleteTodo( id:number){
    this.todos = this.todos.filter((todo: TodoItem) => todo.id !== id);
  }


}
