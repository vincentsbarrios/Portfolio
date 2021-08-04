import { DataService } from './../core/data.service';
import { Component, OnInit } from '@angular/core';
import { Albums } from '../models/albums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: DataService) { }

  albums: Albums[];
  detailsAlbums: Albums;

  array = [
    "https://wallpaperaccess.com/full/3455302.jpg", 
    "https://www.yardbarker.com/media/b/8/b8601cf5a1ce6be0421f710c8cdf89f05db3dd97/thumb_16x9/GettyImages-74290244.jpg", 
    "https://images.squarespace-cdn.com/content/v1/53b6eb62e4b06e0feb2d8e86/1442354145353-1KLQF9BTGU2BX4BZLWXG/ke17ZwdGBToddI8pDm48kKfDysgM9MiVJD9ObbUPbxUUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dnoe0RlCO1M6pPmznpm38x1wibRT7acEDpzEA3xY6AyMOpYghpI-Ha_TwZsqqmJXng/SamSpratt_Logic_TheIncredibleTrueStory_AlbumArt_Panorama_FB.jpg?format=2500w", 
    "https://i1.wp.com/musicmayhemmagazine.com/wp-content/uploads/2019/05/Screen-Shot-2019-05-08-at-11.21.19-PM.png?fit=1200%2C779&ssl=1"];
  effect = 'scrollx';

  ngOnInit(): void {
    this.service.getAllAlbums()
    .subscribe(
      (album : Albums[]) => {
        this.albums = album;
        console.log(this.albums)
      },
      error => console.log(error)
    )
  }

  onClickDetail( albumsDetail : Albums) : void{
    //this.detailsAlbums = albumsDetail;
  }

  addToCartHome( item: Albums, event: Event){
    event.stopPropagation();
    console.log(item.state)
    this.service.addPurchases(item).subscribe();
    this.ngOnInit();
    //item.state = true;
}

}
