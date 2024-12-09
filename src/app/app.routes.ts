import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './userdetails/userdetails.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path:"counter", component: CounterComponent
    },
    {
        path:"", component: HomeComponent
    },
    {
        path:"todo", component: TodoComponent
    },
    {
        path:"login", component: LoginComponent
    },
    {
        path:"page-not-found", component: NotfoundComponent
    },
    {
        path:"user-detail", component: UserDetailComponent
    },
    {
        path:"register", component: RegisterComponent
    },
    {
        path: "**", redirectTo:"page-not-found"
    }
];
