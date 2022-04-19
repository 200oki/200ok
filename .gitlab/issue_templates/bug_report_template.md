버그가 난 상황에 대해 설명해 주세요.

## 시도하려는 일

뭘 하려고 했는지 설명해 주세요.

```js
// 코드를 보여주세요.
> console.log('Hello World')
```

## 기대하고 있던 결과

기능이 정상 작동한 경우 어떤 일이 일어났어야 하는지 설명해 주세요.

```sh
> console.log('Hello World')
Hello World
undefined
```

## 실제로 일어난 결과

실제로 어떤 식으로 작동했는지 설명해 주세요.
콘솔 로그가 있다면 복사해서 주시면 도움이 됩니다.
텍스트 복사 방법은 터미널마다 다릅니다.
git bash를 비롯한 unix 셸에서는 보통 `Shift` + `Ctrl` + `C` 버튼으로 복사가 됩니다.

```js
Uncaught ReferenceError: console is not defined
```

## 추가적인 정보를 올려주세요.

백엔드 버그인 경우, 테스트를 정확하게 하기 위해서는 db의 어떤 문서를 사용했는지 알면 좋습니다.
대부분은 로그인한 상태여야 작동하니, jwt 토큰 정보나 사용자의 email, password를 알려 주시면 테스트가 편합니다.

```json
{
    "food": [
        "ham",
        "jam",
        "spam",
        "eggs"
    ]
}
```

[JSON Formatter](https://jsonformatter.curiousconcept.com/#) 사이트에서 JSON을 사람이 읽기 쉽게 포맷을 해 줄 수 있습니다.

