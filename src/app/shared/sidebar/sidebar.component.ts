import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  get history(): string[] {
    return this.gifsS.history
  }

  constructor(private gifsS: GifsService ) {}

  buscar(query:string) {
    this.gifsS.searchGifs(query)
  }
}
