import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AllSnippetsResult } from '../../../models/snippet';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PageSpinnerComponent } from '../page-spinner/page-spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PageSpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private dbService: DbService, private routes: Router) {}
  isLoading = false;
  items: AllSnippetsResult[] = [];
  ngOnInit(): void {
    this.isLoading = true;
    this.dbService
      .getAllSnippets()
      .then((data: AllSnippetsResult[]) => {
        console.log('data', data);
        this.items = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
        console.log(error);
      });
  }
}
