import { FileData } from './../model/file';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpProgressEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private httpClient: HttpClient) {}

  uploadFile(
    formData: FormData
  ): Observable<{ progress: number; uploaded: boolean; error?: string }> {
    return this.httpClient
      .post('https://jsonplaceholder.typicode.com/posts', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        delay(2000), // Simulate network delay
        map((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            // Calculate progress percentage
            const progress = Math.round(
              (100 * (event as HttpProgressEvent).loaded) /
                ((event as HttpProgressEvent).total || 1)
            );
            return { progress, uploaded: false };
          } else if (event instanceof HttpResponse) {
            return { progress: 100, uploaded: true }; // Upload complete
          }
          return { progress: 0, uploaded: false };
        }),
        catchError((error) => {
          console.error('Upload error:', error);
          return of({
            progress: 0,
            uploaded: false,
            error: 'Upload failed. Try again.',
          });
        })
      );
  }
}
