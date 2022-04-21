import { Component, HostListener, OnInit } from '@angular/core';
import { PageInfo } from 'src/app/models/PageInfo';
import { ConfigService } from 'src/app/@core/services/config.service';
import { AssetsService } from 'src/app/@core/services/data/assets.service';
  // Declaramos las variables para jQuery
  declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pagesInfo: PageInfo[] = [];
  needHeader: boolean;

  constructor(private assetsService: AssetsService, private config: ConfigService) {
    this.config.needHeaderVar$.subscribe( data => {
      this.needHeader = data;
      if(!this.needHeader)
      {
        $('#mainNav').addClass('header-paint');
      }
      else
      {
        $('#mainNav').removeClass('header-paint');
      }
    });
  }

  @HostListener("window:scroll", ["$event"])
  onScroll()
  {
    if ($(window).scrollTop() > 200 || !this.needHeader)
    {
      $('#mainNav').addClass('header-paint');
    } 
    else
    {
      $('#mainNav').removeClass('header-paint');
    }
  }

  ngOnInit() {
    this.assetsService.getPagesInfo().subscribe( (pagesInfo: PageInfo[]) => {
      this.pagesInfo = pagesInfo;
    });
  }
}
