import { FC, ReactNode } from "react";

const Frame: FC<{
  children: ReactNode;
  open?: boolean;
  onClose: () => void;
}> = ({ children, open = false, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-10 bg-gray-600/90 ${
          open ? "block" : "hidden"
        }`}
        onClick={() => onClose()}
      ></div>
      <div
        className={`absolute top-1/4 mr-auto ml-auto z-10 text-white ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="relative w-full mx-auto z-50">
          <button
            className="absolute -top-2 -right-2 flex justify-center rounded-full h-8 w-8 bg-gray-50 cursor-pointer shadow-xl"
            onClick={() => onClose()}
            title="close"
          >
            <span className="text-2xl leading-7 text-quartiary select-none">
              &times;
            </span>
          </button>
          <div className="overflow-hidden bg-white rounded shadow-xl px-16 py-5 z-50">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

const Head: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <div className="block p-4 bg-white">
    <h1 className="text-4xl font-bold text-gray-600">{children}</h1>
  </div>
);

const Body: FC<{
  children: ReactNode;
}> = ({ children }) => <div className="p-4">{children}</div>;

const Modal = { Frame, Head, Body };

export default Modal;
