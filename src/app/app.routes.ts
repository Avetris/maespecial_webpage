import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ResourcesModule } from './@pages/resources/resources.module';

const APP_ROUTES: Routes = [
    { path: 'home', loadChildren: () => import('./@pages/home/home.module').then(m => m.HomeModule)},
    { path: 'resources', children: [
        { path: '', loadChildren: () => import('./@pages/resources/resources.module').then(m => m.ResourcesModule)},         
        { path: 'companions', loadChildren: () => import('./@pages/resources/element/resources-element.module').then(m => m.ResourcesElementModule)},
        { path: 'theories', loadChildren: () => import('./@pages/resources/element/resources-element.module').then(m => m.ResourcesElementModule)},
        { path: 'commercials', loadChildren: () => import('./@pages/resources/element/resources-element.module').then(m => m.ResourcesElementModule)},
        { path: 'ownCreation', loadChildren: () => import('./@pages/resources/element/resources-element.module').then(m => m.ResourcesElementModule)},    
    ]},
    { path: 'diary', loadChildren: () => import('./@pages/portfolio/portfolio.module').then(m => m.PortfolioModule)},
    { path: 'contact', loadChildren: () => import('./@pages/contact/contact.module').then(m => m.ContactModule)},
    { path: 'privacy-policy', loadChildren: () => import('./@pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)},
    { path: 'admin', children: [
        { path: '', loadChildren: () => import('./@pages/admin/create-post/create-post.module').then(m => m.CreatePostModule)},
        { path: 'create', loadChildren: () => import('./@pages/admin/create-post/create-post.module').then(m => m.CreatePostModule)}
    ]},
    { path: '**', pathMatch: 'full' , redirectTo: 'home' },
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, { useHash: true, scrollPositionRestoration: 'enabled'});
