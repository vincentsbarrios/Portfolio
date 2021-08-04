import { Albums } from './../models/albums';
import { DataService } from './../core/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Songs } from '../models/songs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  constructor(private route : ActivatedRoute, private service: DataService) { }

  detailsAlbums: Albums; //SELECTED ALBUM 
  songslist: Songs[]; //LIST OF SONGS
  albums: Albums[] //ALL ALBUMS

  selectedAlbum;

  //RATING VALUES
  value: any;
  valueS: any;
  tooltips = [1,2,3,4,5];

  //NOTIFICATION
  show: boolean = false;
  songName: string;

  

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    //this.albums = this.service.getAlbums();

    this.service.getAlbumById(id)
    .subscribe(
      (album : Albums) => {
        this.detailsAlbums = album;
        this.value = this.detailsAlbums.rating
        this.songslist = this.detailsAlbums.songs;
        this.valueS = this.detailsAlbums.popularity;
      },
      error => console.log(error)
    )
  }

  onClickSong(itemsong : Songs){
    console.log(itemsong.name )
    this.songName = itemsong.name;
    this.show = true;
    itemsong.state = true;
    this.service.addPurchaseSong(this.detailsAlbums,itemsong.id).subscribe(
      al => this.songslist = al.songs
    );
  }

  closeNotification(){
    this.show = false;
  }

  onRating(){
    this.detailsAlbums.rating = this.value;
    this.service.changeRating(this.detailsAlbums).subscribe();
  }

  addToCart( item: Albums){
      //this.service.addPurchases(item);
      console.log("add"+item.albumName)
      //console.log(this.service.getPurchasesList().length)
      this.service.addPurchases(item).subscribe(
        al => {this.detailsAlbums = al}
      );
  }

}
