import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/User';
import { UsersService } from 'src/app/users.service';
import { format, validate } from 'cpf-check'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  titleForm: string;
  form: FormGroup;  
  states: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];
  selectedUserId: number; 
  submitButtonLabel: string; 

  constructor(private usersService:UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleForm = "Novo Usuário";
    this.submitButtonLabel = "Salvar";
    this.form = new FormGroup({
      FullName: new FormControl(null, Validators.required), 
      Email: new FormControl(null, [Validators.required, Validators.email]),      
      Cpf: new FormControl(null, [Validators.required]),
      State: new FormControl(null, [Validators.required]),
      City: new FormControl(null, [Validators.required])
    });
    this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.FillFormForEdit(params.id); 
      }
    });
    
  }

  SubmitForm(): void {
    if (this.form.valid) { 
      if (this.isValidCPF()) {
        const user: User = this.form.value;
        if (this.selectedUserId) { 
          const userId = this.selectedUserId; 
          user.id = userId;
          this.usersService.PutUser(userId, user).subscribe(() => { 
            alert('Usuário atualizado com sucesso');
            this.ResetForm();
          }, error => {
            console.error('Erro ao atualizar usuário:', error);
          });
        } else { 
          this.usersService.PostUser(user).subscribe(() => {
            alert('Usuário inserido com sucesso');
            this.ResetForm();
          }, error => {
            console.error('Erro ao inserir usuário:', error);
          });
        }
      } else {
        alert('CPF inválido. Por favor, verifique o número digitado.');
      }
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }

  private isValidCPF(): boolean {
    const cpf = this.form.get('Cpf').value;
    return validate(cpf);  
  }

  private ResetForm(): void {
    this.form.reset();
    this.selectedUserId = null;
    this.submitButtonLabel = "Salvar";
    this.titleForm = "Novo Usuário";
  }

  private FillFormForEdit(userId: number): void{{
    this.usersService.GetById(userId).subscribe((user) => {
      this.form.patchValue({
        FullName: user.fullName,
        Email: user.email,
        Cpf: user.cpf, 
        State: user.state,
        City: user.city
      });
      this.selectedUserId = user.id;
      this.submitButtonLabel = "Atualizar";
      this.titleForm = "Editar Usuário";
    });
  }
  }
}