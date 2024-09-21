import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AnimationController } from '@ionic/angular';
import { ElementRef, ViewChild, } from '@angular/core';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {
  @ViewChild('itemCardTitulo', {read: ElementRef}) itemCardTitulo!:ElementRef;
  @ViewChild('itemCardSubTitulo', {read: ElementRef}) itemCardSubTitulo!:ElementRef;
  @ViewChild('itemBoton', {read: ElementRef}) itemBoton!:ElementRef;


  constructor(
    private router: Router,
    private animationController: AnimationController // Inyecta AnimationController aquí
  ) { }

  ngOnInit() { }
   


  redirigirAlLogin(): void {
    this.router.navigate(['/login']); 
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

}
