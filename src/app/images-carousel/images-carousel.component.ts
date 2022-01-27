import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-images-carousel',
  templateUrl: './images-carousel.component.html',
  styleUrls: ['./images-carousel.component.css']
})
export class ImagesCarouselComponent implements OnInit {

  @Input() images: string[] = [];

  constructor() { }

  ngOnInit(): void {


  }

}
