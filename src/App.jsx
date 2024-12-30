import "./App.css";
import { Form,   Preview } from "./components";
import {Provider} from 'react-redux'
import store from './store/Store'
import TopBtn from "./components/TopBtn";
function App() {
  return (
    <>
    <Provider store={store}>
      <div >
      <div className="relative flex justify-between p-2  min-h-screen gap-2 bg-white ">
        <Form />
        <Preview />
      </div>
      <TopBtn className={" absolute left-3 bottom-3"}/>
      </div>
    </Provider>
    </>
  );
}

export default App;
