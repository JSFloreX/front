import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const FileUpload = () => {
  const [title, setTitle] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`${newFiles.length} archivo(s) seleccionado(s)`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Por favor ingresa un título para el archivo");
      return;
    }

    if (files.length === 0) {
      toast.error("Debes seleccionar al menos un archivo");
      return;
    }

    const token = Cookies.get("access_token");

    if (!token) {
      toast.error("No estás autenticado. Por favor inicia sesión.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    files.forEach((file) => formData.append("files", file));

    try {
      const url = import.meta.env.VITE_API_URL + "/subir-archivo/";

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
        timeout: 10000,
      });

      toast.success("Archivo(s) subido(s) correctamente", {
        autoClose: 1500,
      });

      setTitle("");
      setFiles([]);
    } catch (error) {
      let errorMessage = "Error al subir archivos";

      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          errorMessage = "Tiempo de espera agotado. Intenta nuevamente.";
        } else if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage = "Solicitud inválida";
              break;
            case 401:
              errorMessage = "Token inválido o expirado";
              break;
            case 500:
              errorMessage = "Error del servidor";
              break;
            default:
              errorMessage = error.response.data?.message || "Error desconocido";
          }
        }
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Subir Archivos
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
              Título
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Escribe un título para el archivo"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <label
            htmlFor="fileUpload"
            className="group flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer p-6 rounded-lg"
          >
            <span className="text-gray-600 group-hover:text-blue-700">
              Haz click o arrastra tus archivos aquí
            </span>
            <input
              id="fileUpload"
              type="file"
              accept=".pdf,.doc,.docx"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {files.length > 0 && (
            <div>
              <h2 className="text-gray-700 font-semibold mb-2">
                Archivos seleccionados:
              </h2>
              <ul className="flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <li
                    key={i}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {f.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default FileUpload;
