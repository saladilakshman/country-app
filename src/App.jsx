import { createContext, useReducer } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Continents from "./components/continents";
import Country from "./components/country";
import { Routes, Route, HashRouter } from "react-router-dom";
// eslint-disable-next-line react-refresh/only-export-components
export const APP_DATA = createContext();
function App() {
  const App_Data = {
    darkmode: false,
    isChecked: false,
    continentsdata: [],
    show_dialog: false,
    list:[]
  };
  const [state, dispatch] = useReducer(reducerfunction, App_Data);

  function reducerfunction(state, action) {
    if (action.type === "switch-mode") {
      return {
        ...state,
        darkmode: !state.darkmode,
        isChecked: !state.isChecked,
      };
    }

    if (action.type === "continents-data") {
      return {
        ...state,
        continentsdata: action.payload,
      };
    }
    if (action.type === "open-dialog-box") {
      return {
        ...state,
        show_dialog: true,
      };
    }
    if (action.type === "close-dialog-box") {
      return {
        ...state,
        show_dialog: false,
      };
    }
    if(action.type==="search-countries"){
      return{
        ...state,
        list:state.continentsdata.filter((item)=>item.name.official.toLowerCase().includes(action.payload.toLowerCase()))
      }
    }
    else {
      return state;
    }
  }
  const Theme_Switch = createTheme({
    palette: {
      mode: state.darkmode ? "dark" : "light",
    },
  });
  const theme = useTheme();
  const mobile_layout = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <HashRouter>
      <APP_DATA.Provider value={{ dispatch, state, mobile_layout }}>
        <ThemeProvider theme={Theme_Switch}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Continents />} />
            <Route path="/:countryname" element={<Country />} />
          </Routes>
        </ThemeProvider>
      </APP_DATA.Provider>
    </HashRouter>
  );
}

export default App;
