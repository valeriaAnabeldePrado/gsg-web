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
    <form onSubmit={handleSubmit(handleFormSubmit)} className={className}>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label
            htmlFor={field.name}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {field.label}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              defaultValue={field.defaultValue}
              {...register(field.name, field.validation)}
              className="sm:min-w-80 lg:min-w-96 p-2 rounded-xl bg-white border-solid border-2 border-slate-600"
              aria-invalid={!!errors[field.name]}
            />
          ) : (
            <input
              id={field.name}
              type={field.type}
              defaultValue={field.defaultValue}
              {...register(field.name, field.validation)}
              className="sm:min-w-80 lg:min-w-96 p-2 rounded-xl bg-white border-solid border-2 border-slate-600"
              aria-invalid={!!errors[field.name]}
            />
          )}

          {errors[field.name] && (
            <span className="text-red-500 mt-1 block" role="alert">
              {errors[field.name]?.message || 'Este campo es requerido'}
            </span>
          )}
        </div>
      ))}

      <button type="submit" className="b-extra text-black buttonForm">
        Enviar
      </button>
    </form>
  );
};

export default DynamicForm;
