import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Snippet } from '../../../models/snippet';

@Component({
  selector: 'app-create-bin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-bin.component.html',
  styleUrl: './create-bin.component.css',
})
export class CreateBinComponent {
  constructor(private dbService: DbService) {}
  isLoading = false;
  title = new FormControl('', [Validators.required]);
  code = new FormControl('', [Validators.required]);

  binForm = new FormGroup({
    title: this.title,
    code: this.code,
  });

  create() {
    this.isLoading = true;
    this.dbService.createSnippet(this.binForm.value as Snippet).finally(() => {
      this.isLoading = false;
    });
  }
}
