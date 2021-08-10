import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  discordLink = "https://www.google.es";
  twitterLink = "https://www.youtube.es";
  instagramLink = "#";
  youtubeLink = "#";

  constructor() { }

  ngOnInit(): void {
  }

}
