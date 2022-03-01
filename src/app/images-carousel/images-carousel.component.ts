import { AfterViewInit, Component, Input } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-images-carousel',
  templateUrl: './images-carousel.component.html',
  styleUrls: ['./images-carousel.component.css']
})
export class ImagesCarouselComponent implements AfterViewInit {

  @Input() images: string[] = [];

  private _albums: Array<any> = [];

  constructor(    private _lightbox: Lightbox) {
    }


  ngAfterViewInit(): void {

    this.images.forEach((image) => {
      this._albums.push({ src: image });
    });

  }


  open(index: number): void {
    this._lightbox.open(this._albums, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

}
