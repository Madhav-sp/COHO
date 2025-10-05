import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export const verifyAdmin = (email, password) => {
//   return email === "coho@gmail.com" && password === "coho_pass@3";
// };


// lib/utils.js

export function verifyAdmin(email, password) {
  const ADMIN_EMAIL = "coho@gmail.com";
  const ADMIN_PASS = "coho_pass@3";
  return email === ADMIN_EMAIL && password === ADMIN_PASS;
}

