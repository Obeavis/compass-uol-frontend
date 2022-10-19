import React, { useState, useContext, FC } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "contexts/GlobalContext";
import { delay } from "utils/Functions";
import imageBackground from "static/images/background.jpg";
import { ReactComponent as Logo } from "static/images/logo-compass-white.svg";
import { ReactComponent as UserIcon } from "static/icons/user.svg";
import { ReactComponent as PadlockIcon } from "static/icons/padlock.svg";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useAuth } from "hooks/useAuth";
import Button from "components/Button";
import Input from "components/Input";

interface FormState {
  login: string;
  password: string;
  loginError: boolean;
}

const Login: FC = () => {
  useDocumentTitle("Compass - Login");
  const navigate = useNavigate();
  const { dispatch } = useContext(GlobalContext);
  const { setLogin } = useAuth();

  const [formState, setFormState] = useState<FormState>({
    login: localStorage.getItem("login") ?? "",
    password: localStorage.getItem("password") ?? "",
    loginError: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: "LOADING", payload: true });
    const { login, password } = formState;

    await delay(1000);
    if (login === "admin" && password === "admin") {
      await delay(1000);
      setFormState({ ...formState, loginError: false });
      setLogin(login, password);
      navigate("/home");
    } else {
      setFormState({ ...formState, loginError: true });
    }

    dispatch({ type: "LOADING", payload: false });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-tertiary-dark to-tertiary">
      <div className="flex flex-row w-full min-h-screen">
        <div className="basis-full lg:basis-1/2 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-start text-left lg:w-2/5"
          >
            <h2 className="text-6xl text-gray-200 mb-3">Olá,</h2>
            <h3 className="text-gray-200 mb-24">
              Para continuar navegando de forma <br /> segura, efetue o login na
              rede.
            </h3>
            <span className="text-xl text-gray-200 mb-5">Login</span>
            <Input
              className="mb-6"
              name="login"
              placeholder="Usuário"
              required
              icon={<UserIcon />}
              error={formState.loginError}
              value={formState?.login}
              onChange={(event) =>
                setFormState({
                  ...formState,
                  login: event.currentTarget?.value || "",
                })
              }
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              required
              icon={<PadlockIcon />}
              error={formState.loginError}
              value={formState?.password}
              onChange={(event) =>
                setFormState({
                  ...formState,
                  password: event.currentTarget?.value || "",
                })
              }
            />
            <div className="w-full text-center mb-20 mt-4 pr-7">
              <span
                className={`text-secondary ${
                  !formState.loginError ? "opacity-0" : "opacity-100"
                }`}
              >
                Ops, usuário ou senha inválidos. <br /> Tente novamente!
              </span>
            </div>

            <div className="pr-7 w-full">
              <Button
                type="submit"
                className="bg-primary rounded-full shadow-inner"
              >
                Continuar
              </Button>
            </div>
          </form>
        </div>
        <div
          className="basis-1/2 hidden lg:flex justify-center "
          style={{ backgroundImage: `url(${imageBackground})` }}
        >
          <Logo className="mt-8" />
        </div>
      </div>
    </div>
  );
};

export default Login;
