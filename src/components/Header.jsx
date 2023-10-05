import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";

const Header = () => {
  return (
    <header className="w-full  bg-transparent">
      <div className="border-b-[1px] w-full py-4">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex items-center justify-between ">
            <h5 className="flex items-center space-x-2">
              <span>Abierto las 24 horas</span> <MdOutlineWatchLater />
            </h5>
            <div>
              <ul className="flex space-x-7">
                <li>Servicios</li>
                <li>Careers</li>
                <li>News</li>
                <li className="flex items-center space-x-2 ">
                  <AiOutlineMail /> <span>tech@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
