import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// userEvent는 클릭, 키보드 이벤트 등 다양한 이벤트를 실제 브라우저에서의 동작과 유사하게 시뮬레이션 할 수 있는 라이브러리

export default async component => {
  const user = userEvent.setup();

  return {
    user,
    ...render(component),
  };
};
