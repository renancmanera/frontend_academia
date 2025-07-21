"use client";
import { Dumbbell, ActivitySquare, Users, LayoutDashboard, User2, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export default function HomeInstrutor() {
  // Dados estáticos/hardcoded só para visualização
  const usuario = {
    nome: "João Silva",
    email: "joao@email.com",
    papel: "instrutor",
  };

  return (
    <div className="min-h-screen flex bg-neutral-50">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-white border-r border-neutral-200 flex flex-col justify-between py-6 px-3">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="bg-black w-10 h-10 rounded-full flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="block text-lg font-bold text-black">FitAcademy</span>
              <span className="block text-xs text-neutral-500 capitalize">{usuario.papel}</span>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <Link href="/home">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-black font-semibold bg-neutral-100">
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </div>
            </Link>
            <Link href="/instrutor/treinos">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition">
                <Dumbbell className="w-5 h-5" />
                Treinos
              </div>
            </Link>
            <Link href="/instrutor/exercicios">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition">
                <ActivitySquare className="w-5 h-5" />
                Exercícios
              </div>
            </Link>
            <Link href="/instrutor/usuarios">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition">
                <Users className="w-5 h-5" />
                Usuários
              </div>
            </Link>
          </nav>
        </div>
        {/* Usuário logado e sair */}
        <div className="flex flex-col items-start gap-5 px-3">
          <div className="flex items-center gap-3">
            <div className="bg-neutral-200 rounded-full w-9 h-9 flex items-center justify-center">
              <User2 className="w-5 h-5 text-neutral-500" />
            </div>
            <div>
              <div className="text-sm font-medium text-neutral-900">{usuario.nome}</div>
              <div className="text-xs text-neutral-500">{usuario.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <button className="flex items-center gap-1 hover:text-black">
              <Settings className="w-4 h-4" /> Config
            </button>
            {/* Botão de sair (logout) */}
            <Link
              href="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
              className="flex items-center gap-1 hover:text-black"
            >
              <LogOut className="w-4 h-4" /> Sair
            </Link>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col px-12 py-10">
        <div className="flex gap-6 mb-8">
          <div className="flex-1 rounded-xl bg-white border border-neutral-200 px-6 py-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-xs text-neutral-500 font-medium">Total Treinos</span>
              <Dumbbell className="w-5 h-5 text-neutral-400" />
            </div>
            <span className="text-2xl font-bold text-black leading-tight">3</span>
          </div>
          <div className="flex-1 rounded-xl bg-white border border-neutral-200 px-6 py-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-xs text-neutral-500 font-medium">Exercícios</span>
              <ActivitySquare className="w-5 h-5 text-neutral-400" />
            </div>
            <span className="text-2xl font-bold text-black leading-tight">4</span>
          </div>
          <div className="flex-1 rounded-xl bg-white border border-neutral-200 px-6 py-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-xs text-neutral-500 font-medium">Usuários</span>
              <Users className="w-5 h-5 text-neutral-400" />
            </div>
            <span className="text-2xl font-bold text-black leading-tight">3</span>
          </div>
        </div>
      </main>
    </div>
  );
}
