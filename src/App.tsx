import "./App.css";
import Routes from "utils/Routes";
import { GlobalProvider, GlobalConsumer } from "contexts/GlobalContext";
import { AuthProvider, AuthConsumer } from "contexts/AuthContext";
import Loader from "components/Loader";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <GlobalConsumer>
          {(global) => (
            <AuthProvider>
              <AuthConsumer>
                {({ state }) => (
                  <>
                    <Routes isLogged={state.isLogged} />

                    {global.state.loading ? <Loader /> : null}
                  </>
                )}
              </AuthConsumer>
            </AuthProvider>
          )}
        </GlobalConsumer>
      </GlobalProvider>
    </div>
  );
}

export default App;
