import { format } from "date-fns";
import { create } from "zustand";

interface VisitorFormData {
  name: string;
  company: string;
  date: string;
  hostEmployee: string;
  photo?: File;
  includeQR: boolean;
}
interface VisitorBadgeFormState {
  formData: VisitorFormData;
  setFormData: (formData: VisitorFormData) => void;
  photoPreview: string | null;
  setPhotoPreview: (photoPreview: string | null) => void;
  qrCodeDataUrl: string | null;
  setQrCodeDataUrl: (qrCodeDataUrl: string | null) => void;
  avatarDataUrl: string | null;
  setAvatarDataUrl: (avatarDataUrl: string | null) => void;
}

const initialFormData: VisitorFormData = {
  name: "",
  company: "",
  date: format(new Date(), "yyyy-MM-dd"),
  hostEmployee: "",
  includeQR: false,
};

export const useVisitorBadgeFormStore = create<VisitorBadgeFormState>(
  (set) => ({
    formData: initialFormData,
    setFormData: (formData) => set({ formData }),
    photoPreview: null,
    setPhotoPreview: (photoPreview) => set({ photoPreview }),
    qrCodeDataUrl: null,
    setQrCodeDataUrl: (qrCodeDataUrl) => set({ qrCodeDataUrl }),
    avatarDataUrl: null,
    setAvatarDataUrl: (avatarDataUrl) => set({ avatarDataUrl }),
  }),
);
