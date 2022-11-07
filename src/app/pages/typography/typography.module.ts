import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TypographyComponent } from './typography.component';



@NgModule({
    imports: [ RouterModule, CommonModule
      ],

      declarations: [TypographyComponent],
      exports: [ TypographyComponent]
   
  
   

})

export class TypoModule {}
