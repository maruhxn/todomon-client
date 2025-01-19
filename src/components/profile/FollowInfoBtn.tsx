import {
  respondFollowRequest,
  sendFollowOrMatFollowRequest,
  unfollowRequest,
} from "@/apis/repository/follow.repository";
import { FollowInfoItem } from "@/types/profile";
import { Button } from "../ui/button";

/*
    팔로우 요청 보냈음
        + 대기 중 -> 팔로우 요청 취소 버튼
        + 수락됨 -> 언팔로우 버튼
        + 거절됨 -> 팔로우 버튼
    팔로우 요청 보낸 적 없음
        + 상대도 보낸 적 없거나 보냈는데 거절되었음 -> 팔로우 버튼
        + 상대는 보냈음
        대기 중 -> 팔로우 수락 버튼
        수락됨 -> 맞팔로우 버튼
*/

interface FollowInfoBtnProps {
  memberId: number;
  followInfo: FollowInfoItem;
}

export default function FollowInfoBtn({
  followInfo,
  memberId,
}: FollowInfoBtnProps) {
  const unFollowRequestWithId = unfollowRequest.bind(null, memberId);
  const respondFollowRequestWithId = respondFollowRequest.bind(
    null,
    followInfo.receivedRequestId,
    true
  );
  const sendFollowOrMatFollowRequestWithId = sendFollowOrMatFollowRequest.bind(
    null,
    memberId
  );

  const isFollowing = followInfo.isFollowing;
  const isReceivedRequest = followInfo.receivedRequestId;
  const requestIsNotRejected = followInfo.sentFollowStatus !== "REJECTED";
  const receivedRequestIsNotRejected =
    followInfo.receivedFollowStatus !== "REJECTED";

  if (isFollowing && requestIsNotRejected) {
    return (
      // 팔로우 요청 보냈을 경우
      followInfo.sentFollowStatus === "PENDING" ? ( // 팔로우 수락 대기 중
        <form action={unFollowRequestWithId}>
          <Button variant="destructive">팔로우 요청 취소</Button>
        </form>
      ) : (
        // 팔로우 수락됨
        <form action={unFollowRequestWithId}>
          <Button variant="destructive">언팔로우</Button>
        </form>
      )
    );
  } else if (isReceivedRequest && receivedRequestIsNotRejected) {
    return (
      // 상대는 보냈음
      followInfo.receivedFollowStatus === "PENDING" ? ( // 받은 요청이 대기 중
        <form action={respondFollowRequestWithId}>
          <Button className="bg-blue-500 hover:bg-blue-600">팔로우 수락</Button>
        </form>
      ) : (
        // 받은 요청이 수락되었음

        <form action={sendFollowOrMatFollowRequestWithId}>
          <Button className="bg-blue-500 hover:bg-blue-600">맞팔로우</Button>
        </form>
      )
    );
  } else {
    return (
      <form action={sendFollowOrMatFollowRequestWithId}>
        <Button className="bg-blue-500 hover:bg-blue-600">팔로우</Button>
      </form>
    );
  }
}
