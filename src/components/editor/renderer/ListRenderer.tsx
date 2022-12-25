import { NextPage } from "next";

const ListRenderer: NextPage<{
  isOrdered: boolean;
  items: string[];
}> = ({ isOrdered, items }) => {
  if (isOrdered)
    return (
      <ol className="list-decimal list-inside py-2 px-3 ">
        {items.map((item, index) => (
          <li key={index} className="py-1 pl-1">
            {item}
          </li>
        ))}
      </ol>
    );
  else
    return (
      <ul className="list-disc list-inside py-2 px-3 ">
        {items.map((item, index) => (
          <li key={index} className="py-1 pl-1">
            {item}
          </li>
        ))}
      </ul>
    );
};

export default ListRenderer;
