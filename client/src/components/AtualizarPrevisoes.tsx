import { RotateCcw } from "lucide-react";

interface AtualizarPrevisoesProps {
  onAtualizar: () => void;
  loading?: boolean;
}

export default function AtualizarPrevisoes({
  onAtualizar,
  loading = false,
}: AtualizarPrevisoesProps) {
  return (
    <button
      onClick={onAtualizar}
      disabled={loading}
      className={`group relative overflow-hidden bg-gradient-to-r from-pink-300 to-blue-300 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-2
        ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"}`}
    >
      {/* Bolhas fofas animadas */}
      <span className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
      <span className="absolute top-1 right-3 w-3 h-3 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></span>
      <span className="absolute bottom-1 left-5 w-2 h-2 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></span>

      {/* Ícone girando ao carregar */}
      <span
        className={`relative transition-transform duration-500 ${
          loading ? "animate-spin" : "group-hover:rotate-180"
        }`}
      >
        <RotateCcw size={18} />
      </span>

      {/* Texto */}
      <span className="font-medium">
        {loading ? "Atualizando..." : "Atualizar Previsões"}
      </span>

      {/* Efeito de brilho suave */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
    </button>
  );
}
