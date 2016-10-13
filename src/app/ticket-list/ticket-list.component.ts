import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket'
@Component({
  selector: 'ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  alertsShowing: boolean = false;
  tickets: Ticket[] = new Array<Ticket>();

  constructor() { }

  ngOnInit() {
    this.getTickets()
  }

  getTickets() {
    this.tickets.push(new Ticket(1, 'some message', new Date(), 'active', 'dashboard'));
    this.tickets.push(new Ticket(2, 'some other message', new Date(), 'active', 'face'));
    this.tickets.push(new Ticket(3, ' asd some message', new Date(), 'active', 'dashboard'));
    this.tickets.push(new Ticket(4, 'some message asdasd', new Date(), 'active', 'view_module'));
    this.tickets.push(new Ticket(5, 'ttyhg some message', new Date(), 'active', 'face'));
    this.tickets.push(new Ticket(5, 'ttyhg some message', new Date(), 'active', 'dashboard'));
    this.tickets.push(new Ticket(5, 'welcome', new Date(), 'active', 'face'));
  }

}
