import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface FileData {
  id: number;
  titulo: string;
  archivo: string;
}

const FileList = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("No estás autenticado. Por favor inicia sesión.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/archivos/", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          timeout: 10000,
        });

        setFiles(res.data);
      } catch (error) {
        let message = "Error al obtener archivos";
        if (axios.isAxiosError(error)) {
          if (error.code === "ECONNABORTED") {
            message = "Tiempo de espera agotado. Intenta nuevamente.";
          } else if (error.response) {
            switch (error.response.status) {
              case 401:
                message = "No autorizado. Inicia sesión nuevamente.";
                break;
              case 500:
                message = "Error del servidor.";
                break;
              default:
                message = "Error desconocido al cargar archivos.";
            }
          }
        }
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-[#0E457D] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Archivos Cargados
          </h1>

          {loading ? (
            <p className="text-center text-gray-600">Cargando archivos...</p>
          ) : files.length === 0 ? (
            <p className="text-center text-gray-600">No se han subido archivos</p>
          ) : (
            <div className="flex flex-col gap-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow"
                >
                  <div>
                    <p className="font-semibold text-sm">{file.titulo}</p>
                    <p className="text-xs text-gray-500">
                      {file.archivo.split("/").pop()}
                    </p>
                  </div>
                  <a
                    href={file.archivo}
                    download
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-blue-600 transition"
                  >
                    Descargar
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileList;
