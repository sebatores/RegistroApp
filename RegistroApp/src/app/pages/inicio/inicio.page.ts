import { Usuario } from 'src/app/model/usuario';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { ActivatedRoute,Router, NavigationExtras } from '@angular/router';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import jsQR, { QRCode } from 'jsqr';
import { Asistencia } from 'src/app/model/asistencia';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public usuario: Usuario;
  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: string = '';

  @ViewChild('titulo', {read: ElementRef}) itemTitulo!:ElementRef;
  @ViewChild('cardTitulo', {read: ElementRef}) itemCardTitulo!:ElementRef;
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;

  constructor(
    private animationController: AnimationController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) 
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngOnInit() {
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }

  // Metodos para QR

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });

    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));

  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;

      requestAnimationFrame(this.verificarVideo.bind(this));

    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h,
      { inversionAttempts: 'dontInvert'});
    if (qrCode) {
      if (qrCode.data != '') {
        this.escaneando = false;

        const navigationExtras: NavigationExtras = {
          state: {
            qrcode: qrCode.data,
            cuenta: this.usuario.cuenta,
            password: this.usuario.password
          }
        };
        
        this.router.navigate(['/miclase'], navigationExtras);
        return true;
      }
    }
    return false;
  }

  
  public detenerEscaneoQR(): void {
    this.escaneando = false;
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
    }
  }

  public animateItem1(elementRef: any, duration: number) {
    const animation = this.animationController
    .create()
    .addElement (elementRef)
    .iterations(1)
    .duration(duration)
    .easing('ease-in')
    .fromTo('opacity', 0, 1);
    animation.play();
  }

  public ionViewDidEnter(){
    this.animateItem1(this.itemCardTitulo.nativeElement,3000);
  }

}
