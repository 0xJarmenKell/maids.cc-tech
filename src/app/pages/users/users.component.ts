import { Component, ChangeDetectorRef  } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../services/seo.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit {
  users: any[] = [];
  currentPage: number = 1;
  filteredUsers: any[] = [];
  searchName: string = '';
  

  constructor(
    private userService: UserService,
     private router: Router,
     private http: HttpClient,
     private route: ActivatedRoute,
     private cdr: ChangeDetectorRef,
     private seoService: SeoService,
     private meta: Meta,
     private title: Title
    
    ) {}

  // ngOnInit(): void {
  //   this.loadUsers(this.currentPage);
  // }

  // loadUsers(page: number): void {
  //   this.userService.getUsers(page).subscribe((response: any) => {
  //     this.users = response.data;
  //   });
  // }

  ngOnInit(): void {
    // this.seoService.generateTage({
    //   title: 'Users Page',
    //   description: 'This is our users and clients page'
    // });
    
    this.title.setTitle('users page');
    this.meta.updateTag({name: 'description', content: 'This is our users and clients pagesss'});

    this.route.params.subscribe((params) => {
      this.searchName = params['name'] ? params['name'].toLowerCase() : '';
      console.log(this.searchName); // Check if the search name is correct
      this.fetchUsers(this.currentPage);
    });
  }

  fetchUsers(page: number): void {
    this.http.get(`https://reqres.in/api/users?page=${page}`).subscribe((response: any) => {
      this.users = response.data;
      console.log(this.users);  // Check if users are correctly fetched
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (this.searchName) {
      this.filteredUsers = this.users.filter((user) =>
        `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`.includes(this.searchName)
      );
      console.log(this.filteredUsers);  // Check if users are correctly filtered
    } else {
      this.filteredUsers = this.users;
    }
    this.cdr.detectChanges();
  }

  onUserClick(id: number): void {
    this.router.navigate(['/user', id]);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchUsers(page);
  }
}
