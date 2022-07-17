import { Header } from './header.interface';

export const HOME: Header =
{
    title: 'home.header.description',
    button: 'home.header.button',
    isButtonText: true,
    bg: './assets/img/home.jpg',
    needHeader: true
};

export const PROFILE: Header =
{
    needHeader: false
};

export const DIARY: Header =
{
    needHeader: false
};

export const RESOURCES: Header =
{
    title: 'resources.header.description',
    needHeader: false
};

export const RESOURCES_COMPANIONS: Header =
{
    title: 'resources.header.description',
    button: 'resources.menu.companions',
    isButtonText: true,
    bg: './assets/img/resources/companions.jpg',
    needHeader: true
};

export const RESOURCES_THEORIES: Header =
{
    title: 'resources.header.description',
    button: 'resources.menu.theories',
    isButtonText: true,
    bg: './assets/img/resources/theories.png',
    needHeader: true
};

export const RESOURCES_COMMERCIALS: Header =
{
    title: 'resources.header.description',
    button: 'resources.menu.commercials',
    isButtonText: true,
    bg: './assets/img/resources/commercials.jpg',
    needHeader: true
};

export const RESOURCES_OWNCREATIONS: Header =
{
    title: 'resources.header.description',
    button: 'resources.menu.ownCreation',
    isButtonText: true,
    bg: './assets/img/resources/owncreations.jpg',
    needHeader: true
};

export const PRIVACY_POLICY: Header =
{
    title: 'privacyPolicy.title',
    needHeader: false
};

export const CONTACT: Header =
{
    title: 'contact.title',
    needHeader: false
};
