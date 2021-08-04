import { Voice } from './../models/voice';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { DataService } from '../Core/data.service';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { VariableBinding } from '@angular/compiler';
import { Grocery } from '../models/grocery';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  recognizer: any;
  constructor(private route: ActivatedRoute, private router: Router, private service: DataService) { this.recognizer = this.RecognizerSetup(SpeechSDK, SpeechSDK.SpeechConfig.fromSubscription("5dcf85d6ef0443c3b16472dc2713f64f", "eastus")); }

  globalId: number;

  listG: Grocery[];

  isLoadingTwo = false;
  loadTwo(): void {
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
    }, 5000);
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.globalId = id


    this.service.setGlobalId(id)
    this.service.getGroceriesByUser(id)
      .subscribe(
        (list: Grocery[]) => {
          this.listG = list
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

  speech: string;

  TurnOnmic(event: any) {


    this.recognizer.recognizeOnceAsync((result: any) => {

      this.speech = result.text;
      console.log(`RECOGNIZEDx: Text=${result.text}`);
      if (this.speech == "Log out.") {
        this.router.navigate(['/login']);
      }


      var splits = this.speech.split(" ");
      if (splits[0].toLocaleLowerCase() == "show" || splits[0].toLocaleLowerCase() == "please") {
        for (var x = 0; x < splits.length; x++) {
          console.log(splits[x])
          if (splits[x].toLocaleLowerCase() == "list" || splits[x].toLocaleLowerCase() == "list.") {
            this.router.navigate(["groceries/" + this.globalId.toString()]);
          }
        }
      }

      console.log("SEND TO SERVICE");
      this.service.sendVoice(this.speech, this.globalId).subscribe();

    });


  }


}
