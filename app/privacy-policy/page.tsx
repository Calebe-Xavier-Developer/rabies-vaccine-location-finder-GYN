'use client';

export default function PrivacyPolicy() {
  return (
    <main className="flex items-center w-screen max-sm:h-[calc(100vh-150px)] min-md:h-[calc(100vh-90px)] relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/bg.webp)" }}>
      <div className="bg-black bg-opacity-60 text-soft-gold max-w-4xl mx-auto custom-scrollbar overflow-y-auto pt-4 h-[80vh]">
        <h1 className="text-3xl font-bold mb-4">Política de Privacidade</h1>
        <p className="mb-4">
          Sua privacidade é importante para nós. É política do nosso site respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <strong>Vacinação Raiva 2024</strong>.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Informações que coletamos</h2>
        <p className="mb-4">
          Coletamos informações pessoais como nome, e-mail e outras que você nos fornece voluntariamente. Também podemos coletar automaticamente informações técnicas, como seu endereço IP, tipo de navegador e páginas acessadas.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Como utilizamos suas informações</h2>
        <p className="mb-4">
          As informações coletadas são usadas para melhorar nossos serviços, personalizar a experiência do usuário e exibir anúncios relevantes através de parceiros como o Google AdSense.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Compartilhamento de dados</h2>
        <p className="mb-4">
          Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Consentimento</h2>
        <p className="mb-4">
          Ao utilizar nosso site, você concorda com a coleta e uso de suas informações conforme descrito nesta política.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
        <p className="mb-4">
          Utilizamos cookies para armazenar informações, como suas preferências pessoais, e para exibir anúncios relevantes através do Google AdSense. Você pode optar por desativar os cookies nas configurações do seu navegador, mas isso pode afetar a funcionalidade do site.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Segurança das informações</h2>
        <p className="mb-4">
          Adotamos medidas de segurança para proteger suas informações contra perda, roubo e acesso não autorizado.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Alterações nesta política</h2>
        <p className="mb-4">
          Esta política pode ser atualizada periodicamente, e recomendamos que você a revise regularmente.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Contato</h2>
        <p className="mb-4">
          Se você tiver alguma dúvida sobre nossa Política de Privacidade, entre em contato através do nosso e-mail: suporte@vacinar2024.com.
        </p>
      </div>
    </main>
  );
}
