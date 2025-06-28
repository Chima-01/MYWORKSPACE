import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export const Provider = ({ children }: { children: ReactNode}) => {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      { children }
    </ThemeProvider>
  )
}

export default Provider;