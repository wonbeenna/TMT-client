import Pagination from "react-js-pagination";
import { PagingProps } from "../../interfaces";
import "./Pagination.css";

function Paging({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: PagingProps) {
  return (
    <Pagination
      totalItemsCount={totalPosts}
      onChange={paginate}
      activePage={currentPage}
      itemsCountPerPage={postsPerPage}
      pageRangeDisplayed={5}
      innerClass="pagination"
      linkClass="Paginate_a"
      itemClass="Paginate_li"
      activeClass="active"
      activeLinkClass="active_a"
    />
  );
}

export default Paging;
