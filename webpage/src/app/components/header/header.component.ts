import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('imgOnChangePage', [
      state('open', style({
        height: '100%',
      })),
      state('closed', style({
        height: '30%',
      })),
      transition('open => closed', [
        animate('1s')
      ])
    ]),    
    trigger('navOnChangePage', [
      state('hidden', style({
        opacity: 0,
      })),
      state('show', style({
        opacity: 1,
      })),
      transition('hidden => show', [
        animate('1s')
      ])
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  @Input() hasEnter = false;

  structure = [
    {
      title: "foo",
      link: "/foo",
      children: [
        {
          title: "bar",
          link: "/bar",
          children: []
        }
      ]
    },
    {
      title: "baz",
      link: "/baz",
      children: []
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    document.addEventListener("DOMContentLoaded", function () {

      /////// Prevent closing from click inside dropdown
      document.querySelectorAll('.dropdown-menu').forEach(function (element) {
        element.addEventListener('click', function (e) {
          e.stopPropagation();
        });
      })
      // make it as accordion for smaller screens
      if (window.innerWidth < 992) {

        // close all inner dropdowns when parent is closed
        document.querySelectorAll('.navbar .dropdown').forEach(function (everydropdown) {
          everydropdown.addEventListener('hidden.bs.dropdown', function (this: Element) {
            // after dropdown is hidden, then find all submenus
            this.querySelectorAll('.submenu').forEach(function (everysubmenu: any) {
              // hide every submenu as well
              everysubmenu.style.display = 'none';
            });
          })
        });

        document.querySelectorAll('.dropdown-menu a').forEach(function (element) {
          element.addEventListener('click', function (this: Element, e: Event) {

            let nextEl = this.nextElementSibling;
            if (nextEl && nextEl.classList.contains('submenu')) {
              // prevent opening link if link needs to open dropdown
              e.preventDefault();
              if ((nextEl as HTMLElement).style.display == 'block') {
                (nextEl as HTMLElement).style.display = 'none';
              } else {
                (nextEl as HTMLElement).style.display = 'block';
              }

            }
          });
        })
      }
      // end if innerWidth
    });
  }

  enter() {
    this.hasEnter = true;
    this.router.navigateByUrl('/about');
  }
}
