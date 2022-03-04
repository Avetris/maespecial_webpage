import { ConfigService } from './../../services/config.service';
import { Component, DebugElement, ViewEncapsulation  } from '@angular/core';
// Declaramos las variables para jQuery
declare var $: any;

@Component({
  selector: 'blog-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  bgUrl: string;
  title: string;
  btntitle: string;
  needHeader: boolean
  constructor(private config: ConfigService) {
    this.config.bgVar$.subscribe( data => {
      this.bgUrl = data;
    });
    this.config.titleVar$.subscribe( data => {
      this.title = data;
    });
    this.config.btnTitlVar$.subscribe( data => {
      this.btntitle = data;
    });
    this.config.needHeaderVar$.subscribe( data => {
      this.needHeader = data;
      if(this.needHeader)
      {
        $(window).on('load', function () {
          setTimeout(getText, 1);
        });      
      }
    });

    function getText()
    {
      var text = $(".animated-title").text();
       $(".animated-title").text("");

      var em = $('<em class="caption-title-word"></em>');

      for (var i = 0; i < text.length; i++) {
        var span = $('<span class="title-header"></span></span>');
        span.append('<span class="cry-single" style="animation-delay: 0s;">' + text[i] + '</span>');
        span.append('<span class="cry-double" style="animation-delay: 0s;">' + text[i] + '</span>');
        em.append(span);
      }
      $(".animated-title").append(em);

      changeLettersColor();
      setInterval(changeLettersColor, 3000);
    }

    function changeLettersColor()
    {
      $(".animated-letter").removeClass("animated-letter").css( 'animation-delay', '0s' );
      var elements = $(".title-header").toArray();
      var numItems = Math.floor((Math.random() * (4 - 1)) + 1);
      while(numItems > 0)
      {
        var index = Math.floor((Math.random() * (elements.length - 1)) + 1);
        var elem = $(elements[index]);
        if(elem.text() != " ")
        {
          $(elem).children().addClass("animated-letter").css( 'animation-delay', '0ms' );
          elements.splice(index, 1);
          numItems--;
        }
      }
    }
  }
}
