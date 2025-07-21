"use client";
import { useState } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { useRouter } from "next/navigation";

type Papel = "aluno" | "instrutor";

export default function CadastroFitAcademy() {
  const router = useRouter();
  const [papel, setPapel] = useState<Papel>("aluno");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    if (form.senha.length < 6) {
      setMensagem("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        papel,
      }),
    });
    const data = await res.json();
    setMensagem(data.mensagem || data.erro || "Erro inesperado");
    setLoading(false);

    if (data.mensagem?.toLowerCase().includes("sucesso")) {
      router.push("/home");
      return;
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMensagem("");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-2">
      <section className="flex flex-col items-center w-full max-w-sm">
        {/* Topo: ícone halter e título */}
        <div className="flex flex-col items-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-black rounded-full mb-3">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-center text-black">FitAcademy</h1>
          <span className="text-sm text-neutral-500 mt-1">
            Crie sua conta e comece hoje
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full bg-white rounded-xl border border-neutral-200 p-5 pt-6 flex flex-col gap-3"
          style={{
            boxShadow: "0px 2px 8px 0px #0001",
            minWidth: 260,
          }}
        >
          {/* Campo Nome */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-3.35 0-8 1.68-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-3.32-4.65-5-8-5Z"
                />
              </svg>
            </span>
            <input
              className="w-full h-10 pl-10 pr-3 rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-900 text-[14px] focus:border-neutral-400 outline-none transition"
              name="nome"
              autoComplete="off"
              maxLength={64}
              type="text"
              placeholder="Nome completo"
              value={form.nome}
              onChange={handleChange}
              required
              aria-label="Nome completo"
            />
          </div>
          {/* Campo E-mail */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M21 7.48V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1.48l9 5.25 9-5.25Zm0 2.27-8.4 4.9a1 1 0 0 1-1.2 0L3 9.75V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9.75Z"
                />
              </svg>
            </span>
            <input
              className="w-full h-10 pl-10 pr-3 rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-900 text-[14px] focus:border-neutral-400 outline-none transition"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="off"
              aria-label="Email"
            />
          </div>
          {/* Campo Senha */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M17 9V7a5 5 0 0 0-10 0v2H5a1 1 0 0 0-1 1v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a1 1 0 0 0-1-1h-1Zm-8 0V7a3 3 0 1 1 6 0v2H9Zm3 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                />
              </svg>
            </span>
            <input
              className="w-full h-10 pl-10 pr-3 rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-900 text-[14px] focus:border-neutral-400 outline-none transition"
              name="senha"
              type="password"
              placeholder="Senha"
              value={form.senha}
              onChange={handleChange}
              required
              minLength={8}
              maxLength={32}
              autoComplete="off"
              aria-label="Senha"
            />
          </div>
          {/* Campo Confirmar Senha */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M17 9V7a5 5 0 0 0-10 0v2H5a1 1 0 0 0-1 1v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a1 1 0 0 0-1-1h-1Zm-8 0V7a3 3 0 1 1 6 0v2H9Zm3 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                />
              </svg>
            </span>
            <input
              className="w-full h-10 pl-10 pr-3 rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-900 text-[14px] focus:border-neutral-400 outline-none transition"
              name="confirmarSenha"
              type="password"
              placeholder="Confirmar senha"
              value={form.confirmarSenha}
              onChange={handleChange}
              required
              minLength={8}
              maxLength={32}
              autoComplete="off"
              aria-label="Confirmar senha"
            />
          </div>
          {/* Papel toggle compacto */}
          <div className="flex gap-2 mb-1 justify-center">
            <label className="flex-1">
              <input
                type="radio"
                name="papel"
                value="aluno"
                checked={papel === "aluno"}
                onChange={() => setPapel("aluno")}
                className="peer sr-only"
              />
              <div
                className={`w-full text-center cursor-pointer rounded-lg px-2 py-1 border font-semibold text-xs tracking-wide uppercase transition
                  ${
                    papel === "aluno"
                      ? "bg-black text-white border-black ring-2 ring-black shadow"
                      : "bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200"
                  }
                `}
              >
                Aluno
              </div>
            </label>
            <label className="flex-1">
              <input
                type="radio"
                name="papel"
                value="instrutor"
                checked={papel === "instrutor"}
                onChange={() => setPapel("instrutor")}
                className="peer sr-only"
              />
              <div
                className={`w-full text-center cursor-pointer rounded-lg px-2 py-1 border font-semibold text-xs tracking-wide uppercase transition
                  ${
                    papel === "instrutor"
                      ? "bg-black text-white border-black ring-2 ring-black shadow"
                      : "bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200"
                  }
                `}
              >
                Instrutor
              </div>
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full h-10 rounded text-white font-semibold bg-black hover:bg-gray-900 transition"
          >
            {loading ? "Enviando..." : "Criar conta"}
          </button>
          {mensagem && (
            <div
              className={`mt-3 text-center text-sm font-medium ${
                mensagem.toLowerCase().includes("sucesso") ? "text-green-700" : "text-red-600"
              }`}
              role="alert"
            >
              {mensagem}
            </div>
          )}
        </form>
        <div className="mt-5 text-center text-sm text-neutral-600">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-black hover:underline font-semibold">
            Fazer login
          </Link>
        </div>
      </section>
    </main>
  );
}
