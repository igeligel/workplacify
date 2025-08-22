export interface VisitorBadgePreviewProps {
  formData: {
    name: string;
    company: string;
    date: string;
    hostEmployee: string;
    includeQR: boolean;
  };
  photoPreview: string | null;
}
