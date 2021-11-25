import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageInfo } from '../models/PageInfo';
  // Declaramos las variables para jQuery
  declare var $: any;
@Component({
  selector: 'blog-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pagesInfo: PageInfo[] = [];

  constructor(private http: HttpClient) {
    $(window).on('scroll', function () {
      if ($(window).scrollTop() > 200)
      {
        $('#mainNav').addClass('header-paint');
      } else
      {
        // remove the background property so it comes transparent again (defined in your css)
        $('#mainNav').removeClass('header-paint');
      }
    });
  }

  ngOnInit() {
    this.http.get('/assets/pages_info.json').subscribe( (pagesInfo: PageInfo[]) => {
      console.log(pagesInfo);
      this.pagesInfo = pagesInfo;
    });
  }
}
