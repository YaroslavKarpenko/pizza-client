import React from 'react';
import { useAppDispatch, useAppSelector } from '../../reducers/hooks';
import { changeCurrentPage } from '../../reducers/filterReducer';
import { ThemeContext } from '../Header/ThemeToggle/ThemeContext';
import { Pagination as Pag } from '@mui/material';
import styles from './pagination.module.css';
import {
  selectCurrentPage,
  selectLoadingStatus,
  selectPageCount,
  selectPizzaList,
} from '../../reducers/selectors';
import { LoadingStatus } from '../../reducers/pizzaReducer';

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = React.useContext(ThemeContext);

  const pageCount = useAppSelector(selectPageCount);
  const currentPage = useAppSelector(selectCurrentPage);
  const pizzaList = useAppSelector(selectPizzaList);
  const loadingStatus = useAppSelector(selectLoadingStatus);

  return (
    <div
      className={`${
        loadingStatus === LoadingStatus.FULFILLED && pizzaList.length === 0 ? 'hidden' : 'flex'
      } flex-row items-center justify-center mb-14`}>
      <Pag
        className={theme === 'dark' ? styles.paginationDark : styles.paginationLight}
        variant="text"
        color="primary"
        shape="rounded"
        count={pageCount}
        page={currentPage}
        onChange={(_, num) => dispatch(changeCurrentPage(num))}
        siblingCount={1}
        sx={{ '& .MuiPagination-root': {} }}
      />
    </div>
  );
};

export default Pagination;
