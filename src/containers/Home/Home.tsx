import { useState, useEffect, useContext, FC } from "react";
import { GlobalContext } from "contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import { findState } from "static/mocks/states";
import { getCurrentWeather } from "services/apiService";
import { ReactComponent as Logo } from "static/images/logo-compass-black.svg";
import { ReactComponent as Ball } from "static/images/bola-logo-compass.svg";
import Button from "components/Button";
import Footer from "components/Footer";
import Modal from "components/Modal";
import useClock from "hooks/useClock";
import useDocumentTitle from "hooks/useDocumentTitle";
import useGeoLocation from "hooks/useGeoLocation";
import { useAuth } from "hooks/useAuth";
import { useFetch } from "hooks/useFetch";
import { useSessionTimeOut } from "hooks/useSessionTimeOut";

const Home: FC = () => {
  useDocumentTitle("Compass - Home");
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { setIsLogged, logout } = useAuth();
  const location = useGeoLocation();
  const time = useClock();
  const { lat, lng } = location.coordinates;
  const { fetch, data, loading } = useFetch();
  const { countdown, resetCountDown } = useSessionTimeOut();

  useEffect(() => {
    if (lat && lng) {
      fetch(getCurrentWeather(`${lat},${lng}`));
    }
  }, [lat, lng]);

  useEffect(() => {
    dispatch({ type: "LOADING", payload: loading });
  }, [loading]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center w-full min-h-screen">
        <Ball className="hidden lg:flex fixed bottom-0 left-0 h-3/4" />
        <div className="flex w-full flex-col lg:flex-row lg:px-10 lg:pt-10">
          <div className="basis-full flex justify-between px-5 pt-3">
            <Logo className="w-64" />
            <div className="basis-full flex-col items-end flex lg:hidden">
              <div>
                <span>
                  {data?.location.name} -{" "}
                  {findState(data?.location?.region)?.value ??
                    data?.location?.region}
                </span>
                <div className="flex items-center">
                  <img src={data?.current?.condition?.icon} alt="weather" />
                  <span className="text-3xl">{data?.current?.temp_c}°</span>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-full">
            <h2 className="text-7xl lg:text-9xl font-extrabold">{time}</h2>
            <span className="text-sm">
              {new Date().toLocaleString(navigator.language, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="basis-full flex-col items-end hidden lg:flex">
            <div>
              <span>
                {data?.location.name} -{" "}
                {findState(data?.location?.region)?.value ??
                  data?.location?.region}
              </span>
              <div className="flex items-center">
                <img src={data?.current?.condition?.icon} alt="weather" />
                <span className="text-5xl">{data?.current?.temp_c}°</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-right lg:w-5/6 min-h-screen lg:min-h-0 pr-5 mt-3 mb-20 lg:mb-0 2xl:mt-24 z-10">
          <span className="text-quartiary font-bold text-4xl">
            Our mission is
          </span>
          <span className="mb-2">Nossa Nossa missão é</span>

          <span className="text-quartiary font-bold text-5xl">
            to transform the world
          </span>
          <span className="mb-2">transformar o mundo</span>

          <span className="text-quartiary font-bold text-5xl">
            building digital experiences
          </span>
          <span className="mb-2">construindo experiências digitais</span>

          <span className="text-quartiary font-bold text-5xl">
            that enable our client’s growth
          </span>
          <span className="mb-2">
            que permitam o crescimento dos nossos clientes
          </span>
        </div>
      </div>
      <Footer
        countdown={countdown}
        reset={resetCountDown}
        logout={() => setOpenModal(true)}
      />
      <Modal.Frame open={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Head>Continuar Logado?</Modal.Head>
        <Modal.Body>
          <div className="flex gap-4 pt-8">
            <Button
              className="bg-indigo-700 text-white text-base rounded-lg"
              onClick={() => {
                setIsLogged(false);
                navigate("/login");
              }}
            >
              Sim
            </Button>
            <Button className="bg-primary-dark text-white text-base rounded-lg" onClick={() => {
                logout();
                navigate("/login");
              }}>
              Não
            </Button>
          </div>
        </Modal.Body>
      </Modal.Frame>
    </div>
  );
};

export default Home;
