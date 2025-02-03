import { useForm } from 'react-hook-form';

const DynamicForm = ({ fields, onSubmit, className = '' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data, reset);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={className}>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          {/* Etiqueta asociada al campo */}
          <label
            htmlFor={field.name}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {field.label}
          </label>

          {/* Campo de entrada */}
          <input
            id={field.name}
            type={field.type}
            defaultValue={field.defaultValue}
            {...register(field.name, field.validation)}
            className="input-form p-2 rounded-xl bg-white border-solid border-2 border-purple-600"
            aria-invalid={!!errors[field.name]} // Indica si el campo tiene errores
          />

          {/* Validación de errores */}
          {errors[field.name] && (
            <span className="text-red-500 mt-1 block" role="alert">
              {errors[field.name]?.message || 'Este campo es requerido'}
            </span>
          )}
        </div>
      ))}

      <button type="submit" className="b-extra text-white">
        Enviar
      </button>
    </form>
  );
};

export default DynamicForm;
