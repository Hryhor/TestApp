using CommentsApp.Models.DTO;
using CommentsApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using System.Xml.Linq;

namespace CommentsApp.Interfaces
{
    public interface ICommentService
    {
        public Task<IEnumerable<Comment>> GetComments(int pageSize = 25, int pageNumber = 1);

        public Task<CommentCreateDTO> CreateComment(CommentCreateDTO commentCreateDTO, string userId);
        public Task<bool> DeleteComment(int id);

        public Task<bool> UpdateComment(UpdateCommentDTO updateCommentDTO);
  
    }
}
