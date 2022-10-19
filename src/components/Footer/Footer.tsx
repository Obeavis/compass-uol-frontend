import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<any> {
  countdown: number;
  reset: Function;
  logout: Function;
}

const Footer: FC<Props> = ({ countdown, reset, logout }) => {
  return (
    <footer className="flex fixed items-center justify-center w-full bg-gradient-to-tr from-tertiary-dark to-tertiary bottom-0 lg:h-20 z-50">
      <div className="flex w-full items-center h-full flex-col lg:flex-row">
        <div className="flex lg:basis-1/2 justify-end pt-5 lg:pt-0 px-4 lg:px-10">
          <div className="flex lg:w-4/6">
            <span className="text-gray-200 text-xs lg:text-right">
              Essa janela do navegador é usada para manter sua sessão de
              autenticação ativa. Deixe-a aberta em segundo plano e abra uma
              nova janela para continuar a navegar.
            </span>
          </div>
        </div>
        <div className="hidden lg:flex border-r border-gray-100 h-16"></div>
        <div className="flex flex-col lg:flex-row lg:basis-1/2 justify-between items-center h-full w-full pt-5 lg:pt-0 lg:pl-20">
          <div className="flex items-center">
            <span className="text-gray-200 text-xs w-24">
              Application refresh in
            </span>
            <div className="flex flex-col items-center w-24">
              <span className="text-gray-200 text-3xl font-bold">
                {countdown}
              </span>
              <span className="text-gray-200 text-xs">seconds</span>
            </div>
          </div>
          <div className="flex items-center pt-5 lg:pt-0 w-full lg:w-auto h-20 lg:h-full">
            <div
              className="flex basis-1/2 justify-center items-center bg-white h-full cursor-pointer lg:w-32"
              onClick={() => reset()}
            >
              <span className="text-quartiary text-sm">
                Continuar Navegando
              </span>
            </div>
            <div
              className="basis-1/2 flex h-full items-center justify-center cursor-pointer"
              onClick={() => logout()}
            >
              <span className="text-gray-100 text-sm px-6">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
