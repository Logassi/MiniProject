export default interface IEvent {
  name: string;
  description: string;
  price: number; // Price in IDR (0 for free events)
  date: Date; // Date of the event
  time: string; // Time in HH:mm format
  location: string;
  availableSeats: number;
  organizerId: number; // ID of the organizer
}
