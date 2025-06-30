namespace CommentsApp.Models.DTO
{
    public class CommentDTO
    {

        public int Id { get; set; }

        public string Text { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public string UserName { get; set; }
    }
}
