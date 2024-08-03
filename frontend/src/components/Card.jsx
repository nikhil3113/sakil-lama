import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoMdCloudUpload } from "react-icons/io";

const Card = ({ projects }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  const getRandomColor = () => {
    const colors = ["#F8A01D", "#7E22CE", "#6366F1"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
     {projects.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ">
       
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-4 rounded-lg shadow-lg mb-4"
            >
              <div className=" flex justify-evenly ">
                <div
                  className="flex items-center justify-center  text-white mb-4 text-5xl font-bold xl:p-8 md:p-3 p-2 rounded-lg"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  {getInitials(project.name)}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#7E22CE]">
                    {project.name}
                  </h2>
                  <div className="mt-4">
                    <p className="mb-2 text-gray-700 font-semibold">
                      {project.subProjects && project.subProjects.length > 0
                        ? `${project.subProjects.length} Episodes`
                        : "0 Episodes"}
                    </p>
                  </div>
                </div>
              </div>
              <Link
                to={`/subproject/${project.id}`}
                className="flex justify-end items-center mr-5 cursor-pointer"
              >
                <FaArrowRight />
              </Link>
            </div>
          ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-5  border-4 border-dashed  border-gray-400 h-64 mt-10 rounded-xl">
            <IoMdCloudUpload className="text-7xl " />
            <p className="font-semibold text-xl">Create a new Project</p>
            <Link to={`/project/create`}>
              <button className="bg-[#7E22CE] text-white font-medium px-4 py-2 rounded-xl w-full">
                Create
              </button>
            </Link>
          </div>    
        )}
      
    </>
  );
};

export default Card;
