import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public correo: string = '';
  public usuario: Usuario;

  @ViewChild('itemCardTitulo', {read: ElementRef}) itemCardTitulo!:ElementRef;
  @ViewChild('itemCardSubTitulo', {read: ElementRef}) itemCardSubTitulo!:ElementRef;
  @ViewChild('itemBoton', {read: ElementRef}) itemBoton!:ElementRef;

  constructor
  (
    private router: Router,
    private animationController: AnimationController,
    private toastController: ToastController,

  ) 
  {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  public animacionCardTitulo(ElementRef: any, duration: number) {
    const animation = this.animationController
    .create()
    .addElement(ElementRef)
    .duration(duration)
    .iterations(1)
    .fromTo('transform', 'translateX(-400px)', 'translateX(0px)');
    animation.play()
  }

  public animacionCardLabel(ElementRef: any, duration: number) {
    const animation = this.animationController
    .create()
    .addElement(ElementRef)
    .duration(duration)
    .iterations(1)
    .fromTo('transform', 'translateX(400px)', 'translateX(0px)');
    animation.play()
  }

  public animacionboton(ElementRef: any, duration: number) {
    const animation = this.animationController
    .create()
    .addElement(ElementRef)
    .duration(duration)
    .iterations(1)
    .fromTo('transform', 'translateY(100px)', 'translateY(0px)');
    animation.play()
  }

  public ionViewDidEnter(){

    this.animacionCardTitulo(this.itemCardTitulo.nativeElement, 1800);
    this.animacionCardLabel(this.itemCardSubTitulo.nativeElement, 1800);
    this.animacionboton(this.itemBoton.nativeElement, 1800);
   
  }

  public ingresarPaginaValidarRespuestaSecreta(): void {
    const usuarioEncontrado = this.usuario.buscarUsuarioPorCorreo(this.correo);
    if (this.correo === '') {
      this.mostrarMensajeEmergenteCorreoVacio();
    } else {
      if (!usuarioEncontrado) {
        this.mostrarMensajeEmergenteCorreo();
      } else {
        const navigationExtra: NavigationExtras = {
          state: {
            usuario: usuarioEncontrado
          }
        };
        this.router.navigate(['/pregunta'], navigationExtra);
      }
    }
  }

  public validarCorreo(correo: string): boolean {
    let correoValido = false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@duocuc\.cl$/;
    if (correo.match(emailRegex)) {
      correoValido = true;
    }
    return correoValido
  }

  async mostrarMensajeEmergenteCorreoVacio() {
    const toast = await this.toastController.create({
      message: 'Debe ingresar un correo electrónico',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  async mostrarMensajeEmergenteCorreo() {
    const toast = await this.toastController.create({
      message: 'El correo ingresado no se encuentra registrado',
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

}
