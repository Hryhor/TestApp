namespace CommentsApp.Models.DTO
{
    public class RefreshRequestDTO
    {
        public string RefreshToken { get; set; }
        public UserDTO User  { get; set; }
    }
}
