#!/usr/bin/env bash
#
# Notion export 원본 이미지를 웹 배포용 에셋으로 변환한다.
#
#   - 한글/공백/UUID 파일명 -> ASCII 슬러그 (GitHub Pages URL 인코딩 문제 방지)
#   - 기관 로고: 가로 최대 400px 리사이즈
#   - 프로필 사진: 900x900 본문용 + 1200x630 OG 이미지
#
# macOS 내장 sips 만 사용하므로 별도 의존성이 없다.
# 원본은 source/notion/assets/ 에 그대로 남으며 이 스크립트는 멱등하다.
#
# 사용법: ./tools/prepare-assets.sh
set -euo pipefail

readonly REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
readonly SRC_DIR="${REPO_ROOT}/source/notion/assets"
readonly OUT_DIR="${REPO_ROOT}/assets"
readonly LOGO_DIR="${OUT_DIR}/logos"
readonly LOGO_MAX_WIDTH=400
readonly PROFILE_SIZE=900
readonly OG_WIDTH=1200
readonly OG_HEIGHT=630
# 원본 스튜디오 배경색. 정사각 인물 사진을 OG 비율(1.91:1)로 센터 크롭하면
# 머리가 잘리므로, 같은 색으로 좌우를 패딩해 인물 전체를 남긴다.
readonly OG_PAD_COLOR="C6C9D0"

readonly PROFILE_SRC="2025.01.19_박범지_소준섭_님31169.jpg"

# "원본 파일명|출력 슬러그" — 원본 Notion 페이지의 등장 순서와 동일
readonly LOGO_MAP=(
  "image.png|mois.png"
  "image 1.png|naver.png"
  "2da7a009-5ece-4b21-82a6-2de5580eaef9.png|samsung-electronics.png"
  "53507e79-a83a-48b4-81d7-6b0532f326c3.png|moel-kdt.png"
  "image 2.png|lg-uplus.png"
  "image 3.png|kakao.png"
  "6b45e66b-eb76-44eb-b450-a5cd79ce1af7.png|hyundai-mobis.png"
  "2ced148c-95b8-4ef7-92b9-64a73172b2ce.png|samsung-sds.png"
  "1bf85ed1-1b9c-48d8-8d1a-31d25b2eb899.png|kt.png"
  "image 4.png|fastcampus.png"
  "image 5.png|seegene.png"
  "image 6.png|samsung-display.png"
  "bc43a9f9-a9e6-4879-8a4a-95f3296b0f9a.png|kidp.png"
  "f7fe344f-ad7c-4af8-af48-ac2c201bb549.png|samsung-electro-mechanics.png"
  "47a58d58-cc52-46a7-909f-dc28656d773b.png|art-center-nabi.png"
  "69169fc7-63aa-4aed-b63f-609f70649c2a.png|sen-edu.png"
  "09b61590-086f-4e2c-84b2-0669052f99d8.png|seoul-ai-hub.png"
  "image 7.png|lg-academy.png"
  "0f094cbd-36cd-46f3-8d1b-abd62d287488.png|shinhan-bank.png"
  "76515587-6213-4aab-bad3-70df67fd5bcd.png|daedeok-ai.png"
  "image 8.png|hyundai-wia.png"
  "image 9.png|multicampus.png"
  "5542fa62-7c09-4634-9dfd-dc7c548fdc31.png|lg-electronics.png"
)

fail() {
  echo "prepare-assets: $1" >&2
  exit 1
}

[[ -d "${SRC_DIR}" ]] || fail "원본 디렉터리를 찾을 수 없습니다: ${SRC_DIR}"
command -v sips >/dev/null 2>&1 || fail "sips 를 찾을 수 없습니다 (macOS 전용 스크립트입니다)"

mkdir -p "${LOGO_DIR}"

echo "로고 ${#LOGO_MAP[@]}장 변환 (가로 최대 ${LOGO_MAX_WIDTH}px)"
for entry in "${LOGO_MAP[@]}"; do
  src="${SRC_DIR}/${entry%%|*}"
  out="${LOGO_DIR}/${entry##*|}"
  [[ -f "${src}" ]] || fail "원본 로고가 없습니다: ${src}"
  cp "${src}" "${out}"
  sips --resampleWidth "${LOGO_MAX_WIDTH}" "${out}" >/dev/null
done

echo "프로필 사진 변환 (${PROFILE_SIZE}x${PROFILE_SIZE})"
[[ -f "${SRC_DIR}/${PROFILE_SRC}" ]] || fail "원본 프로필 사진이 없습니다: ${PROFILE_SRC}"
cp "${SRC_DIR}/${PROFILE_SRC}" "${OUT_DIR}/profile.jpg"
sips --resampleHeightWidth "${PROFILE_SIZE}" "${PROFILE_SIZE}" \
     -s format jpeg -s formatOptions 80 "${OUT_DIR}/profile.jpg" >/dev/null

echo "OG 이미지 생성 (${OG_WIDTH}x${OG_HEIGHT})"
cp "${SRC_DIR}/${PROFILE_SRC}" "${OUT_DIR}/og-image.jpg"
sips --resampleHeight "${OG_HEIGHT}" \
     --padToHeightWidth "${OG_HEIGHT}" "${OG_WIDTH}" --padColor "${OG_PAD_COLOR}" \
     -s format jpeg -s formatOptions 82 "${OUT_DIR}/og-image.jpg" >/dev/null

echo "완료 — 총 용량: $(du -sh "${OUT_DIR}" | cut -f1)"
