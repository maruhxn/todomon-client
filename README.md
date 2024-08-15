# 투두몬

### Sitemap

> 모든 페이지는 로그인 필요

- / (홈) -> 유저의 캘린더를 보여줌

  - /day?date=
  - /week?date=
  - /month?month=

- /members/profile (프로필 페이지)

  - /members/profile/my -> 유저의 프로필을 보여줌
  - /members/profile/[memberId] -> memberId에 해당하는 유저의 프로필을 보여줌
  - /members/profile/[memberId]/followers -> 팔로워 목록을 보여줌
  - /members/profile/[memberId]/followings -> 팔로잉 목록을 보여줌
  - /members/social/follow-requests -> 팔로우 요청 목록을 보여줌
  - /members/social/star-requests -> 받은 ⭐️을 보여줌

- /members/pets

  - /members/pets/my -> 나의 펫들을 보여줌
  - /members/pets/[memberId] -> memberId에 해당하는 유저의 펫 목록을 보여줌

- /members/dex -> 나의 펫 도감을 보여줌.

- /social/rank?type={all, social} -> 랭킹을 보여줌 (전체 랭킹, 소셜 랭킹 2개의 탭 존재)

- /shop -> 상점을 보여줌
