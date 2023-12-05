import { Component, OnInit } from '@angular/core';
import { mainHelpInterface } from 'src/app/interfaces/help.interfaces';

@Component({
  selector: 'lc-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit{
  helps: mainHelpInterface[] = [];
  selectedHelp?: mainHelpInterface;
  
  ngOnInit(): void {
    this.helps.push({
      id: 0,
      title: 'Sobre la web',
      content: 'Sobre la web hay muchas movidas que decir',
      icon: 'info'
    })

    this.helps.push({
      id: 1,
      title: 'El mapa',
      content: 'El mapa es increible',
      icon: 'map'
    })

    this.helps.push({
      id: 2,
      title: 'Descuentos',
      content: 'El mapa es increible',
      icon: 'desc'
    })

    this.helps.push({
      id: 3,
      title: 'Cuenta',
      content: 'El mapa es increible',
      icon: 'account'
    })

    this.helps.push({
      id: 4,
      title: 'Gestión del comercio',
      content: 'El mapa es increible',
      icon: 'commerce'
    })

    this.helps.push({
      id: 5,
      title: 'Seguridad',
      content: 'El mapa es increible',
      icon: 'security'
    })
  }


}
