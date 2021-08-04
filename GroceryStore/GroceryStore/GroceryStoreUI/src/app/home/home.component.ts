import { Reminders } from './../models/reminder';
import { Warehouse } from './../models/warehouse';
import { Grocery } from './../models/grocery';
import { Products } from './../models/products';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../Core/data.service';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  recognizer: any;
  allProducts: Warehouse[]
  boughtlist: Products[]
  allReminders: Reminders[]
  todayReminders: Reminders[] = []
  tmp: Reminders
  conversationText: any[]
  date = new Date();
  currentdate: string;
  showMessage = true;
  showMessageGrocery2;
  constructor(private service: DataService, private route: ActivatedRoute, private router: Router, private datepipe: DatePipe) {
    this.recognizer = this.RecognizerSetup(SpeechSDK, SpeechSDK.SpeechConfig.fromSubscription("5dcf85d6ef0443c3b16472dc2713f64f", "eastus"));
    this.showMessageGrocery2 = this.service.showMessageGrocery;

  }



  ngOnInit(): void {

    let id = +this.route.snapshot.paramMap.get('id');
    this.service.setGlobalId(id);
    this.service.current_id_user = id;
    //console.log(this.service.getGlobalId(), this.service.current_id_user)
    this.date = new Date();
    this.currentdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');

    this.service.getAllProducts()
      .subscribe(
        (pp: Warehouse[]) => {
          this.allProducts = pp;
        },
        error => console.log(error)
      )

    this.service.getAllReminders(id)
      .subscribe(
        (pp: Reminders[]) => {
          this.allReminders = pp;
          console.log(this.allReminders)
          this.allReminders.forEach(e => {
            console.log(e.remindDate, this.currentdate)
            if (e.remindDate == this.currentdate) {
              this.todayReminders.push(e)
            }
          });
        },
        error => console.log(error)
      )

  }

  RecognizerSetup(sdk: any, speechConfig: any) {
    let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    console.log('Speak into your microphone.');
    return recognizer;
  }

  clickX() {
    this.showMessage = false;
  }

  clickGrocery() {
    this.service.showMessageGrocery = false;
    this.showMessageGrocery2 = false;
  }

}
