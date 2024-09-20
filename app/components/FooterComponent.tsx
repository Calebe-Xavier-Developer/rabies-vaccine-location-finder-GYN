'use client'
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import PixIcon from '@mui/icons-material/AccountBalanceWallet'; // Ícone para Pix
import { useState } from 'react';

const FooterComponent = () => {
  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY || ''; // Obtém a chave Pix do .env
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Define um timeout para resetar o estado após 2 segundos
    });
  };

  return (
    <footer className="flex flex-col items-center justify-center w-full max-sm:h-[150px] min-md:h-[90px] bg-burnt-orange space-y-2">
      <p className="flex items-center text-center max-sm:text-xs">
        Created with <FavoriteIcon className="text-red-600 mx-1" /> by Calebe Xavier - My profile on
        <a target="_blank" href="https://github.com/Calebe-Xavier-Developer" className="flex items-center text-center ml-1">
          <GitHubIcon className="text-purple-800 mx-1" />Github
        </a>
      </p>
      <p className="relative flex items-center text-center max-sm:text-sm max-sm:flex-col">
        Gostou deste projeto? Apoie o desenvolvedor com uma doação para ajudar a construir mais soluções incríveis! Faça uma doação via Pix:
        <span
          className="font-semibold mx-1 cursor-pointer underline max-sm:mt-3"
          onClick={copyToClipboard}
          title="Clique para copiar"
        >
          <PixIcon className="text-green-500 mx-1" />
          Clique para copiar
        </span>
        {copied && <span className="absolute right-1 max-sm:right-[140px] bottom-6 max-sm:bottom-5 ml-2 text-green-500">Chave Pix copiada!</span>}
      </p>
    </footer>
  );
};

export default FooterComponent;
