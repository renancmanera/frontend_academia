// app/layout.tsx
import '../styles/globals.css'

export const metadata = {
  title: 'Portal Academia',
  description: 'Sistema de treinos para alunos e instrutores',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
