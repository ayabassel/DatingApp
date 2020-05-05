export interface Pagination {

    currentPage: number;
    itemsPerPage: number;
    numberOfPages: number;
    totalItems: number;
}

export class PaginationResult<T> {
    result: T;
    pagination: Pagination;
}
