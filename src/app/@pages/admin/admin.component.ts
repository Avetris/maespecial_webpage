import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  content = [
    {
      title: "Recursos",
      route: "/admin/resources"
    },
    {
      title: "Post",
      route: "/admin/posts"
    },
    {
      title: "Crear Post",
      route: "/admin/change-post"
    }
  ]
}
