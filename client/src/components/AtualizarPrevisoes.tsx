import { RefreshCw } from "lucide-react";

const AtualizarPrevisoes = ({ onAtualizar }: { onAtualizar: () => void }) => {
  return (
    <button
      onClick={onAtualizar}
      className="group relative overflow-hidden bg-gradient-to-r from-pink-300 to-blue-300 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
    >
      {/* Animated background bubbles for cute effect */}
      <span className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
      <span className="absolute top-1 right-3 w-3 h-3 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"></span>
      <span className="absolute bottom-1 left-5 w-2 h-2 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200"></span>

      {/* Icon with animation */}
      <span className="relative transition-transform group-hover:rotate-180 duration-500">
        <RefreshCw size={18} />
      </span>

      {/* Button text */}
      <span className="font-medium">Atualizar Previsões</span>

      {/* Subtle shine effect on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
    </button>
  );
};

export default AtualizarPrevisoes;
