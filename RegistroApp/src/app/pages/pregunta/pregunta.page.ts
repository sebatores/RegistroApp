import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario!: Usuario; 
  public respuesta: string = '';

  @ViewChild('itemCardTitulo', { read: ElementRef }) itemCardTitulo!: ElementRef;
  @ViewChild('itemCardSubTitulo', { read: ElementRef }) itemCardSubTitulo!: ElementRef;
  @ViewChild('itemBoton', { read: ElementRef }) itemBoton!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.usuario = navigation.extras.state['usuario'];
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {

  }

  public ionViewDidEnter() {
    this.animacionCardTitulo(this.itemCardTitulo.nativeElement, 1800);
    this.animacionCardLabel(this.itemCardSubTitulo.nativeElement, 1800);
    this.animacionboton(this.itemBoton.nativeElement, 1800);
  }

  private animacionCardTitulo(element: HTMLElement, duration: number) {
    const animation = this.animationController
      .create()
      .addElement(element)
      .duration(duration)
      .iterations(1)
      .fromTo('transform', 'translateY(-50px)', 'translateY(0)');
    animation.play();
  }

  private animacionCardLabel(element: HTMLElement, duration: number) {
    const animation = this.animationController
      .create()
      .addElement(element)
      .duration(duration)
      .iterations(1)
      .fromTo('transform', 'translateY(50px)', 'translateY(0)');
    animation.play();
  }

  private animacionboton(element: HTMLElement, duration: number) {
    const animation = this.animationController
      .create()
      .addElement(element)
      .duration(duration)
      .iterations(1)
      .fromTo('transform', 'translateY(100px)', 'translateY(0)');
    animation.play();
  }

  public async validarRespuestaSecreta(): Promise<void> {
    if (this.usuario.respuestaSecreta === this.respuesta.trim()) {
      await this.router.navigate(['/correcto'], { state: { usuario: this.usuario } }); 
    } else {
      await this.router.navigate(['/incorrecto']);
    }
  }


  private async mostrarAlertaCorrecto(): Promise<void> {
    const alert = await this.alertController.create({
      header: '¡Correcto!',
      message: `Tu contraseña es: <strong>${this.usuario.password}</strong>`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']); 
          },
        },
      ],
      cssClass: 'alert-success', 
    });
    await alert.present();
  }


  private async mostrarAlertaIncorrecto(): Promise<void> {
    const alert = await this.alertController.create({
      header: '¡Incorrecto!',
      message: 'La respuesta ingresada no es correcta. Intenta nuevamente.',
      buttons: ['Intentar de nuevo'],
      cssClass: 'alert-error', 
    });
    await alert.present();
  }
}
