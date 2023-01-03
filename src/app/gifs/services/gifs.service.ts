import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root' // permite que los servicios esten definidos en el bundle de la app,
  // angular lo eleva a un nivel global de la app
})
export class GifsService {
  private _apiKey:string = 'OzXuWutoJdlCE6bXt1Xt48O3rk2Qhgyv';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];
  public results: Gif[] = [];

  get history():string[] {
    return [...this._history]
  }
  
  constructor( private http: HttpClient ) { 
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('lastResults')!) || [];
  }
  
  searchGifs(query:string) {
    query = query.trim().toLowerCase();
    if(!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0,10);
      localStorage.setItem('history', JSON.stringify(this._history))
    }
    const params = new HttpParams()
          .set('api_key', this._apiKey)
          .set('limit', '10')
          .set('q', query);

    this.http.get<SearchGIFResponse>(`${this.serviceURL}/search`, {params})
    .subscribe((resp) => {
      this.results = resp.data
      localStorage.setItem('lastResults', JSON.stringify(resp.data))
    })
  }
}
