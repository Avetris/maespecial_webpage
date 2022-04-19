import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuardService as AuthGuard } from './@core/services/auth/auth-guard.service';
import { LoginComponent } from './@pages/admin/login/login.component';
import { CreatePostComponent } from './@pages/admin/create-post/create-post.component';
import { HomeComponent } from './@pages/home/home.component';
import { HomeComponent as Home2Component } from './@pages/home2/home.component';
import { ResourcesComponent } from './@pages/resources/resources.component';
import { ResourcesElementComponent } from './@pages/resources/element/resources-element.component';
import { PortfolioComponent } from './@pages/portfolio/portfolio.component';
import { ContactComponent } from './@pages/contact/contact.component';
import { PrivacyPolicyComponent } from './@pages/privacy-policy/privacy-policy.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'home2', component: Home2Component},
    { path: 'resources', children: [
        { path: '', component: ResourcesComponent},
        { path: 'companions', component: ResourcesElementComponent},
        { path: 'theories', component: ResourcesElementComponent},
        { path: 'commercials', component: ResourcesElementComponent},
        { path: 'ownCreation', component: ResourcesElementComponent},
    ]},
    { path: 'diary', component: PortfolioComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'privacy-policy', component: PrivacyPolicyComponent},
    { path: 'admin', children: [
        { path: 'login', component: LoginComponent},
        { path: 'create-post', canActivate: [AuthGuard], component: CreatePostComponent},
        { path: 'create-resource', canActivate: [AuthGuard], component: CreatePostComponent}
    ]},
    { path: '**', pathMatch: 'full' , redirectTo: 'home' },
];

export const AppRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forRoot(APP_ROUTES, { useHash: true, scrollPositionRestoration: 'enabled'});
