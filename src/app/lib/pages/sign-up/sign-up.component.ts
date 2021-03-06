import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/Auth/user-service.service';
import { first } from 'rxjs/operators';
import { User } from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  roles: string[] = [];
  RegistreForm:FormGroup ; 
  submitted: boolean=false;
  loading: boolean;
  user:User = new User();
  returnUrl: string;
repEmail = 0;
private notSame  =false ; 
  constructor(private formBuilder: FormBuilder,
    private userService:UserService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService

    ) { }
 

  ngOnInit() {
    
    this.RegistreForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email , Validators.required]],
      password: ['', [Validators.required,Validators.minLength(8)] ],
      confirm: ['', [Validators.required,Validators.minLength(8)] ],
      fullname : ['',Validators.required],
      roles : ['',Validators.required]

  });
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


}
   // get return url from route parameters or default to '/'
  

  // convenience getter for easy access to form fields
  get f() { return this.RegistreForm.controls; }

  onSubmit() {
    
      this.submitted = true;

      // reset alerts on submit

      // stop here if form is invalid
      if (this.RegistreForm.invalid) {
          return;
      }



this.user.email =   this.f.email.value
this.user.username =   this.f.username.value
this.user.fullname =   this.f.fullname.value
this.user.plainPassword =   this.f.password.value
this.user.roles.push("ROLE_USER"); 

      this.loading = true;
    
    this.userService.register(this.user).pipe(first())
    .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);

        },
        error => {
           this.alertService.error(error);
            this.loading = false;
        });   
  }
  

}



