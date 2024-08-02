import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <div className="px-20 my-10">
      <div className="flex text-xl">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {item.icon && <item.icon className="mr-1" />}
            <Link to={item.path} className= {`text-[${item.color}] font-semibold `}  >{item.label}</Link>
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
