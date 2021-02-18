# Financial_Statement_Analyzer_FrontEnd



## History

> 2021-02-15 : createSlice, createAsyncThunk 를 사용하기 위해 Redux-Toolkit 모듈을 적용하였습니다.
>
> 2021-02-16 : Search 부분을 createSlice, createAsyncThunk 형식으로 수정하였습니다. 그 과정에서 Redux-Thunk 모듈을 추가하였습니다.
>
> 2021-02-17 : Update, Analyze 부분을 Redux-Thunk 모듈을 이용해 재구성하였습니다.
>
> 2021-02-18 : 왼쪽 측면에 검색결과를 추가하였습니다. 또한, 검색조건에 서버로부터 상장종류를 받아와 적용하도록 수정하였습니다.




## Goal

[Financial_Statement_Analyzer_BackEnd](https://github.com/nicesick/Financial_Statement_Analyzer_BackEnd) 에서 받아온 재무제표 데이터를 사용자들이 해당 기업에 대해 판단하기 쉽게 시각화하는 프로젝트 입니다.



## Environments

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/ko/) 14.15.4
- React, Redux, React-Redux, React-Router
- Axios
- Chart.js
- Material-UI
- Redux-Toolkit
- Redux-Thunk

```powershell
# 위의 환경들은 아래의 명령어들로 프로젝트에 설치하였습니다.

# 기본 react app 생성
> npx i create-react-app

# redux
> npm i --save redux react-redux
> npm i -D redux-logger

# router
> npm i --save react-router-dom

# 비동기 통신 axios
> npm i --save axios

# chart.js
> npm i react-chartjs-2 chart.js

# material-ui
> npm i --save @material-ui/core @material-ui/lab

# redux-toolkit
> npm install --save @reduxjs/toolkit

# redux-thunk
> npm install --save redux-thunk
```



## How to Execute

* 만약, BackEnd 주소에 대한 내용이 변경되었다면 Constant.js 에서 변경할 수 있습니다.

```powershell
# src/constants/Constants.js
export const ENDPOINTS = 'http://localhost:8080/'
```

* 필요한 module 들을 다운로드 후, 구동이 가능합니다.

```powershell
> npm install
> npm start
```



## File structure

* 첫번 째로 역할 별로 분류하고, Components 에서는 또 한 번 기능별로 구분하였습니다.
* 2021-02-16 : slice 폴더가 추가되었습니다.

> components
>
> 	* analyzer
> 	* guide
> 	* nav
> 	* search
>
> actions
>
> reducer
>
> slice
>
> constants
>
> utils



## Issues

* Redux, Router Props 전달 문제

  * Redux 를 이용해 dispatch 함수를 하위 컴포넌트( App.js > Analyzer.js , Nav.js , Search.js )에 전달해야 했습니다.
  * 다만, 어떻게 전달하는지 몰랐기에 처음에는 아래와 같이 dispatch 를 전달하려고 하였습니다.

  ```javascript
  /*
   * Before App.js
   */
  
  class App extends React.Component {
      render() {
          return (
              <BrowserRouter>
                  <Grid container spacing={1}>
                      <Grid item xs={4} md={3}>
                          <Nav />
                      </Grid>
                      <Grid item xs={8} md={9}>
                          <Route path="/"                     component={Guide} exact></Route>
                          <Route path="/guide"                component={Guide}></Route>
                          <Route path="/search"               component={() => {<Search {...this.props} />}}></Route>
                          <Route path="/analyze/:corpCode"    component={() => {<Analyzer {...this.props} />}}></Route>
                      </Grid>
                  </Grid>
              </BrowserRouter>
          );
      }
  }
  
  export default connect()(App)
  ```

  * 이런 식으로 props 를 전달 할 시 <code><Route path="/analyze/:corpCode"    component={() => {<Analyzer {...this.props} />}}>\</Route></code> 부분에서 :corpCode 값이 제대로 전달되지 않는 문제가 발생했습니다. 
  * Router 에서 쓰이는 Props 인 match, location. history 인자들이 this.props 에 포함되지 않은 채로 전달되었기 때문이었습니다.
  * Route 부분을 다시 <code>\<Route path="/analyze/:corpCode"    component={Analyzer}>\</Route></code> 로 복구 한 뒤, 하위 컴포넌트( Analyzer.js ) 에도 connect 를 추가하였습니다.

  ```javascript
  /* 
   * In Analyzer.js 
   */
  
  ...Analyzer Logics...
  
  function select(props, ownProps) {
      return {
          isCorpDetailRequested   : props.isCorpDetailRequested,
          corpDetail              : props.corpDetail,
          corpCode                : ownProps.match.params.corpCode
      }
  }
  
  export default connect(select)(Analyzer)
  ```

  * React-redux 의 connect 함수의 mapStateToProps 부분을 이용해 match, location, history 부분을 받아 올 수 있었습니다.



* 비동기통신 호출시기 문제
  * Analyzer.js 에서 페이지가 로드 되었을 때, 비동기 통신으로 분석결과 데이터를 받아오려고 하였습니다.
  * 처음에는 Component 의 constructor 부분에 비동기 통신 함수를 넣었으나, 한 번만 실행될 줄 알았던 함수가 반복적으로 실행되는 문제가 발생하였습니다.
  * constructor 함수에서 componentDidMount 함수로 옮겼더니, 비동기 통신 한 번 생성되고 난 후 Router를 통해 :corpCode 값이 변경되어도 해당 함수가 다시 실행되지 않았습니다.
  * 그래서 React 의 LifeCycle 함수들 중 corpCode 값이 변경 되었을 때 비동기 요청을 할 수 있는 shouldComponentUpdate 함수에도 조건식을 넣어 corpCode 가 변경되었을 때에만 다시 비동기 통신 함수를 호출하도록 하였습니다.

  ```javascript
  class Analyzer extends React.Component {
      /**
       * 처음 생성되었을 때, 비동기 함수를 실행합니다.
       */
      componentDidMount() {
          const { dispatch, corpCode } = this.props;
          getCorpDetail(dispatch, corpCode);
      }
  
      /**
       * corpCode 값이 변경 되었을 때, 비동기 함수를 실행합니다.
       */
      shouldComponentUpdate(newProps, newState) {
          if (Object.keys(newProps.corpDetail).length > 0
              && (newProps.isCorpDetailRequested === false 
              && newProps.corpCode !== newProps.corpDetail.corp_code)
          ) {
              const { dispatch, corpCode } = newProps;
              getCorpDetail(dispatch, corpCode);
  
              return false;
          }
  
          return true;
      }
  
      // componentDidUpdate(newProps, newState) {
      //     console.log(newProps);
      // }
      
      ... Analyzer Logics ...
  ```



## Todos

1. 서버로부터 error 및 updating 응답을 받았을 경우, 주기적으로 비동기요청을 보내는 **setInterval** 추가 필요
2. 서버에 Spring-Security 적용 시, 로그인 화면 추가 필요



## References

* React
  * [React 자습서](https://ko.reactjs.org/tutorial/tutorial.html#what-is-react) : React 기본 자습서 입니다. 처음으로 React 를 이해하기 좋았습니다.
  * [React Maximum update depth 에러 해결법](https://kss7547.tistory.com/36) : Constructor 에 비동기 통신을 집어넣었을 경우, 비동기 통신 반복으로 생겼던 에러를 해결하기 위해 찾았던 사이트입니다. 비록 이 문서로 해결은 못하였지만, 이후 React 개발하는데 도움이 될 것 같습니다.
  * [React 컴포넌트 라이프사이클 이벤트](https://flymogi.tistory.com/48) : React 의 기본적인 라이프사이클 문서입니다. 현재 ~ Will ~ 속성은 deprecated 되어 있음을 인지하고 읽으시면 될 것 같습니다. 이 문서를 보고 비동기 통신시기를 정할 수 있었습니다.
  * [react-redux 에서 Hooks 사용하기](https://velog.io/@velopert/react-redux-hooks) : 비록 이 프로젝트에서는 Hooks 를 사용하지는 않았지만 알아두면 좋을 것 같습니다.
* Redux
  * [Redux 자습서](https://ko.redux.js.org/basics/basic-tutorial) : Redux 기본 자습서 입니다. 처음으로 Redux 를 이해하기 좋았습니다. 심화과정에서는 Router 와 함께 사용하는 방법도 있습니다.
  * [Object.assign 얕은 복사, 깊은 복사](https://valuefactory.tistory.com/257) : Redux 에서 빼놓을 수 없는 Object.assign 함수에 대한 문서입니다. 이 글을 보고 자습서를 보니까 이해하기 더 편했습니다.
* Router
  * [React Router를 이용하여 component 간에 props 넘겨주기](https://medium.com/@ghur2002/react-router%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-component%EA%B0%84%EC%97%90-props-%EB%84%98%EA%B2%A8%EC%A3%BC%EA%B8%B0-610de3511c67) : <code><Route path="/analyze/:corpCode" ... ></Route></code> 방법으로 props 를 넘겨주는 것 뿐만 아니라 다른 여러가지 방법으로 props 를 넘겨주는 방법에 대한 문서입니다.
* Axios
  * [Axios를 사용하여 HTTP 요청하기](https://tuhbm.github.io/2019/03/21/axios/) , [Axios에 대해서](https://seaweedisland.tistory.com/161) : Axios 에 대한 기본적인 문서입니다.
* Chart.js
  * [Chart.js Examples](https://www.chartjs.org/samples/latest/) : Chart.js 그리는데 필요한 Examples 들을 볼 수 있습니다. 페이지에 들어가서 F12로 개발자도구에 들어가면 해당 차트에 적용된 data 와 options 들을 볼 수 있습니다.
  * [256 color 색상표](http://www.n2n.pe.kr/lev-1/color.htm) : 차트 색깔을 그리는데 필요한 색상표 입니다.
* Material-ui
  * [Material-UI 자습서](https://material-ui.com/components/grid/) : material-ui 에서 지원하는 component 들을 알 수 있습니다. 해당 component의 API 를 검색하면 안에 적용할 수 있는 props 들도 파악할 수 있습니다.
* Redux-Toolkit
  * [redux-toolkit 을 사용해 redux 작성 하기](https://blog.woolta.com/categories/1/posts/204) : createSlice, createAsyncThunk 형식을 적용하는 방법에 대한 문서입니다.