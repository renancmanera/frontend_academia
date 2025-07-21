interface TreinoCardProps {
  nome: string;
  exercicios: number;
  tempo: number; // minutos
  status: "Ativo" | "Inativo";
}

export default function TreinoCard({ nome, exercicios, tempo, status }: TreinoCardProps) {
  return (
    <div className="flex justify-between items-center bg-neutral-50 hover:bg-neutral-100 p-4 rounded-lg transition group border border-transparent">
      <div>
        <div className="font-semibold text-neutral-900">{nome}</div>
        <div className="text-xs text-neutral-500 mt-0.5">
          {exercicios} exercícios • {tempo}min
        </div>
      </div>
      <span
        className={
          status === "Ativo"
            ? "px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
            : "px-3 py-1 rounded-full text-xs font-medium bg-neutral-200 text-neutral-600"
        }
      >
        {status}
      </span>
    </div>
  );
}
