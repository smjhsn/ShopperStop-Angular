import { Component } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  carousel1:any[]=[];
  carousel2:any[]=[];
  constructor(private service:CommonService){};

  getdata1:any= this.service.getCarouselImage1().subscribe((data:any)=>{
    this.carousel1 = data;
  });
  getdata2:any= this.service.getCarouselImage2().subscribe((data:any)=>{
    this.carousel2 = data;
  })

}
