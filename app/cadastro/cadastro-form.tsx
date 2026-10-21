"use client";

import Link from "next/link";
import { useState } from "react";

type Campos = {
  nome: string;
  username: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

const vazio: Campos = {
  nome: "",
  username: "",
  email: "",
  senha: "",
  confirmarSenha: "",
};

function validar(campos: Campos) {
  const erros: Partial<Record<keyof Campos, string>> = {};
  if (!campos.nome.trim()) erros.nome = "Informe seu nome completo";
  if (!campos.username.trim()) erros.username = "Informe um username";
  if (!/^\S+@\S+\.\S+$/.test(campos.email)) erros.email = "Email inválido";
  if (campos.senha.length < 8)
    erros.senha = "A senha precisa ter pelo menos 8 caracteres";
  if (campos.confirmarSenha !== campos.senha)
    erros.confirmarSenha = "As senhas não coincidem";
  return erros;
}

export default function CadastroForm() {
  const [campos, setCampos] = useState<Campos>(vazio);
  const [erros, setErros] = useState<Partial<Record<keyof Campos, string>>>({});
  const [enviado, setEnviado] = useState(false);

  function alterar(campo: keyof Campos, valor: string) {
    setCampos((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  }

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const novosErros = validar(campos);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    // TODO: enviar para a API de cadastro
    console.log("Cadastro:", campos);
    setEnviado(true);
  }

  return (
    <form onSubmit={enviar} noValidate className="mx-auto w-full max-w-sm">
      <div className="flex flex-col gap-3">
        <Campo placeholder="Nome Completo" autoComplete="name"
          valor={campos.nome} erro={erros.nome}
          onChange={(v) => alterar("nome", v)} />
        <Campo placeholder="Username" autoComplete="username"
          valor={campos.username} erro={erros.username}
          onChange={(v) => alterar("username", v)} />
        <Campo placeholder="Email" type="email" autoComplete="email"
          valor={campos.email} erro={erros.email}
          onChange={(v) => alterar("email", v)} />
        <CampoSenha placeholder="Senha"
          valor={campos.senha} erro={erros.senha}
          onChange={(v) => alterar("senha", v)} />
        <CampoSenha placeholder="Confirmar Senha"
          valor={campos.confirmarSenha} erro={erros.confirmarSenha}
          onChange={(v) => alterar("confirmarSenha", v)} />
      </div>

      <button
        type="submit"
        className="mt-7 h-9 w-full rounded-full bg-roxo font-medium uppercase text-creme transition-colors hover:bg-roxo-escuro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lima"
      >
        Criar conta
      </button>

      {enviado && (
        <p className="mt-4 text-sm text-lima">Conta criada com sucesso!</p>
      )}

      <p className="mt-6 text-creme">
        Já possui uma conta?{" "}
        <Link href="/login" className="font-medium text-roxo hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}

type CampoProps = {
  placeholder: string;
  valor: string;
  erro?: string;
  type?: string;
  autoComplete?: string;
  onChange: (valor: string) => void;
  children?: React.ReactNode;
};

function Campo({ placeholder, valor, erro, type = "text", autoComplete, onChange, children }: CampoProps) {
  return (
    <div>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-invalid={!!erro}
          autoComplete={autoComplete}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-full rounded-full bg-creme px-5 pr-11 text-carvao placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-roxo aria-invalid:ring-2 aria-invalid:ring-red-500"
        />
        {children}
      </div>
      {erro && <p className="mt-1 pl-5 text-xs text-red-400">{erro}</p>}
    </div>
  );
}

function CampoSenha(props: Omit<CampoProps, "type" | "children">) {
  const [visivel, setVisivel] = useState(false);

  return (
    <Campo {...props} type={visivel ? "text" : "password"} autoComplete="new-password">
      <button
        type="button"
        onClick={() => setVisivel((v) => !v)}
        aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
        className="absolute inset-y-0 right-4 flex items-center text-zinc-500 hover:text-carvao"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
          {visivel && <path d="M3 3l18 18" />}
        </svg>
      </button>
    </Campo>
  );
}
