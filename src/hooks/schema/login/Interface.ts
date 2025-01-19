import { IconType } from "react-icons";

export interface LoginCardProps {
  href: string;
  icon: IconType;
  title: string;
  description: string;
}

export interface FirebaseAuthError {
  code: string;
  message: string;
}
