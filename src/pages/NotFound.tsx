import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full min-h-screen h-full px-5 min-[400px]:px-10 sm:px-20 md:px-30 xl:px-40 custom:px-56">
      <img className="" src="src\assets\img\error-404.png" alt="Not Found" />
      <h2 className="">{t('not-found.title')}</h2>
      <p className="">
        {t('not-found.p1')}
        <Link to={'/'} className="">
          {t('not-found.link-home')}
        </Link>
        {t('not-found.p2')}
        <Link to={'/about'} className="">
          {t('not-found.link-about')}
        </Link>
        {t('not-found.p3')}
      </p>
    </div>
  );
};

export default NotFound;
