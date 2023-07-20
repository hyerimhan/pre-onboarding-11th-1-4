# [Search](https://main--11th-team3-week4-search.netlify.app/)

👆🏻 제목을 클릭하면 배포된 사이트를 확인하실 수 있습니다.

- 레퍼런스: [한국임상정보](https://clinicaltrialskorea.com/)

 <br/>

## 🗓️ 기간

- 2023년 7월 16일 ~ 2023년 07월 19일

<br/>

## 🧭 목적

- 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현

<br/>

## 🛠️ Stacks

![react](https://user-images.githubusercontent.com/123078739/234895132-18ab503a-fcc7-486d-b89a-cb0cc1f7796b.svg) ![eslint](https://user-images.githubusercontent.com/123078739/234895191-c1198a7b-9e2e-499a-8e61-c3b87bf8e2c2.svg)
![prettier](https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) ![typescript](https://user-images.githubusercontent.com/123078739/234895162-42f905c6-765d-44d2-bcb1-b011286ef6b2.svg) ![styledcomponents](https://user-images.githubusercontent.com/123078739/234895185-7fd6c334-faca-4520-8551-2f20b32f085e.svg)

<br/>

## 📍 기능

- 검색어 추천 목록
- 최근 검색어 목록

<table border>
  <tr>
    <td><img src="https://github.com/hyerimhan/pre-onboarding-11th-4-3/assets/64674174/928ef710-7106-4ed4-817c-b03c1aadfe75" alt="Search"/></td>
  </tr>
  <tr>
    <td align="center">Search</td>
  </tr>
</table>

<br/>

## 🌳 File Tree

```
📦src
 ┣ 📂api
 ┃ ┗ 📜index.ts
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜Loading.tsx
 ┃ ┣ 📂search
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜SearchBar.tsx
 ┃ ┃ ┣ 📜SearchCard.tsx
 ┃ ┃ ┗ 📜SearchCardList.tsx
 ┃ ┣ 📂svgs
 ┃ ┣ 📂template
 ┃ ┃ ┗ 📜Layout.tsx
 ┃ ┣ 📜Banner.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┗ 📜Nav.tsx
 ┣ 📂constant
 ┃ ┣ 📜colors.ts
 ┃ ┣ 📜commonStyle.ts
 ┃ ┗ 📜navUrl.ts
 ┣ 📂hooks
 ┃ ┣ 📜useCardOpen.ts
 ┃ ┣ 📜useDebounce.ts
 ┃ ┣ 📜useKeyFocus.ts
 ┃ ┗ 📜useLocalStorage.ts
 ┣ 📂interface
 ┃ ┗ 📜search.ts
 ┣ 📂lotties
 ┃ ┗ 📜loading.json
 ┣ 📂pages
 ┃ ┣ 📜Home.tsx
 ┃ ┗ 📜NotFound.tsx
 ┣ 📂utils
 ┃ ┗ 📜cacheStorage.ts
 ┣ 📜App.tsx
 ┣ 📜GlobalStyle.ts
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts
```

<br/>

## ✨ 주요 구현 목록

### 1. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

- `input`에 입력되는 텍스트에 따라 API를 호출하도록 구현하였습니다.
- API 호출을 통해 받아온 데이터는 상태 업데이트 후, 추천 검색어를 보여주는 UI에 `props`로 넘겨주도록 구현하였습니다.

```Javascript
// components/search/SearchBar.tsx
const SearchBar = ({
  // ...
}: Props) => {
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddKeyword(searchValue);
    setSearchValue('');
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
    setCurrentIndex(-1);
  };

  return (
    <SearchBarStyle isopen={isopen.toString()} onClick={onClick}>
      <form onSubmit={formSubmit}>
        <InputStyle type="text" value={searchValue} onChange={handleInput} onKeyDown={onKeyDown} />
        <ButtonStyle>
          <BiSearch />
        </ButtonStyle>
      </form>
      {!isopen && (
        <PlaceHolderStyle>
          <BiSearch />
          <PStyle>질환명을 입력해주세요.</PStyle>
        </PlaceHolderStyle>
      )}
    </SearchBarStyle>
  );
};
```

```Javascript
// components/search/SearchCard.tsx
const SearchCard = ({
  // ...
}: Props) => {
  return (
    <SearchCardStyle>
      {searchValue ? (
        // 검색어 입력중
        <SearchPreviewStyle>
          <BiSearch />
          <PStyle>{searchValue}</PStyle>
        </SearchPreviewStyle>
      ) : isLoading ? (
        <Loading />
      ) : (
        // 검색어 입력중 X
        <>
          <H3Style>최근 검색어</H3Style>
          <SearchCardList searchData={keywords} />
        </>
      )}
      {searchValue && searchData.length > 0 ? (
        // 검색어 입력중 & 데이터가 있을때
        <>
          <H3Style style={{ marginTop: '30px' }}>추천 검색어</H3Style>
          <SearchCardList searchData={searchData} ulRef={ulRef} currentIndex={currentIndex} />
        </>
      ) : isLoading ? (
        <EmptyListStyle>추천 검색어 검색중...</EmptyListStyle>
      ) : null}
    </SearchCardStyle>
  );
};
```

- API 컴포넌트에 API 호출여부를 알려주는 `console.info('calling api')` 를 추가하였습니다.

```Javascript
// api/index.ts
export const GETSEARCH = async (searchValue?: string) => {
  const cacheName = `cache_${searchValue}`;
  const URL = `${process.env.REACT_APP_BASE_URL}/sick?q=${searchValue}`;

  if (searchValue) {
    try {
      const cachedData = await getCacheStorage(cacheName, URL);
      if (cachedData) {
        return cachedData;
      }
      const { data } = await instance.get('/sick', {
        params: { q: searchValue },
      });
      await setCacheStorage(cacheName, URL, data);
      console.info('calling api');
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response;
      }
      console.error('Error while searching for keyword:', error);
      return { data: [] };
    }
  } else [];
};
```

- 최근 검색어 localStorage 저장, 불러오기
  - `useLocalStorage` 커스텀 훅을 사용하여 사용했던 검색어를 `ENTER`를 누르면 localStorage에 저장해놓고, 사용자가 아무런 입력이 없을때 '최근 검색어'로 검색했던 검색어가 중복없이 출력됩니다.

```Javascript
// hooks/useLocalStorage.ts
const useLocalStorage = () => {
  const [keywords, setKeywords] = useState(JSON.parse(localStorage.getItem('keywords') || '[]'));

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

  const handleAddKeyword = (searchValue: string) => {
    const newKeyword = {
      sickCd: Date.now(),
      sickNm: searchValue,
    };
    setKeywords([...keywords, newKeyword]);
  };

  return { handleAddKeyword, keywords };
};

export default useLocalStorage;
```

### 2. API 호출별로 로컬 캐싱 구현

- 로컬 캐싱을 구현하기 위해 Cache API를 사용하였습니다.
- 캐시 Expire time을 구현하였습니다.

#### Case 01. setCacheStorage

- 데이터를 캐시 스토리지에 저장하는 함수입니다. 캐시 스토리지에 저장할 데이터를 Response 객체로 생성하고, 해당 Response Headers에 현재시간을 담습니다.
- 특정 url을 설정해두고 caches 윈도우의 객체 프로퍼티 내부에 있는 메서드 open을 호출합니다.
- 객체를 한 번 캐싱하면 그 뒤에 json()을 통해 data 값을 호출하는 것이 불가능하므로 반드시 put으로 넣기 전에 미리 clone 메서드를 호출해야합니다.

```JavaScript
// utils/cacheStorage.ts
export const setCacheStorage = async (cacheName: string, url: string, data: ISearch[]) => {
  const cacheStorage = await caches.open(cacheName);
  const response = new Response(JSON.stringify(data));

  const cloneResponse = response.clone();
  const newBody = await cloneResponse.blob();
  const newHeaders = new Headers(cloneResponse.headers);
  newHeaders.append('fetch-date', new Date().toISOString());

  const newResponse = new Response(newBody, {
    status: cloneResponse.status,
    statusText: cloneResponse.statusText,
    headers: newHeaders,
  });

  if (url) cacheStorage.put(url, newResponse);
};
```

#### Case 02. getCacheStorage

- 캐시 데이터를 캐시 스토리지에서 꺼내오는 함수입니다. 사용자가 검색한 데이터인 url를 캐시 스토리지에서 찾습니다. 캐시 데이터가 존재한다면 해당 캐시 Response를 반환합니다.
- 이 스토리지 내용만 조회해서는 데이터를 전달해주지 않으므로 반드시 json 메서드로 변환 호출해서 가져와야 합니다.

```JavaScript
// utils/cacheStorage.ts
export const getCacheStorage = async (cacheName: string, url: string) => {
  try {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (cachedResponse) {
      if (!getIsCacheExpired(cachedResponse)) cachedResponse;
      await cacheStorage.delete(url);
      return null;
    }
    return null;
  } catch (error) {
    console.error('Error while getting data from cache:', error);
    return false;
  }
};
```

#### Case 03. getIsCacheExpired

- 캐시 데이터가 만료되었는지 판단하여 boolean 값을 반환하는 함수입니다. 인자로 Response를 받아 해당 Response의 Header에 담아있는 캐시 저장 날짜를 확인합니다. 현재 날짜와 캐시 저장 날짜의 차이가 만료 시간보다 클 경우 해당 캐시는 만료된 캐시이므로 false를 반환합니다.

```JavaScript
// utils/cacheStorage.ts
export const getIsCacheExpired = (cacheResponse: Response) => {
  const cachedDate = cacheResponse.headers.get('fetch-date');

  if (!cachedDate) return;

  const fetchDate = new Date(cachedDate).getTime();
  const today = new Date().getTime();

  return today - fetchDate > 1000 * 60 * 5;
};
```

#### 💡 로컬 캐싱이란?

- 저장공간이 5mb 문자열밖에 저장하지 못하는 localStorage에 비해 많이 저장할 수 있으며 적어도 수백 MB, 경우에 따라 수GB 이상까지 저장할 수 있습니다. 브라우저 구현은 다를 수 있지만 사용 가능한 저장 공간의 양은 일반적으로 장치에서 사용 가능한 저장 공간의 양에 따라 결정됩니다.

### 3. 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 기능 구현

- 탭을 닫을시, 데이터가 사라지는 Throttling대신, 이벤트를 그룹화하여 특정 시간이 지난 후 하나의 이벤트만 발생하도록 하는 Debounce 기술을 사용했습니다.
- `input`창에 검색어를 입력할 때마다 검색어를 모아주는 기능을 담은 함수 `useDebounce`에 전달합니다. 특정 시간을 설정해놓고, 해당 시간 내에 입력하는 모든 텍스트를 하나로 모은 다음에 해당 시간이 지나면 축적된 텍스트의 변경 유무에 따라 API를 호출하여 네트워크 비용을 줄이도록 구현하였습니다.

```JavaScript
// hooks/useDebounce.ts
const useDebounce = (value: string, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
```

#### 💡 Throttling vs Debouncing

- Throttling: 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것 - 스크롤을 올리거나 내릴 때 주로 사용
- Debouncing: 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것 - ajax 검색에 주로 사용

### 4. 키보드만으로 추천 검색어들로 이동 가능하도록 구현

- 키보드 방향키 `↑` or `↓`, `ENTER`를 이용하여 추천 검색어 목록을 이동할 수 있습니다.
- 각각의 조건문을 iterate하며 control flow를 결정하는 if문이 아닌, if문과 동일하게 작동하지만 if문보다 빠르고 하나의 변수를 입력받아 그 변수의 값에 따라 다른 흐름으로 이동할 수 있는 switch문을 대체 사용하여 코드를 최적화하고 가독성을 높였습니다.

```Javascript
// hooks/useDebounce.ts
const KEY_NAME = {
  arrowDown: 'ArrowDown',
  arrowUp: 'ArrowUp',
  enter: 'Enter',
};

const useKeyFocus = (
  dataLength: number,
  setKeyword: React.Dispatch<React.SetStateAction<string>>,
): Props => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const ulRef = useRef<HTMLUListElement>(null);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (dataLength > 0) {
      switch (event.key) {
        case KEY_NAME.arrowDown:
          setCurrentIndex(currentIndex + 1);
          if (ulRef.current?.childElementCount === currentIndex + 1) setCurrentIndex(0);
          break;
        case KEY_NAME.arrowUp:
          setCurrentIndex(currentIndex - 1);
          if (currentIndex <= 0) setCurrentIndex(ulRef.current!.childElementCount - 1);
          break;
        case KEY_NAME.enter:
          setCurrentIndex(-1);
          setKeyword(ulRef.current?.children[currentIndex].textContent?.substring(2) as string);
          break;
      }
    }
  };
  return { currentIndex, ulRef, handleKeyPress, setCurrentIndex };
};
```

- `a`태그를 이용하여 `Tab(아래로 이동)` + `Shift + Tab(위로 이동)` [웹 접근성](https://developer.mozilla.org/ko/docs/Web/Accessibility)을 고려하여 마크업을 진행하였습니다.

```Javascript
// components/search/SearchCardItem
const SearchCardItem = ({ searchData, ulRef, currentIndex }: Props) => {
  return (
    <>
      // ...
        <LiStyle key={result.sickCd} isfocus={(currentIndex === index).toString()}>
          <LinkTagStyle href="">
            <BiSearch />
            <PStyle>{result.sickNm}</PStyle>
          </LinkTagStyle>
        </LiStyle>
      ///...
    </>
  );
};
```
