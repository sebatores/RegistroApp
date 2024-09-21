import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit {

  public usuario: Usuario;

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('itemCardTitulo', { read: ElementRef }) itemCardTitulo!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemCorreo', { read: ElementRef }) itemCorreo!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemNivelEducacional', { read: ElementRef }) itemNivelEducacional!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;

  constructor(
    private animationController: AnimationController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngOnInit() {
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(7000)
        .fromTo('transform', 'translate(-92%)', 'translate(100%)');
      animation.play();
    }
  }

  public ionViewDidEnter(){

    // Animar elementos del card
    this.animacionCardTitulo(this.itemCardTitulo.nativeElement, 1500);
    this.animacionItems(this.itemCuenta.nativeElement, 1600);
    this.animacionItems(this.itemCorreo.nativeElement, 1700);
    this.animacionItems(this.itemNombre.nativeElement, 1800);
    this.animacionItems(this.itemApellido.nativeElement, 1900);
    this.animacionItems(this.itemNivelEducacional.nativeElement, 2000);
    this.animacionItems(this.itemFechaNacimiento.nativeElement, 2100);

  }

  public animacionItems(elementRef: any, duration: number) {
    const animation = this.animationController
      .create()
      .addElement(elementRef)
      .duration(duration)
      .iterations(1)
      .fromTo('transform', 'translateX(450px)', 'translateX(0px)')
      .fromTo('opacity', '0', '1');
    animation.play();
  }

  public animacionCardTitulo(elementRef: any, duration: number) {
    const animation = this.animationController
      .create()
      .addElement(elementRef)
      .duration(duration)
      .iterations(1)
      .fromTo('transform', 'translateY(-100px)', 'translateY(0px)');
    animation.play();
  }

}
