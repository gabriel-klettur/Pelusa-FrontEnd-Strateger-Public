//Path: strateger-react/src/components/common/Ventanita.jsx

const Ventanita = ({ titulo, contenido }) => {
  return (
    <div className="w-full mx-auto rounded-lg">
      <div className="grid grid-rows-[auto,1fr] gap-2">
        {/* Sección del Título */}
        <div className="bg-african_violet-300 text-white px-4 py-2 font-semibold text-lg">
          {titulo}
        </div>
        
        {/* Sección de Contenido */}
        <div className="bg-african_violet-100 text-african_violet-900 px-6 py-4">
          {contenido}
        </div>
      </div>
    </div>
  );
};

export default Ventanita;
