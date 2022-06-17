import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuardService as AuthGuard } from './@core/services/auth/auth-guard.service';
import { LoginComponent } from './@pages/admin/login/login.component';
import { CreatePostComponent } from './@pages/admin/create-post/create-post.component';
import { HomeComponent } from './@pages/home/home.component';
import { ResourcesComponent } from './@pages/resources/resources.component';
import { ResourcesElementComponent } from './@pages/resources/element/resources-element.component';
import { PrivacyPolicyComponent } from './@pages/privacy-policy/privacy-policy.component';
import { ManageResourcesComponent } from './@pages/admin/manage-resources/manage-resources.component';
import { DiaryComponent } from './@pages/diary/diary.component';
import { PostsComponent } from './@pages/admin/posts/posts.component';
import { ProfileComponent } from './@pages/profile/profile.component';
import { AdminComponent } from './@pages/admin/admin.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileComponent },
    {
        path: 'resources', children: [
            { path: '', component: ResourcesComponent },
            { path: 'companions', component: ResourcesElementComponent },
            { path: 'theories', component: ResourcesElementComponent },
            { path: 'commercials', component: ResourcesElementComponent },
            { path: 'ownCreation', component: ResourcesElementComponent },
        ]
    },
    {
        path: 'diary', children: [
            { path: '', component: DiaryComponent },
            { path: ':id', component: DiaryComponent },
        ]
    },
    // { path: 'contact', component: ContactComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    {
        path: 'admin', children: [
            { path: '', canActivate: [AuthGuard], component: AdminComponent },
            { path: 'login', component: LoginComponent },
            { path: 'resources', canActivate: [AuthGuard], component: ManageResourcesComponent },
            { path: 'posts', canActivate: [AuthGuard], component: PostsComponent },
            {
                path: 'change-post', children: [
                    { path: '', canActivate: [AuthGuard], component: CreatePostComponent },
                    { path: ':id', canActivate: [AuthGuard], component: CreatePostComponent },
                ]
            },
            { path: '**', pathMatch: 'full', redirectTo: '' },
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const AppRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forRoot(APP_ROUTES, { useHash: true, scrollPositionRestoration: 'enabled' });
