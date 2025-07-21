"use client";
import { useState } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginFitAcademy() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMensagem("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok && data.token) {
      setMensagem("Login realizado com sucesso!");
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      setMensagem(data.erro || "E-mail ou senha inválido.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-2">
      <section className="flex flex-col items-center w-full max-w-sm">
        <div className="flex flex-col items-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-black rounded-full mb-3">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-center text-black">FitAcademy</h1>
          <span className="text-sm text-neutral-500 mt-1">
            Entre com sua conta
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
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="off"
              aria-label="E-mail"
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
              minLength={6}
              maxLength={32}
              autoComplete="off"
              aria-label="Senha"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-3 w-full h-10 rounded text-white font-semibold bg-black hover:bg-gray-900 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
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
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="text-black hover:underline font-semibold">
            Cadastre-se
          </Link>
        </div>
      </section>
    </main>
  );
}
