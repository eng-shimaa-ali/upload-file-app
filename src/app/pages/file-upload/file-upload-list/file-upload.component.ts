import { catchError, delay, tap } from 'rxjs/operators';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MenuItem, MessageService } from 'primeng/api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { HttpClient, HttpEventType, HttpHandler } from '@angular/common/http';
import { FileData } from '../../../core/model/file';
import { DialogModule } from 'primeng/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';
import { UploadFileService } from '../../../core/services/upload-file.service';

@Component({
  selector: 'app-file-upload',
  imports: [
    BreadcrumbModule,
    RouterModule,
    CommonModule,
    CardModule,
    FileUploadModule,
    ButtonModule,
    ProgressBarModule,
    MessageModule,
    DialogModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  providers: [MessageService],
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileUploadComponent') fileUploadComponent!: FileUpload;

  items: MenuItem[] | undefined;
  uploadForm: FormGroup;
  files: FileData[] = [];
  maxFileSize = 5 * 1024 * 1024; // 5MB
  displayPreview: boolean = false;
  selectedImageUrl?: string | null = null;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private uploadFileService: UploadFileService
  ) {
    this.uploadForm = this.fb.group({
      file: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.items = [
      { icon: 'pi pi-home', route: '/' },
      { label: 'Home', route: '/' },
      { label: 'File-upload' },
    ];
  }

  onFileSelect(event: any) {
    console.log('Files selected:', event.files);

    const selectedFiles = event.files;
    const validFiles: FileData[] = [];

    for (let file of selectedFiles) {
      if (!file.type.startsWith('image/')) {
        alert('Only image files (PNG, JPG, JPEG) are allowed!');
        continue;
      }

      if (file.size > this.maxFileSize) {
        alert('File size exceeds 5MB limit.');
        continue;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        console.log('File loaded:', fileContent);

        // this.files = fileContent

        validFiles.push({
          file,
          previewUrl: reader.result as string,
          progress: 0,
          uploaded: false,
        });
        console.log('File validFiles:', validFiles);
        this.files = [...this.files, ...validFiles];

        this.uploadForm.patchValue({
          file: this.files,
        });

        this.uploadForm.get('file')?.updateValueAndValidity();
        this.cdr.detectChanges();
        console.log('Updated uploadForm:', this.uploadForm.value);
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit(): void {
    if (this.uploadForm.invalid) {
      return;
    }

    console.log('Uploading files:', this.files);

    this.files.forEach((fileData, index) => {
      if (!fileData.uploaded) {
        this.uploadFile(fileData, index);
      }
    });
  }
  prviewImg(index: number) {
    this.selectedImageUrl = this.files[index].previewUrl;
    this.displayPreview = true;
  }
  removeFile(index: number) {
    this.files.splice(index, 1);
    this.uploadForm.patchValue({ file: this.files.length ? this.files : null });
    this.uploadForm.get('file')?.updateValueAndValidity();
    if (this.fileUploadComponent) {
      this.fileUploadComponent.clear(); // Clears the file input UI
    }

    this.cdr.detectChanges(); // Ensure UI updates properly
    console.log('Updated uploadForm:', this.uploadForm.value);
  }

  uploadFile(fileData: FileData, index: number) {
    const formData = new FormData();
    formData.append('file', fileData.file);
    console.log('file Data:', fileData.file);

    this.uploadFileService.uploadFile(formData).subscribe((response) => {
      fileData.progress = response.progress;
      fileData.uploaded = response.uploaded;
      if (response.error) {
        fileData.error = response.error;
      }
    });
  }
  retryUpload(fileData: FileData, index: number) {
    fileData.error = ''; // Clear previous error
    fileData.progress = 0; // Reset progress
    this.uploadFile(fileData, index); // Retry upload
  }

  uploadAll() {
    this.files.forEach((file, index) => {
      if (!file.uploaded) {
        this.uploadFile(file, index);
      }
    });
  }
}
