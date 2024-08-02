import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { format } from "date-fns";
import { IoMdCloudUpload } from "react-icons/io";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "dd MMMM HH:mm");
};

function trim(str) {
  const words = str.split(" ");
  const trimmedWords = words.slice(0, 10);
  const trimmedString = trimmedWords.join(" ");
  return trimmedString + "...";
}

const Table = ({ project, id, projectName, onDelete }) => {
  const handleDelete = (subProjectId) => {
    if (window.confirm("Are you sure you want to delete this subproject?")) {
      onDelete(subProjectId);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-[#7E22CE] p-5">{projectName}</h1>
        <Link to={`/subproject/create/${id}`}>
          <button className="bg-[#7E22CE] text-white font-medium px-4 py-2 rounded-xl ">
            Create Episode
          </button>
        </Link>
      </div>
      {project.length > 0 ? (
        <div className="overflow-x-auto shadow-lg mt-5 rounded-lg ">
          <table className="w-full bg-white ">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold text-gray-700">
                  Upload Date and Time
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold text-gray-700">
                  Description
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {project.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">
                    {item.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">
                    {formatDate(item.date)}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">
                    {trim(item.description)}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 font-semibold">
                    {item.status}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 flex items-center">
                    <MdDelete
                      className="text-red-500 cursor-pointer mr-2 text-3xl"
                      onClick={() => handleDelete(item.id)}
                    />
                    <Link to={`/subproject/edit/${item.id}`}>
                      <MdEdit className="text-green-500 cursor-pointer text-3xl" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5  border-4 border-dashed  border-gray-400 h-64 mt-10 rounded-xl">
          <IoMdCloudUpload className="text-7xl " />
          <p className="font-semibold text-xl">Create a new Episode</p>
          <Link to={`/subproject/create/${id}`}>
            <button className="bg-[#7E22CE] text-white font-medium px-4 py-2 rounded-xl w-full">
              Create
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Table;
