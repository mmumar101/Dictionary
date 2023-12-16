import Main from "./components/main";
import { GetThemeValue } from "./components/contextTheme";


function App() {
  const {darkTheme} = GetThemeValue();
 

  return (
    <div className={`${darkTheme ? 'bg-[#050505]' : 'bg-[#e9e9e9] '} min-h-screen `}>
      <Main /> 
    </div>
  );
}

export default App;
