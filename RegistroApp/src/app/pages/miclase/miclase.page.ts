import { QRCode } from 'jsqr';
import { Usuario } from 'src/app/model/usuario';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute,Router, NavigationExtras } from '@angular/router';
import { Asistencia } from 'src/app/model/asistencia';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {

  public usuario: Usuario;
  
  public asistencia: Asistencia = new Asistencia();
  public datosQR: string = '';

  @ViewChild('titulo', {read: ElementRef}) itemTitulo!:ElementRef; 
  @ViewChild('itemSede', {read: ElementRef}) itemSede!:ElementRef;
  @ViewChild('itemSigla', {read: ElementRef}) itemSigla!:ElementRef;
  @ViewChild('itemSeccion', {read: ElementRef}) itemSeccion!:ElementRef;
  @ViewChild('itemNombreAsignatura', {read: ElementRef}) itemNombreAsignatura!:ElementRef;
  @ViewChild('itemNombreProfesor', {read: ElementRef}) itemNombreProfesor!:ElementRef;
  @ViewChild('itemDia', {read: ElementRef}) itemDia!:ElementRef;
  @ViewChild('itemBloqueInicio', {read: ElementRef}) itemBloqueInicio!:ElementRef;
  @ViewChild('itemBloqueTermino', {read: ElementRef}) itemBloqueTermino!:ElementRef;
  @ViewChild('itemHoraInicio', {read: ElementRef}) itemHoraInicio!:ElementRef;
  @ViewChild('itemHoraTermino', {read: ElementRef}) itemHoraTermino!:ElementRef;
  @ViewChild('itemCardTitulo', {read: ElementRef}) itemCardTitulo!:ElementRef;

  constructor(
    private animationController: AnimationController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
  ) 
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(activatedRoute, router);
    
    this.activatedRoute.queryParamMap.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if(nav){
        if (nav.extras.state){
          this.datosQR = nav.extras.state['qrcode'];
          this.usuario.recibirUsuario(activatedRoute, router);
          return;
        }
      }
    });

  }

  ngOnInit() {
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;
    const objetoDatosQR = JSON.parse(datosQR);

    this.asistencia.bloqueInicio = objetoDatosQR.bloqueInicio;
    this.asistencia.bloqueTermino = objetoDatosQR.bloqueTermino;
    this.asistencia.dia = objetoDatosQR.dia;
    this.asistencia.horaFin = objetoDatosQR.horaFin;
    this.asistencia.horaInicio = objetoDatosQR.horaInicio;
    this.asistencia.idAsignatura = objetoDatosQR.idAsignatura;
    this.asistencia.nombreAsignatura = objetoDatosQR.nombreAsignatura;
    this.asistencia.nombreProfesor = objetoDatosQR.nombreProfesor;
    this.asistencia.seccion = objetoDatosQR.seccion;
    this.asistencia.sede = objetoDatosQR.sede;
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }

  public ngAfterViewInit(): void {
    if(this.itemTitulo){
      const animation = this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(7000)
      .fromTo('transform', 'translate(-92%)', 'translate(100%)')
    animation.play();
    };
  }

  public animacionItems(elementRef: any, duration: number) {
    const animation = this.animationController
    .create()
    .addElement(elementRef)
    .duration(duration)
    .iterations(1)
    .fromTo('transform', 'translateX(450px)', 'translateX(0px)')
    .fromTo('opacity', '0', '1');
    animation.play()
  }

  public animacionCardTitulo(ElementRef: any, duration: number) {
    const animation = this.animationController
    .create()
    .addElement(ElementRef)
    .duration(duration)
    .iterations(1)
    .fromTo('transform', 'translateY(-100px)', 'translateY(0px)');
    animation.play()
  }

  public ionViewDidEnter(){
    this.animacionItems(this.itemSede.nativeElement, 1500);
    this.animacionItems(this.itemSigla.nativeElement, 1600);
    this.animacionItems(this.itemSeccion.nativeElement, 1700);
    this.animacionItems(this.itemNombreAsignatura.nativeElement, 1800);
    this.animacionItems(this.itemNombreProfesor.nativeElement, 1900);
    this.animacionItems(this.itemDia.nativeElement, 2000);
    this.animacionItems(this.itemBloqueInicio.nativeElement, 2100);
    this.animacionItems(this.itemBloqueTermino.nativeElement, 2200);
    this.animacionItems(this.itemHoraInicio.nativeElement, 2300);
    this.animacionItems(this.itemHoraTermino.nativeElement, 2400);

    this.animacionCardTitulo(this.itemCardTitulo.nativeElement, 1500);

    this.mostrarDatosQROrdenados(this.datosQR);
  }

  
  

}
