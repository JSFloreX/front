import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import StatsDashboard from "./components/StatsDashboard";
import FilePreview from "./components/FilePreview";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Outlet />
    </div>
    
  )
}

export default App;