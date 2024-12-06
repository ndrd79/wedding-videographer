'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Algo deu errado!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-[#D4AF37] text-black rounded hover:bg-[#B4941F] transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );
}
