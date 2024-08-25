import { Component, ElementRef, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'maids-dashboard';
  isMobile = false;

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.isMobile = event.target.innerWidth < 768;
  }
   
  constructor(private el:ElementRef, private router: Router){}
  ngOnInit(): void {

    let alldrpdwn = document.querySelectorAll('.dropdown-container');
    console.log(alldrpdwn,'alldrpdwn#');
    alldrpdwn.forEach((item:any)=>{
      const a = item.parentElement?.querySelector('a:first-child');
      console.log(a,'a#');
      a.addEventListener('click',(e:any)=>{
          e.preventDefault();
          this.el.nativeElement.classList.toggle('active');
          item.classList.toggle('show');
      });
      
    });

  }
 
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchName = inputElement.value.trim().toLowerCase();
  
    if (searchName) {
      this.router.navigate(['/search', searchName]);
    } else {
      this.router.navigate(['/users']); // Reset to the full list if the search field is empty
    }
  }


  
  // responsivemenu 
  responsiveMenu:any;
  // responsivemaincontent
  responsiveContent:any;
  defaultStatus=true;
  openNav(status:any)
  {
    if(status===this.defaultStatus)
    {
      this.responsiveMenu = {
        'display':'block'
      }
      this.responsiveContent={
        'margin-left':'150px'
      }
      this.defaultStatus = false;
    }else
    {
      this.responsiveMenu = {
        'display':null
      }
      this.responsiveContent={
        'margin-left':null
      }
      this.defaultStatus=true;
    }

  }

}
