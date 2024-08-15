//Path: strateger-react/src/components/common/Ventanita.jsx

/**
 * Represents a Ventanita component.
 * @param {Object} props - The props object.
 * @param {string} props.titulo - The title of the Ventanita.
 * @param {string} props.contenido - The content of the Ventanita.
 * @returns {JSX.Element} The rendered Ventanita component.
 */
const Ventanita = ({ titulo, contenido }) => {
  return (
    <div className="w-full mx-auto">
      <div className="grid grid-rows-[auto,1fr]">
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
