import { DocumentPickerAsset } from "expo-document-picker";
import { ImagePickerAsset } from "expo-image-picker";

export type LoginFormProps = {
  email: string;
  password: string;
};

export type SignUpFormProps = {
  username: string;
  email: string;
  password: string;
};

export type CreateFormProps = {
  title: string;
  video: ImagePickerAsset | null;
  thumbnail: ImagePickerAsset | null;
  prompts: string;
};
