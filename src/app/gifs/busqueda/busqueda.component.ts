import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsS: GifsService) {}

  buscar() {
    const inputText = this.txtBuscar.nativeElement.value;
    if(inputText.trim().length === 0) {return;}
    this.gifsS.searchGifs(inputText)
    this.txtBuscar.nativeElement.value = '';
  }
}
