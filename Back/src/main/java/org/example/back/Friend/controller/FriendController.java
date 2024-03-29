package org.example.back.Friend.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;

import org.example.back.common.ApiResponse;
import org.example.back.Friend.dto.request.FriendRequestDto;
import org.example.back.Friend.dto.response.FriendDetailResponseDto;
import org.example.back.Friend.dto.response.FriendResponseDto;
import org.example.back.Friend.dto.response.UserSearchResponseDto;
import org.example.back.Friend.service.implementation.FriendServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class FriendController {

	private final FriendServiceImpl friendServiceImpl;

	//내 친구 목록 조회
	@GetMapping("/friend-list/{userIdx}")
	public ResponseEntity<ApiResponse> findAllFriend(@PathVariable int userIdx) {

		List<FriendResponseDto> friendList = friendServiceImpl.findAllFriend(userIdx);

		ApiResponse apiResponse = ApiResponse.builder()
			.message("친구 목록 조회")
			.status(OK.value())
			.data(friendList)
			.build();
		return ResponseEntity.ok(apiResponse);
	}

	//친구 상세 정보 조회
	@GetMapping("/friend/{userIdx}")
	public ResponseEntity<ApiResponse> findByUserIdx(@PathVariable int userIdx) {

		FriendDetailResponseDto friendDetailResponseDto = friendServiceImpl.findFriendDetail(userIdx);

		ApiResponse apiResponse = ApiResponse.builder()
			.message("친구 상세 조회")
			.status(OK.value())
			.data(friendDetailResponseDto)
			.build();
		return ResponseEntity.ok(apiResponse);
	}

	//유저 이메일로 조회
	@GetMapping("/friend/email-search-list")
	public ResponseEntity<ApiResponse> findByUserEmail (@RequestParam String userEmail){
		List<UserSearchResponseDto> userSearchList = friendServiceImpl.userSearchByEmail(userEmail);

		if (userSearchList.isEmpty()) {
			ApiResponse apiErrorResponse = ApiResponse.builder()
				.message("사용자를 찾을 수 없습니다.")
				.status(HttpStatus.NOT_FOUND.value())
				.build();
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiErrorResponse);
		}

		ApiResponse apiResponse = ApiResponse.builder()
			.message("사용자 조회")
			.status(OK.value())
			.data(userSearchList)
			.build();
		return ResponseEntity.ok(apiResponse);
	}
	//
	//유저 닉네임으로 조회
	@GetMapping("/friend/nickname-search-list")
	public ResponseEntity<ApiResponse> findByUserNickname(@RequestParam String userNickname){
		List<UserSearchResponseDto> userSearchList = friendServiceImpl.userSearchByNickname(userNickname);

		if (userSearchList.isEmpty()) {
			ApiResponse apiErrorResponse = ApiResponse.builder()
				.message("사용자를 찾을 수 없습니다.")
				.status(HttpStatus.NOT_FOUND.value())
				.build();
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiErrorResponse);
		}

		ApiResponse apiResponse = ApiResponse.builder()
			.message("사용자 조회")
			.status(OK.value())
			.data(userSearchList)
			.build();
		return ResponseEntity.ok(apiResponse);
	}

	//친구 요청 보내기
	@PostMapping("/friend/request")
	public ResponseEntity<ApiResponse> friendRequest(@RequestBody FriendRequestDto friendRequestDto){
		friendServiceImpl.sendFriendRequest(friendRequestDto);

		ApiResponse apiResponse = ApiResponse.builder()
			.message("친구 요청")
			.status(OK.value())
			.build();
		return ResponseEntity.ok(apiResponse);
	}

	//친구 요청 수락
	@PatchMapping("/friend/response")
	public ResponseEntity<ApiResponse> friendResponse(@RequestBody FriendRequestDto friendRequestDto){
		friendServiceImpl.acceptFriendRequest(friendRequestDto);

		ApiResponse apiResponse = ApiResponse.builder()
			.message("친구 요청 수락")
			.status(OK.value())
			.build();
		return ResponseEntity.ok(apiResponse);
	}

}
