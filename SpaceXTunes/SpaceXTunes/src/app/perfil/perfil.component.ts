import { Albums } from './../models/albums';
import { allAlbums } from './../mocks/albumsMock';
import { DataService } from './../core/data.service';
import { Component, OnInit } from '@angular/core';
import { Songs } from '../models/songs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private service: DataService) { }


  mycart: Albums[];
  albumDuration = 0;
  songlist: Songs[];

  ngOnInit(): void {
    //this.mycart = this.service.getPurchasesList();
    this.service.getPurchasesList()
    .subscribe(
      (album : Albums[]) => {
        this.mycart = album;
        album.forEach(x => {this.songlist = x.songs});
      },
      error => console.log(error)
    )
  }

  getlengthAlbum(itemalbum: Albums){
    let total = 0;
    itemalbum.songs.forEach( songitem => {total = total + songitem.duration} )
    return total;
  }

}
