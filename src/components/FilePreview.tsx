import { useParams } from "react-router-dom";

const FilePreview = () => {
  const { fileName } = useParams<{ fileName: string }>();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Vista previa del archivo</h1>
      <p className="mb-4 text-gray-600">Mostrando contenido para: <strong>{fileName}</strong></p>
      <div className="border p-4 rounded bg-gray-100">
        Aquí iría la vista previa del archivo. (PDF, Word, etc.)
      </div>
    </div>
  );
};

export default FilePreview;