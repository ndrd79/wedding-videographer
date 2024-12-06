export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Admin - Vanderoski',
  description: 'Painel Administrativo',
}
