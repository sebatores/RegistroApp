import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Persona } from 'src/app/model/persona';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuario: Usuario;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) 
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);
    this.usuario.cuenta = 'atorres';
    this.usuario.password = '1234';
  }

  public ngOnInit(): void {
    //if (this.usuario.correo !== '') this.ingresar();
  }

  ingresar() {
    const error = this.usuario.validarUsuario();
    if(error) {
      this.mostrarMensajeEmergente(error);
      return;
    } 
    this.mostrarMensajeEmergente('¡Bienvenido(a) al Sistema de Asistencia DUOC!');
    this.usuario.navegarEnviandousuario(this.router, '/inicio');
  }

  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion? duracion: 2000,
    });
    toast.present();
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }

}
