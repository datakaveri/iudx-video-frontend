import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";


const TablePagination = ({
    totalPages,
    currentPage,
    handlePageClick,
    totalPageOnView = 5,
}) => {

    const remainingPages = totalPages % totalPageOnView;
    const isFirstBatch = currentPage <= totalPageOnView;
    const isLastBatch = currentPage > totalPages - (remainingPages === 0 ? totalPageOnView : remainingPages);
    const startPage = Math.floor((currentPage - 1) / totalPageOnView) * totalPageOnView + 1;
    const noOfBatch = startPage > 0 ? (currentPage > totalPages - remainingPages ? remainingPages : totalPageOnView) : 0;

    return (
        <Pagination>

            <PaginationItem disabled={isFirstBatch}>
                <PaginationLink onClick={e => handlePageClick(e, 1)} first href="#" />
            </PaginationItem>

            <PaginationItem disabled={isFirstBatch}>
                <PaginationLink onClick={e => handlePageClick(e, startPage - totalPageOnView)} previous href="#" />
            </PaginationItem>

            {[...Array(noOfBatch)].map((page, i) => (
                <PaginationItem active={startPage + i === currentPage} key={i}>
                    <PaginationLink onClick={e => handlePageClick(e, startPage + i)} href="#">
                        {startPage + i}
                    </PaginationLink>
                </PaginationItem>
            ))}

            <PaginationItem disabled={isLastBatch}>
                <PaginationLink onClick={e => handlePageClick(e, startPage + totalPageOnView)} next href="#" />
            </PaginationItem>

            <PaginationItem disabled={isLastBatch}>
                <PaginationLink onClick={e => handlePageClick(e, totalPages)} last href="#" />
            </PaginationItem>

        </Pagination>
    );
}

export default TablePagination;
