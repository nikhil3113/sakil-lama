import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 ">
        {projects.length > 0 ? (
          projects.map((project) => (
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
          ))
        ) : (
          <h1 className="text-3xl text-center text-[#7E22CE]">No Projects</h1>
        )}
      </div>
    </>
  );
};

export default Card;
