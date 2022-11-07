import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OsmMapComponent } from './maps.component';



@NgModule({
    imports: [ RouterModule, CommonModule
      ],

      declarations: [ OsmMapComponent ],
      exports: [ OsmMapComponent ]
   
  
   

})

export class MapModule {}
