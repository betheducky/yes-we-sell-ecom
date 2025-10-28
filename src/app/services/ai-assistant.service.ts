import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiAssistantService {

  constructor(private http: HttpClient) { }

  async generateProductDetails(productTitle: string): Promise<Object> {
    const result = await firstValueFrom(this.http.post('/api/generate-description', {productTitle}));
    console.log('Product Title and Result:', productTitle, result);
    return result;
  }

  async generateProductImage(productTitle: string): Promise<Object> {
    const result = await firstValueFrom(this.http.post('/api/generate-image', {productTitle}));
    return result;
  }
}
