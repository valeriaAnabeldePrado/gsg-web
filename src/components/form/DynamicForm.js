import { useForm } from 'react-hook-form';
import './style.css';

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
    <div className={`max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label
              htmlFor={field.name}
              className="block text-gray-800 text-lg font-medium"
            >
              {field.label}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                defaultValue={field.defaultValue}
                {...register(field.name, field.validation)}
                className="w-full min-h-[120px] px-4 py-3 border-2 border-gray-300 rounded-xl bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none resize-none"
                placeholder={`Ingresa tu ${field.label.toLowerCase()}`}
                aria-invalid={!!errors[field.name]}
              />
            ) : (
              <input
                id={field.name}
                type={field.type}
                defaultValue={field.defaultValue}
                {...register(field.name, field.validation)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-white focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 outline-none"
                placeholder={`Ingresa tu ${field.label.toLowerCase()}`}
                aria-invalid={!!errors[field.name]}
              />
            )}

            {errors[field.name] && (
              <span
                className="text-red-500 text-sm font-medium flex items-center space-x-1"
                role="alert"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  {errors[field.name]?.message || 'Este campo es requerido'}
                </span>
              </span>
            )}
          </div>
        ))}

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
          >
            Enviar Mensaje
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
