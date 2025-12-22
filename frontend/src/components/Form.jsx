import React from "react";

const Form = ({
  formControls = [],
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled = false,
}) => {
  // 🔹 Function that decides what to render for each field
  const renderInputField = (control) => {
    const value = formData?.[control.name] || "";

    switch (control.componentType) {
      case "textarea":
        return (
          <textarea
            id={control.name}
            name={control.name}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            className="border border-gray-400 bg-transparent p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-deepnavy-100"
          />
        );

      case "select":
        return (
          <select
            id={control.name}
            name={control.name}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            className="border border-gray-400 bg-transparent p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-deepnavy-100"
          >
            <option value="">{control.placeholder}</option>
            {control.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            id={control.name}
            name={control.name}
            type={control.type || "text"}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            className="border border-gray-400 bg-transparent p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-deepnavy-100"
          />
        );
    }
  };

  // 🔹 Render form
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      className="max-w-md mx-auto mt-10 p-6 bg-transparent shadow-md rounded text-deepnavy-100"
    >
      {formControls.map((control) => (
        <div key={control.name} className="mb-4">
          <label htmlFor={control.name} className="block mb-1 font-semibold">
            {control.label}
          </label>
          {renderInputField(control)}
        </div>
      ))}

      <button
        disabled={isBtnDisabled}
        type="submit"
        className="w-full bg-deepnavy-100 text-white font-semibold py-2 rounded hover:bg-deepnavy-200 transition-colors duration-200 disabled:opacity-50"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
