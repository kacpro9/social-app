import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import AppNav from "./components/AppNav";

function App() {
  return (
    <div className="App">
      <AppNav />
      <AppRoutes />
    </div>
  );
}

export default App;
