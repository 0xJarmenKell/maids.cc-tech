import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta:Meta) {}
  generateTage(config: any) {
       config = {
          title: 'Something',
          description: 'My SEO friendly angular application',
          ...config
       }

       this.meta.updateTag({name: 'users page', content: 'this is our users and clients'});
  }
}
