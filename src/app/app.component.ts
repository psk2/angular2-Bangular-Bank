import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PSK !';
  image = "https://gurayyarar.github.io/AdminBSBMaterialDesign/images/user-img-background.jpg";
  links = [
    {
      name: 'Search',
      url : 'search'
    },
    {
      name: 'Circular',
      url : 'circular'
    },
    {
      name: 'Blood Banks',
      url : 'bloodBanks'
    },
    {
      name: 'Create Blood Bank',
      url : 'createBloodBank'
    },
    {
      name: 'tables',
      url : 'tables'
    }
  ];

  // image = "http://localhost:4200/images/user-img-background.jpg"
  // constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
  //   iconRegistry.addSvgIcon(
  //       'thumbs-up',
  //       sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  // }
}
