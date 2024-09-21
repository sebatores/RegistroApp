import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario'; 

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {
  public usuario: Usuario | null = null; 

  @ViewChild('titulo', { read: ElementRef }) titulo!: ElementRef;

  constructor(private router: Router) { }
 
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.usuario = navigation.extras.state['usuario'] || null; 
    }

      
  } 

  redirigirAlLogin(): void {
    this.router.navigate(['/login']); 
  }
}
