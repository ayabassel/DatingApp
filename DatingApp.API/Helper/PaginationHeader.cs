namespace DatingApp.API.Helper
{
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }    
        public int ItemsPerPage { get; set; }
        public int NumberOfPages { get; set; }
        public int TotalItems { get; set; }

        public PaginationHeader(int currentPage, int itemsPerPage, int numberOfPages, int totalItems)
        {
            CurrentPage = currentPage;
            ItemsPerPage = itemsPerPage;
            NumberOfPages = numberOfPages;
            TotalItems = totalItems;
        }
    }
}