import { screen, fireEvent } from '@testing-library/react';
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

it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
  // 쿼리 및 우선순위 : https://testing-library.com/docs/queries/about/#priority

  const spy = vi.fn(); // 스파이 함수
  // 스파이 함수 : 테스트 코드에서 특정 함수가 호출되었는지, 함수의 인자로 어떤 것이 넘어왔는지 어떤 값을 반환하는지 등 다양한 값들을 저장
  const { user } = await render(<TextField onChange={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test');

  expect(spy).toHaveBeenCalledWith('test');
});

it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다', async () => {
  const spy = vi.fn();

  const { user } = await render(<TextField onEnter={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test{Enter}');

  expect(spy).toHaveBeenCalledWith('test');
});

it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
  // 포커스 활성화
  // 탭 키로 인풋 요소로 포커스 이동
  // 인풋 요소를 클릭했을때
  // textInput.focus()로 직접 발생
  const spy = vi.fn();
  const { user } = await render(<TextField onFocus={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // fireEvent를 사용하면 포커스 이벤트가 발생하지 않아서 테스트 실패함
  // fireEvent의 클릭은 단순하게 클릭 이벤트만 발생시킬뿐, 그 외에 연쇄적으로 발생하는 이벤트에 대해서는 전혀 고려되지 않기 때문
  // 사용자가 실제 요소를 클릭할 때 pointerdown, mousedown, pointerup, mouseup, click, focus 등의 이벤트가 연쇄적으로 발생
  // 유저이벤트는 이러한 시나리오까지 모두 고려가 되어 있기 때문에 실제 상황과 유사하게 테스트코드 작성 가능
  // 유저이벤트로 작성하는 것을 권장
  // 하지만 스크롤 이벤트처럼 종종 유저이벤트에서 제공되지 않는 사례를 테스트하거나 단순한 컴포넌트 검증일 경우 fireEvent를 사용
  // await fireEvent.click(textInput);

  await user.click(textInput);
  // click과 연관 -> 포커스, 마우스다운, 마우스업 등...

  expect(spy).toHaveBeenCalled();
});

it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  expect(textInput).toHaveStyle({
    borderWidth: '2px',
    borderColor: 'rgb(25, 118, 210)',
  });
  // https://www.inflearn.com/questions/1130563/2-4%EC%9E%A5-%EB%A7%88%EC%A7%80%EB%A7%89-border-%EC%8A%A4%ED%83%80%EC%9D%BC-%EA%B2%80%EC%A6%9D-%EC%8B%9C-%EC%A7%88%EB%AC%B8
});
