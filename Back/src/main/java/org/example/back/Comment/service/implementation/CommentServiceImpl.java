package org.example.back.Comment.service.implementation;

import lombok.RequiredArgsConstructor;

import org.example.back.Comment.dto.request.PostCommentRequestDto;
import org.example.back.Comment.dto.request.PutCommentRequestDto;
import org.example.back.Comment.dto.response.GetCommentsResponseDto;
import org.example.back.Comment.entity.CommentEntity;
import org.example.back.User.entity.UserEntity;
import org.example.back.Comment.repository.CommentRepository;
import org.example.back.User.repository.UserRepository;
import org.example.back.Comment.service.CommentService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    @Override
    public List<GetCommentsResponseDto> getComments(int boardIdx) {
        List<CommentEntity> dataList = commentRepository.findAllByBoardIdxAndCommentDeleted(boardIdx, false);
        List<GetCommentsResponseDto> results = new ArrayList<>();

        for(CommentEntity data : dataList){
            GetCommentsResponseDto dto = new GetCommentsResponseDto(data);
            UserEntity writer = userRepository.findByUserIdx(data.getUserIdx());
            dto.setUserNickname(writer.getNickname());
            results.add(dto);
        }

        return results;
    }

    @Override
    public void postComment(int boardIdx, PostCommentRequestDto comment) {
        System.out.println(comment);
        CommentEntity result = new CommentEntity(boardIdx, comment);
        int userIdx = userRepository.findByNickname(comment.getUserNickname()).getUserIdx();

        result.setUserIdx(userIdx);
        System.out.println(result);
        commentRepository.save(result);
    }

    @Override
    public void updateComment(UserDetails userDetails, PutCommentRequestDto comment) throws Exception {
        UserEntity user = userRepository.findByUserEmail(userDetails.getUsername()).orElseThrow(() -> new Exception("잘못된 접근입니다."));
        CommentEntity data = commentRepository.findByCommentIdx(comment.getCommentIdx());

        if(user.getUserIdx() == data.getUserIdx()){
            data.setCommentContent(comment.getCommentContent());
            commentRepository.save(data);
        }
        else throw new Exception("잘못된 접근입니다.");
    }

    @Override
    public void deleteComment(int commentIdx, UserDetails userDetails) throws Exception {
        UserEntity user = userRepository.findByUserEmail(userDetails.getUsername()).orElseThrow(() -> new Exception("잘못된 접근입니다."));
        CommentEntity data = commentRepository.findByCommentIdx(commentIdx);

        if(user.getUserIdx() == data.getUserIdx()){
            data.setCommentDeleted(true);
            commentRepository.save(data);
        }
        else throw new Exception("잘못된 접근입니다.");
    }
}
