import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){};

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login(){
    console.log(this.loginForm.value);
    if(!this.loginForm.valid){
      alert("Invalid Credentials!");
      return;
    }

    this.http.post<any>("http://localhost:8080/api/v1/user/login", this.loginForm.value).subscribe(
      res => {
        console.log(res);
        alert(res.message);
        this.loginForm.reset();
      },
      err => {
        console.log(err);
        alert(err.error?.message);
      }
    )
  }
}
