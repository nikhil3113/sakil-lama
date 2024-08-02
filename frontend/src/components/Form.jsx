import { useState } from "react";
import { Link } from "react-router-dom";

const ProjectForm = ({ title, fields, onSubmit, userAuth }) => {
  const [formData, setFormData] = useState(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#7E22CE]">{title}</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label htmlFor={field.name} className="block text-lg font-medium mb-2 text-[#7E22CE]">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
              />
            </div>
          ))}
          <div className="flex justify-center">
            <button type="submit" className="bg-[#7E22CE] text-white font-medium px-4 py-2 rounded-lg">
              {title}
            </button>
          </div>
        </form>
        <Link to={`/${userAuth}`} className="font-bold text-[#7E22CE] underline underline-offset-1">
          {userAuth}
        </Link>
      </div>
    </div>
  );
};

export default ProjectForm;
