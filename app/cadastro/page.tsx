import Image from "next/image";
import CadastroForm from "./cadastro-form";

export default function CadastroPage() {
  return (
    <main className="flex flex-1 bg-creme px-4 pt-10 sm:px-14 sm:pt-20">
      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-10 md:grid-cols-2">
        <section className="flex flex-col rounded-t-[2rem] bg-carvao px-6 pt-16 pb-10 sm:px-12">
          <h1 className="mb-12 text-center text-3xl font-semibold uppercase tracking-wide text-creme">
            Crie sua conta
          </h1>
          <CadastroForm />
        </section>

        <section className="hidden flex-col items-center md:flex">
          <Image
            src="/logo.png"
            alt="Stock.io"
            width={440}
            height={105}
            priority
            className="h-auto w-[300px]"
          />
          <Image
            src="/ilustracao.png"
            alt=""
            width={530}
            height={802}
            className="mt-auto h-auto w-[360px]"
          />
        </section>
      </div>
    </main>
  );
}
