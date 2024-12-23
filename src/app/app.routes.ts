import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { HomeComponent } from './components/home/home.component';
import { TodoComponent } from './components/todo/todo.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { UserDetailComponent } from './components/userdetails/userdetails.component';
import { RegisterComponent } from './components/register/register.component';
import { BulkuploadComponent } from './components/bulkupload/bulkupload.component';

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
        path:"bulk-upload", component: BulkuploadComponent
    },
    {
        path: "**", redirectTo:"page-not-found"
    }
];
