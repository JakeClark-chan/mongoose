interface UploadedFile {
  id: string;
  file_name: string;
  size: number;
  mime_type: string;
  original_file?: File;
  data_url?: string;
}

export { UploadedFile };
