import { Link } from 'react-router-dom';

interface DrawerListProps {
  list: string[][];
  toggle: (isOpen: boolean) => void;
}

const DrawerList: React.FC<DrawerListProps> = ({ list, toggle }) => {
  return (
    <div className="fixed left-0 h-screen w-16 z-50 ">
      <div className=" w-44 sm:w-60 h-full flex justify-center bg-sky-600 dark:bg-indigo-950">
        <ul className=" flex-col mt-5  w-full items-center flex gap-5 text-gray-100 dark:text-gray-300 font-semibold text-lg">
          {list.map((item, id) => {
            return (
              <li
                key={id}
                className="flex p-1 rounded-sm justify-center hover:bg-gray-100 dark:hover:bg-gray-300 hover:text-sky-600 dark:hover:text-indigo-950 hover:shadow-2xl items-center transition-all	duration-200	ease-in-out">
                <Link className="" to={`${item[1]}`} onClick={() => toggle(false)}>
                  {item[0]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DrawerList;
