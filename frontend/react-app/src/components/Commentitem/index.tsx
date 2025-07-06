import React from "react";
import { formatDate } from "../../utils/formatDate";

const CommentItem = ({ comment }: { comment: any }) => {
    return (
        <>
            <tr>
                <td style={{ textAlign: 'center' }}>{comment.userName}</td>
                <td style={{ textAlign: 'center' }}>{comment.email}</td>
                <td style={{ textAlign: 'center' }}>{formatDate(comment.createdDate)}</td>
            </tr>
            <tr>
                <td colSpan={3} style={{ paddingLeft: comment.parentId ? 30 : 0 }}>
                    <p className="comm-text">{comment.text}</p>
                    <div>
                        <textarea className="comment-сreate" placeholder="your answer"></textarea>
                        <div className="comment-btn-block">
                            <input type="file" accept="image/*" className="upload-image-input" />
                            <button>send</button>
                        </div>
                    </div>

                    {comment.replies.length > 0 &&
                        comment.replies.map((reply: any) => (
                            <CommentItem key={reply.id} comment={reply} />
                        ))
                    }
                </td>
            </tr>
        </>
    );
};

export default CommentItem;