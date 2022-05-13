## description
Im using nextjs as the framework of this project with typescript extension.
I also installed antd since I have an experience with it, and I think the example of the test also using antd.
I also installed eslint with prettier to help my code stay clean and beauty.

##instalation
- npm install
- npx cypress verify
- npm run build
- npm run install
- npm run cypress -> for unit testing -> select app.spec.js

## features
The project structure consist:
src
    common -> container common component or styles
        components
            layout
                base -> the container/parent of the content, usually consist of header and footer
        styles
    helpers 
        fetch_wrapper
    models -> contain all the main interface used for this application since we are using .ts
    modules -> or usually called as features is a component that called by the pages. Each modules contain 1 view and 1 provider.
                this help me to make the code structure more modular and not mixed between the function and the view.
                Im using react context and react hook for the provider.
    pages -> provide by next js for return the UI. The structure inside pages is determine the path/routing on the URL.

## logic
Explanation about the home_provider (src/modules/home/home_provider)
there is 3 main state change for the data fetching which is 
- filter
- pagination
- columns

also when the page first time initiate, the data fetching will be triggered.

Im using useEffect to make this possible.

for managing filter state Im using filterchange function to update the state.

for managing the pagination and column sorting Im using the function that already provided by antd table.
I just follow the parameter and take the value to update pagination and columns state.

