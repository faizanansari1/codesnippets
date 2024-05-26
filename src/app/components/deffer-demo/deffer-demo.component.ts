import { Component } from '@angular/core';
import { HeavyComponent } from '../heavy/heavy.component';

@Component({
  selector: 'app-deffer-demo',
  standalone: true,
  imports: [HeavyComponent],
  templateUrl: './deffer-demo.component.html',
  styleUrl: './deffer-demo.component.css',
})
export class DefferDemoComponent {}
