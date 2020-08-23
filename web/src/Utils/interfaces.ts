import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
  id: number;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}
