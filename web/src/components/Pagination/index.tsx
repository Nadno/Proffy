import React from 'react';

interface IPaginationProps {
  page: number;
  totalPages: number;
  setPage: Function;
}

const Pagination = ({ page: PAGE, totalPages: TOTAL_PAGES, setPage }: IPaginationProps) => {
  const PAGE_MIN_VALUE = 1;

  const nextPage = () => {
    if (PAGE < TOTAL_PAGES) return setPage(PAGE + 1);
  };
  const backPage = () => {
    if (PAGE > PAGE_MIN_VALUE) return setPage(PAGE - 1);
  };

  return (
    <div id="pagination">
      <button type="button" onClick={backPage}>Voltar</button>
      <button type="button" onClick={nextPage}>Próxima</button>
    </div>
  );
};

export default Pagination;