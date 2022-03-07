import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

let MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatCardModule,
  MatDividerModule,
 
];

@NgModule({
  
  imports: [MaterialComponents],
  exports: [MaterialComponents]

})
export class MaterialModule { }
