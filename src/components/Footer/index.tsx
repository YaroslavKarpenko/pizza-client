import React from 'react';

import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
  return (
    <div className="flex  flex-col shadow-custom_2 ">
      <div className="px-5 min-[400px]:px-10 sm:px-20 md:px-30 xl:px-40 custom:px-56 h-40 bg-sky-600 dark:bg-indigo-950 text-gray-100 dark:text-gray-300 text-xs sm:text-sm  font-normal sm:font-medium">
        <div className="flex flex-row justify-between mt-8 px-5 sm:px-10 md:px-20 xl:px-30">
          <div className="flex flex-col items-start gap-2">
            <a className=" cursor-pointer">Home</a>
            <a className=" cursor-pointer">About</a>
            <a className=" cursor-pointer">Reviews</a>
          </div>
          <div className="flex flex-col items-center gap-2 ">
            <span>Yaroslav Karpenko</span>
            <span>2024</span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <a className=" flex flex-row items-center justify-center cursor-pointer">
              Telegram
              {<TelegramIcon />}
            </a>
            <a className=" flex flex-row items-center justify-center cursor-pointer">
              Github {<GitHubIcon />}
            </a>
            <a className=" flex flex-row items-center justify-center cursor-pointer">
              Linkedin {<LinkedInIcon />}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
