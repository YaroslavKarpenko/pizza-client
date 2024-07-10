import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { useAppDispatch } from '../../../reducers/hooks';
import { setSearch } from '../../../reducers/filterReducer';

import debounce from 'lodash.debounce';
import qs from 'qs';
import { useLocation } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,

  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '15ch',
      },
    },
  },
}));

const SearchHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const initialized = React.useRef<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>('');

  React.useEffect(() => {
    if (!initialized.current && window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const parsedSearch = params.search as string;
      setSearchText(parsedSearch);
      initialized.current = true;
    }
  }, []);

  const { pathname, search } = useLocation();

  const isCatalogPage = pathname === '/products';
  const hasSearchParams = search !== '';
  const shouldShowSearchHeader = isCatalogPage || hasSearchParams;

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearch(str));
    }, 250),
    [],
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);
    updateSearchValue(searchValue);
  };

  return (
    <>
      {shouldShowSearchHeader && (
        <div className="flex items-center pl-3">
          <Search className="border-4 border-double border-gray-100 dark:border-gray-300 flex h-9  ">
            <SearchIconWrapper>
              <SearchIcon fontSize="small" className="text-gray-100 dark:text-gray-300" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={handleSearchChange}
            />
          </Search>
        </div>
      )}
    </>
  );
};
export default SearchHeader;
