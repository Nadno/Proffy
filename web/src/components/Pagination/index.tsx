import React from 'react';

interface IPaginationProps {
  page: number;
  totalPages: number;
  setPage: Function;
}

const Pagination = ({ page, totalPages, setPage }: IPaginationProps) => {

  const nextPage = () => {
    if (page < totalPages) {
      return setPage(page + 1);
    }
  };

  const backPage = () => {
    if (page > 1) {
      return setPage(page - 1);
    }
  };

  return (
    <div id="pagination">
      <button type="button" onClick={backPage}>Voltar</button>
      <button type="button" onClick={nextPage}>Próxima</button>
    </div>
  );
};

export default Pagination;