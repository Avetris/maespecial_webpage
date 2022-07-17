import { ConfigService } from 'src/app/@core/services/config.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { TimeInterval } from 'rxjs';
import { TranslateConfigService } from '../../services/translate-config.service';
import { LoginComponent } from 'src/app/@pages/admin/login/login.component';
// Declaramos las variables para jQuery
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  bgUrl: string;
  title: string;
  btntitle: string;
  needHeader: boolean
  letterColorInterval: NodeJS.Timer;
  constructor(
    private config: ConfigService,
    private scroller: ViewportScroller) {
    this.config.bgVar$.subscribe(data => {
      this.bgUrl = data;
    });
    this.config.titleVar$.subscribe(data => {
        this.title = data;
    });
    this.config.btnTitlVar$.subscribe(data => {
      this.btntitle = data;
    });
    this.config.needHeaderVar$.subscribe(data => {
      this.needHeader = data;
    });
  }


  public getText() {
    if(!this.needHeader) return;
    let animatedTitle = $(".animated-title");
    let child = animatedTitle.lastElementChild;
    while (child) {
      animatedTitle.removeChild(child);
      child = animatedTitle.lastElementChild;
    }

    while($(".animated-title").text())

    console.log()
    var text = animatedTitle.text();
   // animatedTitle.text("");
    console.log(text);

    var em = $('<em class="caption-title-word"></em>');

    for (var i = 0; i < text.length; i++) {
      var span = $('<span class="title-header"></span></span>');
      span.append('<span class="cry-single" style="animation-delay: 0s;">' + text[i] + '</span>');
      span.append('<span class="cry-double" style="animation-delay: 0s;">' + text[i] + '</span>');
      em.append(span);
    }
    animatedTitle.append(em);

    this.changeLettersColor();
    if (this.letterColorInterval != undefined)
      clearInterval(this.letterColorInterval);
      this.letterColorInterval = setInterval(this.changeLettersColor, 3000);
  }

  changeLettersColor() {
    $(".animated-letter").removeClass("animated-letter").css('animation-delay', '0s');
    var elements = $(".title-header").toArray();
    var numItems = Math.floor((Math.random() * (4 - 1)) + 1);
    while (numItems > 0) {
      var index = Math.floor((Math.random() * (elements.length - 1)) + 1);
      var elem = $(elements[index]);
      if (elem.text() != " ") {
        $(elem).children().addClass("animated-letter").css('animation-delay', '0ms');
        elements.splice(index, 1);
        numItems--;
      }
    }
  }

  goDown() {
    this.scroller.setOffset([0, 100]);
    this.scroller.scrollToAnchor("body");
  }
}
