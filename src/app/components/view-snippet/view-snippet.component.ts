import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db.service';
import { DocumentData } from 'firebase/firestore';
import { PageSpinnerComponent } from '../page-spinner/page-spinner.component';

interface GetSnippetByIdRes extends DocumentData {
  title: string;
  code: string;
}

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [PageSpinnerComponent],
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.css',
})
export class ViewSnippetComponent implements OnInit {
  isLoading = false;
  codeSnippet: GetSnippetByIdRes = {
    title: '',
    code: '',
  };
  constructor(private route: ActivatedRoute, private dbServices: DbService) {}

  ngOnInit(): void {
    this.isLoading = true;
    const docID = this.route.snapshot.paramMap.get('id');
    this.dbServices
      .getSnippetById(docID!)
      .then((data: DocumentData) => {
        this.codeSnippet = data as GetSnippetByIdRes;
      })
      .finally(() => (this.isLoading = false));
  }
}
