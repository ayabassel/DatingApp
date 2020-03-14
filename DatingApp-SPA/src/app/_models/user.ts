import { PathLocationStrategy } from '@angular/common';
import { Photo } from './photo';

export interface User {
    username: string;
    id: string;
    knownAs: string;
    age: string;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    introduction?: string;
    description?: string;
    lookingFor?: string;
    interests?: string;
    photos?: Photo[];



}
