#!/usr/bin/env bash
# 프로젝트 기간 동안 일일 과제 제출을 도와주는 프로그램입니다.
# git 로그를 분석해 지난 {몇시간전부터} 시간 동안 {깃랩사용자이름} 사용자의 커밋으로 수정된
# 파일들만 찾아서 "../report-{디렉터리이름}-yymmdd" 폴더에 파일 시스템 구조를 유지한
# 채로 복사하는 스크립트입니다.
#
# 사용 방법: autoreport.sh {디렉터리이름} {깃랩사용자이름} {몇시간전부터}
# $ autoreport.sh 윤성준 YunSeongJun 24
#   -> ../report-윤성준-220419 폴더에 YunSeongJun 사용자가 지난 24시간 동안 변경한
#      모든 파일을 복사합니다.

show_usage() {
  echo "Usage: $0 [ -h ] [ -d ] 디렉터리이름 깃랩사용자이름 몇시간전부터"
}

args=()
dryrun=0
while [ $OPTIND -le "$#" ]; do
    if getopts 'hd' option; then
        case $option in
            h)
                show_usage
                echo -e \
'프로젝트 기간 동안 일일 과제 제출을 도와주는 프로그램입니다.
git 로그를 분석해 지난 {몇시간전부터} 시간 동안 {깃랩사용자이름} 사용자의 커밋으로 수정된
파일들만 찾아서 "../report-{디렉터리이름}-yymmdd" 폴더에 파일 시스템 구조를 유지한
채로 복사하는 스크립트입니다.

Options:
  -h        도움말을 표시하고 프로그램을 종료합니다.
  -d        (dryrun) 실제로 작업을 하지는 않고 무슨 일을 할지만 보여줍니다.'
                exit 0
                ;;
            d)
                dryrun=1
                ;;
            *)
                show_usage
                exit 1
                ;;
        esac
    else
        args+=("${!OPTIND}")
        ((OPTIND++))
    fi
done

if [ ${#args[@]} -ne 3 ]; then
    show_usage
    exit 1
fi


# 폴더를 미리 생성해야 합니다.
# 예시 폴더 이름: report-윤성준-220419
destination="../report-${args[0]}-$(date +'%y%m%d')"
if [ $dryrun -eq 0 ]; then
    mkdir $destination
fi

readarray -t hashes < <(
    git --no-pager log \
        --branches \
        --date='relative' \
        --after="${args[2]} hours ago" \
        --committer="${args[1]}" \
        --format='%H' \
)
# declare -p hashes

readarray -t paths < <(
    git --no-pager show \
        --name-only \
        --format='' \
        "${hashes[@]}" \
        | sort -u # \
        # | xargs -i sh -c 'test -f {} && echo {}'
)
# declare -p paths

if [ $dryrun -eq 0 ]; then
    cp --parents --update "${paths[@]}" $destination 2> /dev/null
else
    printf '%s\n' "${paths[@]}"
    echo ''
    echo "[DRYRUN] 위 파일들이 다음 경로로 복사됩니다: ${destination}"
fi
