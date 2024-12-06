export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}

export const metadata = {
  title: 'Admin - Vanderoski',
  description: 'Painel Administrativo',
}
