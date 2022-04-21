import { Component } from '@angular/core';
import { PageInfo } from 'src/app/models/PageInfo';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent {

  pagesInfo: PageInfo[] = [
    {
        routeName: "/admin",
        textName: "Inicio",
        children: []
    },
    {
        routeName: "/admin/resources",
        textName: "Recursos",
        children: []
    },
    {
        routeName: "/admin/posts",
        textName: "Posts",
        children: []
    },
    {
        routeName: "/admin/change-post",
        textName: "Create Posts",
        children: []
    }
];
}
