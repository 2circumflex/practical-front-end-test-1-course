import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// Setup and Teardown : https://vitest.dev/api/#setup-and-teardown
// beforeEach(() => {
//   console.log('root - beforeEach');
// });
// beforeAll(() => {
//   console.log('root - beforeAll');
// });
// afterEach(() => {
//   console.log('root - afterEach');
// });
// afterAll(() => {
//   console.log('root - afterAll');
// });

// my-class란 class가항상 적용된 컴포넌트를 렌더링
// beforeEach(async () => {
//   await render(<TextField className="my-class" />);
// });

// 아래처럼 파일 내에서 전역 변수를 사용하여 조건부로 동작을 분리하는 것은 좋지 않음
// let someCondition = false;
// beforeEach(async () => {
//   if (someCondition) {
//     await render(<TextField className="my-class" />);
//   } else {
//     // ...
//   }
// });

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // Arrange - 테스트를 위한 환경 만들기
  // -> className을 지닌 컴포넌트 렌더링
  // ACT - 테스트할 동작 발생
  // -> 렌더링에 대한 검증이기 때문에 이 단계는 생략
  // -> 클릭이나 메서드 호출, prop 변경 등등에 대한 작업이 여기에 해당
  // Assert - 올바른 동작이실행되었는지 검증
  // -> 렌더링 후 DOM에 해당 class가 존재하는지 검증

  // render : https://testing-library.com/docs/react-testing-library/api#render
  // render API 호출 -> 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM구조가 반영
  // jsDOM : Node.js에서 사용하기 위해 많은 웹 표준을순수 자바스크립트로 구현
  await render(<TextField className="my-class" />);

  // vitest의 expect 함수를 사용하여 기대 결과를 검증

  // className이란 내부 prop이나 state 값을 검증 (X)
  // 렌더링되는 DOM 구조가 올바르게 변경되었는지 확인 (O) -> 최종적으로 사용자가 보는 결과는 DOM
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // DOM 구조를 확인할 수 있음
  // screen.debug();

  expect(textInput).toHaveClass('my-class');
});

describe('placeholder', () => {
  // beforeEach(() => {
  //   console.log('placeholder - beforeEach');
  // });

  /**
   * it('should ~~~');
   * test('if ~~~');
   */

  // it -> test 함수의 alias
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    // 기대결과 === 실제, 결과 -> 성공
    // 기대결과 !== 실제, 결과 -> 실패
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
    // 단언(assertion) -> 테스트가 통과하기 위한 조건 -> 검증 실행

    // https://vitest.dev/api/expect.html
    // vitest 공식 홈페이지를 들어와 보면 expect 함수를 통해 사용할 수 있는 다양한 매처를 확인 가능
  });

  it('placeholder props에 따라 placeholder가 변경된다', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
  });
});
