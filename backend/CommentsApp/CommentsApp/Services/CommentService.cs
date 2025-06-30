using AutoMapper;
using CommentsApp.Interfaces;
using CommentsApp.Migrations;
using CommentsApp.Models;
using CommentsApp.Models.DTO;
using CommentsApp.Repository;
using CommentsApp.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CommentsApp.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;

        public CommentService(ICommentRepository commentRepository, IMapper mapper)
        {
            _mapper = mapper;
            _commentRepository = commentRepository;
        }

        public async Task<IEnumerable<Comment>> GetComments(int pageSize = 25, int pageNumber = 1)
        {
            IEnumerable<Comment> comments;
            comments = await _commentRepository.GetAllAsync(pageSize: pageSize, pageNumber: pageNumber);

            return comments;
        }

        public async Task<CommentCreateDTO> CreateComment(CommentCreateDTO commentCreateDTO, string userId)
        {
            Comment comment = _mapper.Map<Comment>(commentCreateDTO);
            comment.ApplicationUser.Id = Convert.ToString(userId);

            await _commentRepository.CreateAsync(comment);

            var createdComment = await _commentRepository.GetAsync(x => x.Id == comment.Id, includeProperties: "ApplicationUser");

            CommentCreateDTO resultDto = _mapper.Map<CommentCreateDTO>(createdComment);
            return resultDto;
        }

        public async Task<bool> DeleteComment(int id)
        {
            var comment = await _commentRepository.GetAsync(x => x.Id == id);

            if (comment == null)
                return false;

            await _commentRepository.RemoveAsync(comment);

            return true;
        }

        public async Task<bool> UpdateComment(UpdateCommentDTO updateCommentDTO)
        {
            Comment comment = _mapper.Map<Comment>(updateCommentDTO);

            var updatedComment = await _commentRepository.UpdateAsync(comment);

            return updatedComment != null;
        }
    }
}
