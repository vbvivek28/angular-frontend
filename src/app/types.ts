export interface User {
    id: number;            
    name: string; 
    password?: string;         
    email: string;         
    dob: Date;             
    imageUrl?: string;     
    gender?: number;
    address?: string;      
    phoneNumber?: string;  
    termsAccepted: boolean;
    departmentId: number ;
}


export interface AuthReq {
    email: string;
    password: string;
  }
  
 export interface AuthResponse {
    token: string;
    expiration: string;
  }

  export interface Department {
    id:number;
    departmentName:string;
  }

  export enum GenderEnum {
    notselected=0,
    Male = 1,
    Female = 2,
    Other = 3,
  }
