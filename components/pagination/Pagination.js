import React from "react";
import { Pagination as PaginationSU } from "semantic-ui-react";
import { useRouter } from "next/router";
import queryString from "query-string";
// Inicio
export default function Pagination(props) {
  // props
  const { totalGames, page, limitperPage } = props;
  // constantes
  const router = useRouter();
  const urlParse = queryString.parseUrl(router.asPath);
  const totalpages = Math.ceil(totalGames / limitperPage);
  // Funciones
  const gotoPage = (newPage) => {
    urlParse.query.page = newPage;
    const url = queryString.stringifyUrl(urlParse);
    router.push(url);
  };
  return (
    <div className="pagination">
      <PaginationSU
        defaultActivePage={page}
        totalPages={totalpages}
        firstItem={null}
        lastItem={null}
        onPageChange={(_, data) => goToPage(data.activePage)}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      />
    </div>
  );
}
