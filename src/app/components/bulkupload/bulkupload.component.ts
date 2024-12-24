import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import saveAs from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bulkupload',
  imports: [ReactiveFormsModule], 
  templateUrl: './bulkupload.component.html',
  styleUrls: []
})
export class BulkuploadComponent {

  
    file:(File | null)=null;  

  constructor(private _userService: UserService,private router:Router) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input)
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(file);
      this.file= file ; 
      console.log('File selected:', file);
    } else {
      this.file=null;
    }
  }

  bulkUpload() {
    if (this.file) {
      const file = this.file;
      console.log(file);
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        this._userService.bulkUploadUsers(formData).subscribe({
          next: (res) => {
            console.log(res);
           
            if (res.invalidUserResult && res.invalidUserResult.length > 0) {
              console.log('Errors with the following users: ' );
              console.log(res.invalidUserResult);
              this._userService.getErrorExcelFile(res.invalidUserResult).subscribe({
                next: (response) => {
                  const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                  saveAs(blob, 'user_error_data.xlsx');
                  this.router.navigate(['/']);
                },
                error: () => {
                  Swal.fire('error', 'Failed to fetch user details','error');
                }
              });
             
          }else if(res.invalidUserResult && res.validUsers>0){
            alert('All users registered successfully');
            this.router.navigate(['/user-detail']);
        }else{
          console.error("some issue with file ");
        }
            
          },
          error: (err) => {
            console.error(err.error);
            alert('some or all user are invalid');
          }
        });
      }
    } else {
      alert('Please select a valid file to upload');
    }
  }
}
