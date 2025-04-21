import { useEffect, useState } from "react";
import axios from "axios";

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
      try {
        const res = await axios.get("http://127.0.0.1:8000/archivos/");


      } catch (error) {
        console.error("Error al obtener archivos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
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
                  <p className="text-xs text-gray-500">{file.archivo.split("/").pop()}</p>
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
  );
};

export default FileList;
