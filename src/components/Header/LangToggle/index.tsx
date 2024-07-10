import React from 'react';
import { useTranslation } from 'react-i18next';
import Popover from '../../Popover';
import LanguageIcon from '../../svg/LanguageIcon.svg?react';
export enum Language {
  UK = 'uk',
  EN = 'en',
}

const LangToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const getInitialLanguage = (): Language | null => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('app-lang');
      return typeof storedPrefs === 'string' &&
        (storedPrefs === Language.EN || storedPrefs === Language.UK)
        ? storedPrefs
        : null;
    }
    return null;
  };
  const initialLanguage = getInitialLanguage() || i18n.language;
  const [currentLanguage, setCurrentLanguage] = React.useState<string>(initialLanguage);

  React.useEffect(() => {
    window.localStorage.setItem('app-lang', currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return (
    <Popover>
      <Popover.Button className="text-gray-100 dark:text-gray-300 flex justify-center items-center h-full">
        <LanguageIcon className="w-8 h-8" />
      </Popover.Button>
      <Popover.List className=" absolute top-10 right-0 z-30 flex flex-col rounded-lg bg-gray-200 dark:bg-gray-500 dark:text-gray-400 font-normal text-lg p-2 gap-2 items-center justify-center shadow-lg">
        {Object.values(Language).map((lang) => {
          return (
            <Popover.ListItem
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`${
                currentLanguage === lang
                  ? 'bg-gray-400  cursor-default dark:bg-gray-800 dark:text-gray-400'
                  : ' hover:bg-gray-300  dark:hover:bg-gray-400'
              }`}
              disabled={currentLanguage == lang}>
              {lang === Language.UK ? 'Українська' : 'English'}
            </Popover.ListItem>
          );
        })}
      </Popover.List>
    </Popover>
  );
};

export default LangToggle;
