import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuardService as AuthGuard } from './@core/services/auth/auth-guard.service';
import { LoginComponent } from './@pages/admin/login/login.component';
import { CreatePostComponent } from './@pages/admin/create-post/create-post.component';

const APP_ROUTES: Routes = [
    { path: 'home', loadChildren: () => import('./@pages/home/home.module').then(m => m.HomeModule)},
    { path: 'home2', loadChildren: () => import('./@pages/home2/home.module').then(m => m.HomeModule)},
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
        { path: 'login', component: LoginComponent},
        { path: 'create-post', canActivate: [AuthGuard], component: CreatePostComponent},
        { path: 'create-resource', canActivate: [AuthGuard], component: CreatePostComponent}
    ]},
    { path: '**', pathMatch: 'full' , redirectTo: 'home' },
];

export const AppRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forRoot(APP_ROUTES, { useHash: true, scrollPositionRestoration: 'enabled'});
