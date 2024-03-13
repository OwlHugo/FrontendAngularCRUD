import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { UsersService } from 'src/app/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[];

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.usersService.GetAll().subscribe((result) => {
      this.users = result;
    });
  }

  EditUser(userId: number): void {
    this.router.navigate(['/users'], { queryParams: { id: userId } });
  }
  DeleteUser(userId: number): void {
    this.usersService.DeleteUser(userId).subscribe(() => {
      this.users = this.users.filter(user => user.id !== userId);
      alert('Usuário excluído com sucesso');
    }, error => {
      console.error('Erro ao excluir usuário:', error);
    });
  }
}
