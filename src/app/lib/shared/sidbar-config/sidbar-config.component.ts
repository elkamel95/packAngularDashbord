import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Widget } from '../../models/Widget';
import { ServiceWidgetService } from '../../services/widget/service-widget.service';
import { ModeDisposition } from '../../models/ModeDisposition';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material';
import { DialogResetComponent } from '../../components/dialog-reset/dialog-reset.component';

@Component({

  selector: 'sidbar-config',
  templateUrl: './sidbar-config.component.html',
  styleUrls: ['./sidbar-config.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SidbarConfigComponent implements OnInit {
  data:Widget = new Widget() ; 
  allWidgetToBeConfigured : any[] =[new Widget()];
  ModeLayout : ModeDisposition;
  removeYes =false ;
typePermut ="";

  @ViewChild('graphiqueComp', { static: false }) public mydiv: ElementRef;

    font_size =[
    "large","larger","medium","small","smaller","x-large","x-small","xx-large","xx-small","-webkit-xxx-large"
    ]
    size =[
      "8","10","12","14","15","16","18","20","22","25","30"
      ]
    font_style =[
      "900","bold","bolder","inherit","initial",
      "lighter","normal","unset"
          ]
  chartOptions: { };
  screenWidth: number;
  constructor(private serviceWidget:ServiceWidgetService,private cookieService: CookieService,public dialog: MatDialog) {
    this.screenWidth= serviceWidget.screenWidth - (10* serviceWidget.screenWidth/100);
    
   serviceWidget.currentWidget.subscribe(widget=>{
    this.data = widget ;

    
  if(this.allWidgetToBeConfigured[0].id == '')
  this.allWidgetToBeConfigured[0]=this.data;
if(this.allWidgetToBeConfigured[0].id == this.data.id)
this.allWidgetToBeConfigured[0]=this.data;


var addAndRemove =true ; 
for (var i= 0 ; i <this.allWidgetToBeConfigured.length;i++){
 
  if(this.allWidgetToBeConfigured[i].id === this.data.id)
{
  addAndRemove=false ;
}

}
   
   
if(addAndRemove)
this.allWidgetToBeConfigured.push(this.data);
  
    

}
   
  );


  
    

  }


   
  openReste(element?) {

    var dialogRef  ;
    dialogRef = this.dialog.open(DialogResetComponent, {
  width: '400px',

      data: {name: element},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.event.name.toString() === 'indicator'){
      this.resetPositionByType(1);
      this.resetPositionByType(2);
      }else if(result.event.name.toString()=== 'list'){
        this.resetPositionByType(3);

      }else if(result.event.name.toString() === 'graphe'){
        this.resetPositionByType(4);

      }else {

        this.resetPositionAll();

      }
    
    
    });
  }
   updateWidget(){
     this.serviceWidget.update(this.data);
   }
   updateWidgetAll(){
  
      this.serviceWidget.updateAll( this.allWidgetToBeConfigured);
      this.allWidgetToBeConfigured =[new Widget()]; 
    

  

  }

ChangeToDragAndDrop(){
  
  this.serviceWidget.currentDispotionRep.subscribe(drags=>{
    this.ModeLayout.drag = drags.drag ;
  

   });


   this.ModeLayout.drag=!this.ModeLayout.drag
   this.serviceWidget.setCurrentDispotionRep( this.ModeLayout);

 
}
ChangePermutation(){
  
  this.serviceWidget.currentDispotionRep.subscribe(layout=>{
    this.ModeLayout.permutation = layout.permutation ;
    this.ModeLayout.indicePermutation = layout.indicePermutation ;
    if(layout.indicePermutation == 0 )
    this.typePermut ="indicator" ;
    else if (layout.indicePermutation == 1 )

    this.typePermut ="  list " ;
    else if(layout.indicePermutation ==2 )
    this.typePermut ="graphic" ;
else 
this.typePermut ="" ;

   });


   this.ModeLayout.permutation=!this.ModeLayout.permutation
   this.serviceWidget.setCurrentDispotionRep( this.ModeLayout);

 
}
changeModeLayout(value , type){
  if(type === '1' )
  this.ModeLayout.indicateur =value;
  else   if(type === '2' )
  this.ModeLayout.list =value;
else  if(type === '3' )
  this.ModeLayout.graphique =value;
else 

{this.ModeLayout.indicateur =value;
this.ModeLayout.list =value;
this.ModeLayout.graphique =value;
}

this.cookieService.set( 'modeLayoutGraphique',this.ModeLayout.graphique);
this.cookieService.set( 'modeLayoutIndicateur',this.ModeLayout.indicateur);
this.cookieService.set( 'modeLayoutList',this.ModeLayout.list);
  this.serviceWidget.setCurrentDispotionRep(this.ModeLayout);

}
changeNbWidgetLayout(value , type){
  if(type === '1' )
{ 
  
  this.ModeLayout.nbLigneIn =value.value;}

  else   if(type === '2' )

  this.ModeLayout.nbLigneList =value.value;

  else if(type === '3' )
  this.ModeLayout.nbLigneGh =value.value;

else {


  this.ModeLayout.nbLigneIn =value.value;


  this.ModeLayout.nbLigneList =value.value;

  this.ModeLayout.nbLigneGh =value.value;


}



  this.serviceWidget.setCurrentDispotionRep(this.ModeLayout);
  this.cookieService.set( 'nbLigneGh',this.ModeLayout.nbLigneGh);
  this.cookieService.set( 'nbLigneIn',this.ModeLayout.nbLigneIn);
  this.cookieService.set( 'nbLigneList',this.ModeLayout.nbLigneList);
}
 

changePostions(value){
  this.ModeLayout.postions=value;


  this.serviceWidget.setCurrentDispotionRep(this.ModeLayout);

}
  ngOnInit() {

    this.ModeLayout = new ModeDisposition() ; 
 
    this.ModeLayout.nbLigneGh= this.cookieService.get( 'nbLigneGh') ? this.cookieService.get( 'nbLigneGh') : '2' ;
    this.ModeLayout.nbLigneIn= this.cookieService.get( 'nbLigneIn')? this.cookieService.get( 'nbLigneIn') : '3' ;
    this.ModeLayout.nbLigneList= this.cookieService.get( 'nbLigneList')? this.cookieService.get( 'nbLigneList') : '2' ;
    this.ModeLayout.graphique= this.cookieService.get( 'modeLayoutGraphique')? this.cookieService.get( 'modeLayoutGraphique') : 'column' ;
    this.ModeLayout.indicateur= this.cookieService.get( 'modeLayoutIndicateur')? this.cookieService.get( 'modeLayoutIndicateur') : 'row' ;
    this.ModeLayout.list= this.cookieService.get( 'modeLayoutList')? this.cookieService.get( 'modeLayoutList') : 'row' ;
  }

  resetPositionByType(type){
    this.serviceWidget.updatePositionWidgetByType(type);
  }
  resetPositionAll(){
    this.serviceWidget.updatePositionWidgetAll();
    
  }
}
