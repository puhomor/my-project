import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule,CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data =[
    {
      imageUrl: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzrwp18mbw5z9g9crywtd.png',
      title: 'Taking Time to Breathe: A New Chapter Begins',
      description: 'My life update means exploring new opportunities in AI tools and content strategy'
    },
    {
      imageUrl: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzrwp18mbw5z9g9crywtd.png',
      title: 'Taking Time to Breathe: A New Chapter Begins',
      description: 'My life update means exploring new opportunities in AI tools and content strategy'
    },
    {
      imageUrl: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzrwp18mbw5z9g9crywtd.png',
      title: 'Taking Time to Breathe: A New Chapter Begins',
      description: 'My life update means exploring new opportunities in AI tools and content strategy'
    },
    {
      imageUrl: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzrwp18mbw5z9g9crywtd.png',
      title: 'Taking Time to Breathe: A New Chapter Begins',
      description: 'My life update means exploring new opportunities in AI tools and content strategy'
    },
    {
      imageUrl: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzrwp18mbw5z9g9crywtd.png',
      title: 'Taking Time to Breathe: A New Chapter Begins',
      description: 'My life update means exploring new opportunities in AI tools and content strategy'
    },
    {
      imageUrl: 'https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzrwp18mbw5z9g9crywtd.png',
      title: 'Taking Time to Breathe: A New Chapter Begins',
      description: 'My life update means exploring new opportunities in AI tools and content strategy'
    },
  ]
}