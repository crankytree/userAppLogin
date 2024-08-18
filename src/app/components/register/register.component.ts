import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){

  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
    username: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  register(){
    console.log(this.registerForm.value);
    if(!this.registerForm.valid){
      alert("Invalid credentials")
      return;
    }
    this.http.post<any>("http://localhost:8080/api/v1/user/register", this.registerForm.value).subscribe(res => {
      console.log(res);
      alert(res.message);
      this.registerForm.reset();
      // this.router.navigate(["login"]);
    }, err => {
      console.log("error")
      console.log(err);
      alert(err.error?.message);
    })
  }
}
