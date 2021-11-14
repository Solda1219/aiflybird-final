import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit(): void {
  }

}
