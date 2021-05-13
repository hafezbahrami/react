// Points:
//*******************************************************************
// (0) Final GOAL: Seperation of Concerns:
//     >> Components => Display Data
//     >> Reducers => Manage Data (make changes to the state)
//     >> Thunk => Side effect logics
//
//     Good Reference Graph:
//     https://hackernoon.com/redux-step-by-step-a-simple-and-robust-workflow-for-real-life-apps-1fdf7df46092
//     https://medium.com/practo-engineering/testing-redux-sagas-with-a-plan-e59124c5d139
//*******************************************************************
//*******************************************************************
// (1) Redux: Having a single Global/Central state:
//*******************************************************************
//            ** https://medium.com/@aksudupa11/redux-sagas-714370b61692
//            ** https://itnext.io/integrating-semantic-ui-modal-with-redux-4df36abb755c
//            ** It requires a special restriction how the data is going to flow from parent-comp to chil-comp
//            ** This Global/Central state is called "central Redux store" ==> A store.js file, as a single
//               source of truth  ==> In theory all data wil be in this "Central Redux Store"
//            (1-a) Three elements of Redux:
//                  (I)   Redux store: store.js, contains the current "state" of our Application
//                                     Input to store: "Action" ==> Dispatched from a connected comp
//                                     Inside Store:   "Reducers" + "State"
//                  (II)  Redux Action: actions.js contains all the events/actions that might get triggered
//                                     Output: ID/type and Data of all possible "Actions/Events" that
//                                             might get triggired. It will not have/contain the what-to-do
//                                             or eventHandler (that would be in Reducer)
//                                             ** To explicitely define different events happening in our app
//                                             ==> "Action type" and " Action Payload of additional data"
//                  (III) Redux Reducers: It includes all reducers. "Reducer" is basically event handler
//                                        an event. Reducers Box will be inside the store, and based on the
//                                        "Action Type" input to the stroe and to the reducers, decides what handler
//                                        to be triggired.
//
//            (1-b) "Uni-directional Data":
//                                        ** https://itnext.io/integrating-semantic-ui-modal-with-redux-4df36abb755c
//                                        ** An "action/event" get trigres from UI in "action.js". It only
//                                        has an ID (or type) and the data (payload). It is like when we hit
//                                        hit a light key.
//                                        ** In Reducer(s) Unit (which is inside the store => The actions
//                                        will be recieved (with ID/type and Payload) and determines what
//                                        event handler should be run ==> It usually is by Switch()
//                                        Many reducers might be inside the "Reducers" unit.
//                                        Reducer will update the "state"
//                                        => Component in our app gets "read-only" access to the updated-state
//
//            (1-c) Hih-level Steps:
//                       (I) Install the redux: "npm install redux react-redux"
//                       (II) Create a "store.js" on src level: our redux-store:
//                            >> Let's assume we only have 1 reducer "todo_reducer".
//                            >> We must configure our store, so that index.js can import the store:
//                                            import { todos_reducer } from "./todos/01_added_redux/reducers.js";
//                                            const reducers = { todos_reducer };
//                                            const rootReducer = combineReducers(reducers);
//                                            export const configStore = () => createStore(rootReducer);
//                       (III) Wrape the "app" comp in index.js inside the "redux provider". The wrapper
//                             needs to know what store to wrapp in.
//                                          ReactDOM.render(
//                                            <Provider store={configStore()}>
//                                              <App />
//                                            </Provider>,
//                                            document.getElementById("root")
//                                          );
//                                          const store = configStore();
//            (1-d) Detailed Steps:
//                       (I) Create "action.js":
//                            >> It is just an event/action with no eventhandler
//                            >> It is like, when I hit the light-switch at my room, what "type" of current
//                               will flow inside the wire, and what "data" that electricity handles ==>
//                               It will not tell what will happen (handler). Will it turns on a bulb
//                            >> We expect 2 types of action for our app: CREATE_TODO & REMOVE_TODO. For
//                               playload (the data that gets carried with action) is just a text user enters
//                               into the field in the UI.
//                                            export const CREATE_TODO = " CREATE_TODO";
//                                            export const create_todo_action = (text) => ({
//                                              type: CREATE_TODO,
//                                              payload: { text },
//                                            });
//                       (II) Create "reducers.js":
//                            >> In genral, it should be a function that serves all possible reducer(s). or all
//                               possible events/actions raised in action.js
//                            >> The action/event types defined in action.js should be impoerted
//                            >> The function gets 2 args: action & state
//                               ** Which we know every action has two type of info: "type" and "payloador data"
//                               ** Based on the action-type recieved, a certain event/hanlder will be run, and
//                                  an updated state will be returned
//                                                import { CREATE_TODO, REMOVE_TODO } from "./actions";
//                                                export const todos_reducer = (state = [], action) => {
//                                                  const { type, payload } = action;
//                                                  switch (type) {
//                                                    case CREATE_TODO: { ...const {data}=pyload .... state.concat(new_item) }
//                                                    case REMOVE_TODO: { ...const {data}=pyload .... state.filter(wwith_some_logic)}
//                                                    default:
//                                                      return state;
//                                                  }
//                                                };
//                               ** We can define many of this type of reducer, and then "combine" them
//                                  all in the store.js
//                               ** As we see, every reducer method has 2 input-args:
//                                    ==>               (state = [], action)
//                                  and whithin each switch-case items, we might add or deduct one item
//                                  to/from the state
//                       (III) Add "reducers" into store.js:
//                            >> combine all reducers into the "rootReducer", and put it into the store.js:
//                                                  import { todos_reducer } from "./todos/01_added_redux/reducers.js";
//                                                  const reducers = { todos_reducer };
//                                                  const rootReducer = combineReducers(reducers);

//                       (IV) Connect components to redux store:
//                            >> main LOGIC:
//                               ** The connect() function connects a React component to a Redux store.
//                                  It provides its connected component with the "pieces of the data" [state] it
//                                  needs from the store, and the functions [from redcuer] it can use to dispatch
//                                  actions to the store.
//                               ** "UI" in this link represent the component: https://medium.com/@aksudupa11/redux-sagas-714370b61692
//                            >> what component to connect?
//                               ** We have three main components: TodoList, TodoListItem, NewTodoForm ==>
//                                  Out of these 3, which one(s) should be connected to redux-store?
//                               ** Q: what components will trigger events and need a piece of data from "state":
//                                     (a) TodoList ==> to Remove a certain TodoItem
//                                     (b) NewTodoForm ==> to add a certain TodoItem
//                               ** These 2 are the comp-s to be connected
//                            >> Each "connecting" component, should know 2 things (as input arg to functional comp):
//                               ** What reducer (among all reducers in the reducer box) to connect
//                               ** What action/event to be dispatched/passed to that specific reducer
//                                  ==> const connectingComponent = ({ which_reducer, what_action_to_be_passed_to_that_reducer }) => { .................. };

//                            >> Each component (to be connected) should know:
//                               ** Logics for TodoList comp:
//                                    @@ We will have a button in each TodoListItem that has a "onClick" event.
//                                                <button
//                                                    onClick={() => onRemovedPressed(todo.text)}
//                                                    className="remove-button"
//                                                    >
//                                                    Remove
//                                                </button>
//                                    @@ onClick event is related the "onRemovePressed" property in the parent
//                                       comp, TodoList. It passes a text. therefore, it is expected the parent
//                                       comp, TodoList, passes a property named "onRemovedPressed"
//                                              <TodoListItem todo={todo} onRemovedPressed={onRemovedPressed} />
//                                    @@ In the parent comp, TodoList, in the old fashion, we could have handled
//                                       "onRemovedPressed". But in Redux world, we use it to dispatch/trigger an event
//                                       defined in the "Action.js":
//                                                  const mapDispatchToProps = (dispatch) => ({
//                                                    onRemovedPressed: (text) => dispatch(remove_todo(text)),
//                                                  });
//                            >> We need 2 last parts  for each component connecting to Store.js:
//                               ** How and what part of data from the whole "state" to get and have access to:
//                                  In our example, it takes the whole state, and only wants to have access to the ".todo" part of the state.
//                                                  const mapStateToProps = (state) => ({
//                                                    received_state: state.todos_reducer,
//                                                  });
//                               ** "mapStateToProps" will be called whenever the store state changes, and given
//                                  the store state as the only parameter.
//                               ** How to trigger an action in the store and in the reducers:
//                                  dispatch input-arg allows our comp to trigger an action that our redux store will
//                                  respond to:
//                                                  const mapDispatchToProps = (dispatch) => ({
//                                                    onCreatePressed: (text) => dispatch(create_todo(text)),
//                                                  });
//                            >> Some Other Points (Summary):
//                               ** what action/event from "action.js" to be dispatched/triggered
//                                   ==> the "reducer" takes care of handling it
//                               ** dispatching is the only way our comp can trigger the state change
//                               ** In the component, we payload the action/event with enough data
//                               ** Define a props within the comp, that will be associated with the dispatch
//
//
//            (1-d) "Persisting the Redux Store":
//                       (I) Problem:
//                                  >> If we refresh the app page, we see that all data will disapear,
//                                     and app starts from the begining ==> loosing all data
//                                   >> How to make sure  the "state" of our app stays the same upon
//                                      refressing the browser:
//                        (II) "Redux persistance" Steps:
//                             (II-a) Installations:
//                                    ** this package: npm install redux-persist
//                                    ** "Redux" Devool:
//                                       >> Install the Redux DevTool in Chrom: Google for "redux extension chorom"
//                                       >> Coonect our app-store to this Chrome extension: go to "store.js" and add
//                                          the following to the configStore:
//                                           window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                                       >> Now, we can see the redux extension tool in the browser ==> We can
//                                          see the "action", "State", ...==> on the left bar, we can see
//                                          all the "Action" triggired in our application ==> Add an item
//                                          into our app, and click "Create Todo" and then explore the
//                                          action, state, diff in the extension we just installed
//                             (II-a) Local Storage location:
//                                          ==> inspection ==> application ==> Local storage ==> localhost://3000
//                             (II-b) Changes in "store.js":
//                                       >> in the sore, instead of createStore based on "rootReducer", we
//                                          should createStore based on "persistedReducer" which itslef consumes
//                                          "rootReducer"
//                                                const persistedReducer = persistReducer(persistConfig, rootReducer);
//                                                export const configStore = () =>
//                                                  createStore(
//                                                    persistedReducer,
//                                                    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                                                  );
//                             (II-b) Changes in "index.js":
//                                       >> Instead of just wrapping the "App" with the "redux-store", we should
//                                          also include a "persistanceGate":
//                                                    export const store = configStore();
//                                                    const persistor = persistStore(store);
//                                                    ReactDOM.render(
//                                                      <Provider store={store}>
//                                                        <persistGate persistor={persistor} loading={<div> Loading... </div>}>
//                                                          <App />
//                                                        </persistGate>
//                                                      </Provider>,
//                                                      document.getElementById("root")
//                                                    );
//
//            (1-e) Ceate flow for "Mark As Complete" button:
//                       (I) Problem:
//                                  >> Now that we have completed 2 actions for 2 buttons, "Create Todo" and
//                                     "Remove", we want to do the same for "Marke it As Complete" button
//                                     as the 3rd action.
//                                  >> "Marke it As Complete" button, will be at "TodoListItem" comp level, and
//                                     we will be passing a propert to this comp as "isComplete".
//                                     "isComplete" by default is False, till this button is hit and it will be
//                                     witched to "True".
//                       (II) Steps:
//                             (II-a) use the "isComplete" to show or hide the "Mark-it-as-complete" button.
//                                              {state_item.item.isComplete
//                                                ? null
//                                                : <button className="completed-button">Mark As Completed</button>
//                                              }
//                             (II-b) Add new action:
//                                              export const MARKE_TODO_AS_COMPLETED = "MARKE_TODO_AS_COMPLETED";
//                                              export const remove_todo_action = (text) => ({
//                                                type: MARKE_TODO_AS_COMPLETED,
//                                                payload: { text },
//                                              });
//                             (II-c) Add new case in the todo_reducer:
//                                              case MARKE_TODO_AS_COMPLETED: {
//                                                const { text } = payload;
//                                                return state.map((item) => {
//                                                  if (item.text == text) {
//                                                    return { ...state, isComplete: true };
//                                                  }
//                                                  return state;
//                                                });
//                                              }
//                             (II-d) "onCompletedPressed" should be part of TodoListItem and TodoList comp's.
//                                     "onCompletedPressed" is basically carrying the dispatch for "marke-it-as-completed" action.
//                                     The dispatch is defined in the TodoList comp as this is the one
//                                     connected tothe redux store:
//                                                const mapDispatchToProps = (dispatch) => ({
//                                                  onRemovedPressed: (text) => dispatch(remove_todo_action(text)),
//                                                  onCompletedPressed: (text) => dispatch(markToDoAsCompleted(text)),
//                                                });
//                             (II-d) Define a "onClick" button in TodoListItem that gets "onCompletedPressed" as the property
//                                                onClick={() => onCompletedPressed(state_item.text)}
//*******************************************************************
// (2) Side-Effect Libraries
//*******************************************************************
//            ** https://medium.com/@ravindermahajan/why-use-redux-saga-f3413a3f7e34
//            ** install these 3 packages: "npm install redux-thunk redux-devtools-extension @babel/runtime"
//            ** install: npm install --save-dev @babel/plugin-transform-runtime
//               >> Add ".babelrc" to the src folder, with the following data:
//                          {
//                            "presets": ["@babel/preset-env", "@babel/preset-react"],
//                            "plugins": ["@babel/plugin-transform-runtime"],
//                          }
//            (2-a) Options for side-effect libraries:
//                  >> "Redux-Saga" ==> more popular
//                  >> "Redux-Thunk"==> Simpler
//            (2-b) Purpose:
//                  >> It is for all sort of async tasks, such as "loading data", ..
//                  >> In Redux-Thunk, a comp can dispatch 2 types of action:
//                     (I) a dispatch action => some-action => Reducers => {Redux-Store}
//                     (I) a dispatch action => some-thunk => fetch-data & .... => [get the result
//                         and back to some-Thunk] => Thiunk dispatches the results to "some-action"
//            (2-c) Main differences:
//                  >> Normally we dispatch an action based on: dispatch({type, payload})
//                  >> In Thunk world, we dispatch an action based on async function:
//                         dispatch({   async() => {...}  })
//            (2-d) A simple Thunk Steps:
//                  (I) adding ".babelrc", explained above
//                  (II) store.js:
//                               ** import redux-thunk
//                               ** import applyMiddleware
//                               ** import {composeWithDevTools} from 'redux-devtools-extension';
//                               ** replace the old "DevopTool" with "composeWithDevTool":
//                                            export const configStore = () =>
//                                              createStore(
//                                                persistedReducer,
//                                                composeWithDevTools(applyMiddleware(thunk))
//                                              );
//                  (III) add thunk:
//                              ** add thunk.js, inthe folder where action.js and reducer.js are.
//                              ** "thunk" is a function that returns another function, that we want to
//                                 perform when we trigger
//                                            export const displayAlert =(text) => () => {
//                                              alert(`You clicked on: ${text}`);
//                                            };
//                              ** The way we dispatch athink is the same as we dispatch an action
//                              ** Let's dispatch the above "alert" function, within our TodoList comp:
//                                 >> Let's define a prop that will be passed to the child-comp (TodoListItem),
//                                    called "onDisplayAlertClick"
//                                            const mapDispatchToProps = (dispatch) => ({
//                                              .........
//                                              onDisplayAlertClicked: (text) => dispatch(displayAlert(text))
//                                            });
//                                 >> Give TodoList access to "onDisplayAlertClicked"
//                                 >> For now, temporarily, we replace it to "onCompletedPressed"
//                                            <TodoListItem
//                                            .......
//                                            onCompletedPressed={onDisplayAlertClicked}
//                                            />
//                                 >> With this, by clicking the "Mark it As Completed" button, we should
//                                    see the "Hello" alert.
//                  (III) A local Server => the "Todo API":
//                              ** add a server to the project:
//                                >> go to where "react-ecosystem-server" is and: (1) npm install, (2) npm run start
//                                >> we should see the message: "server listening on port 8080"
//                              ** It is a simple REST API that allows us creat, read, update and delete
//                                 TodoItems "stored in memory on the server".
//                                >> It is on-memory, so we are not worries about setting up local MangoDB
//                              ** todo edpoint in our API:
//                                 GET /todos    ====> will send us back an array of all todos
//                                 POST /todos   ====> with  apayload containt a "text" and the server uses this
//                                                     text to create a new todo item in the memory in the server
//                                 POST /todos/:id/completed ====> mark todo as completed
//                                 DELETE /todos/:id
//            (2-d) Thunk and API - steps:
//                  (I) Define a new action for loading todos: => (someof them has no payload for now for this action):
//                                export const LOAD_TODOS_IN_PROGRESS = "LOAD_TODOS_IN_PROGRESS";
//                                export const loadTodosInProgress = () => ({
//                                  type: LOAD_TODOS_IN_PROGRESS,
//                                });
//
//                                export const LOAD_TODOS_SUCCESS = "LOAD_TODOS_SUCCESS";
//                                export const loadTodosSuccess = () => ({
//                                  type: LOAD_TODOS_SUCCESS,
//                                });
//
//                                export const LOAD_TODOS_FAILURE = "LOAD_TODOS_FAILURE";
//                                export const loadTodosFailure = () => ({
//                                  type: LOAD_TODOS_FAILURE,
//                                });
//                  (II) create a new "thunk", that creates nothing, but give an async function:
//                       ** load all the newly created actions:
//                                export const loadTodos = () => async (dispatch, getState) => {
//                                  ...SOME LOGICS for LOADING TOdos from server ...
//                                };
//
//
//                                export const loadTodos = () => async (dispatch, getState) => {
//                                  // put it in try and catch, just in case, our fetching to server does not work
//                                  try {
//                                    dispatch(loadTodosInProgress());
//                                    // make a request to the local server
//                                    const response = await fetch("http://localhost:8080/todos");
//                                    // load todos from server
//                                    const todos = await response.jason();
//                                    // dispatch the loadTodoSuccess action with the todo we just loaded from server
//                                    dispatch(loadTodosSuccess(todos));
//                                  } catch (e) {
//                                   dispatch(loadTodosFailure());
//                                    dispatch(displayAlert(e));
//                                  }
//                                };
//
//                                export const displayAlert = (text) => () => {
//                                  alert(text);
//                                };
//                  (III) Reducer.js: ==> Change in Redux Store upon dispatching some actions
//                        (a) Loading data from server might take time:
//                            >> Add a loading messege showing "data is loading":
//                                   ** Adding a separate "reducer" to keep track of whether or not or "todos"
//                                      is loaded. This returns "true", if the action is "LOAD_TODOS_IN_PROGRESS":
//
//                                  export const Loading_reducer = (state = false, action) => {
//                                    const { type } = action;
//
//                                    switch (type) {
//                                      case LOAD_TODOS_IN_PROGRESS:
//                                        return true;
//                                      case LOAD_TODOS_SUCCESS:
//                                        return false;
//                                      case loadTodosFailure:
//                                        return false;
//                                      default:
//                                        return state;
//                                    }
//                                  };
//                        (b) Add/import the new reducer into the "store.js":
//                                  const reducers = { todos_reducer, isLoading_reducer };
//                            ** Go to "Reduc DevTools" extension in Chorom => go to "state", and see
//                               2 reducers we created
//                  (IV) Make use of our new Reducer in the "TodoItem" comp:
//                       ** GOAL: based on "isLoading" flag, if "true" we want to show the "Is Loading" message,
//                          otherwise show the content
//
//                       ** step 1: get the "isLoading" flag from the state:
//                                  const mapStateToProps = (state) => ({
//                                    ............,
//                                    isoading: state.isLoading;
//                                  });
//                       ** step 2: add "isLoading" as an input prop argument to the comp:
//                       ** step 3: Actual TodoList comp start the loading flow:
//                           >> using reacthooks: "useEffect"
//                           >> import "loadTodos" from thunk.js
//                           >> add the thunk into "mapDispatchToProps":
//                                  const mapDispatchToProps = (dispatch) => ({
//                                    .........
//                                    startLoadingTodos: () => dispatch(loadTodos()),
//                                  });
//                               inject "startLoadingTodos" into the TodoList comp input argumnt to use it.
//
//                  (V) Load the list of "todos" [data] from server:
//                       ** We can use the "todos_reducer" to add the actions (type, and payload) to read
//                          from the server
//                       ** Add three actions, we added to "isLoading_reducer" above, into the "todos_reducer":
//                            >> in the action.js, we designed the "LOAD_TODOS_SUCCESS" in a way to get the
//                               todos from server.
//                                            .
//                                            .
//                                            .
//                                            case LOAD_TODOS_SUCCESS: {
//                                              const { todos } = payload;
//                                              return todos;
//                                            }
//                                            case LOAD_TODOS_IN_PROGRESS:
//                                            case LOAD_TODOS_FAILURE:
//                                            .
//                                            .
//                       ** In "TodoList" comp:
//                         (a) add "loadTodos" thunk into "mapDispatchToProps":
//                                startLoadingTodos: () => dispatch(loadTodos()),
//
//                         (b) then, "TodoList" comp link it to "useEffect" hook:
//                                      const TodoList = ({
//                                        received_state = [{ text: "Hello" }],
//                                        ....
//                                        isLoading,
//                                        startLoadingTodos,
//                                      }) => {
//                                        useEffect(() => {
//                                          startLoadingTodos();
//                                        }, []);
//                                        const loadingMessage = <div> Loading todos... </div>;
//                                        const content = (
//                                        ......
//                                        return isLoading ? loadingMessage : content;
//                                      };
//
//                  (VI) In above, our app loads all the todos from the server 8080 and list them.
//                       ISSUE: If we add a new item to the todos, it only saves them in the local storage:
//                              The added item is not persistant in the server and will dispapear upon
//                              refreshing.
//                       SOLUTION: Create a new "thunk" for adding new todo, by making a request to the server:
//                                    export const addTodoRequest = (text) => async (dispatch) => {
//                                      try {
//                                        // request body to the server
//                                        const body = JSON.stringify({ text });
//                                        const response = await fetch("http://localhost:8080/todos", {
//                                          headers: {
//                                            "Content-Type": "application/json",
//                                          },
//                                          method: "post",
//                                          body,
//                                        });
//                                        const todo = await response.json();
//                                        dispatch(create_todo_action(todo));
//                                      } catch (e) {
//                                        dispatch(displayAlert(e));
//                                      }
//                                    };

//                  (VI) action.js: changes in CREATE_TODO so it can work with new "server flow":
//                        ==> replace "text" with "todo":
//                                    export const CREATE_TODO = " CREATE_TODO";
//                                    export const create_todo_action = (todo) => ({
//                                      type: CREATE_TODO,
//                                      payload: { todo },
//                                    });
//                  (VII) reducer.js: in "CREATE_TODO" case, replace the text with todo:
//                                    case CREATE_TODO: {
//                                      const { todo } = payload;
//                                      return state.concat(todo);
//                                    }
//                  (VIII) NewTodoForm.jsx: dispatch the new "thunk" we just created
//                                    const mapDispatchToProps = (dispatch) => ({
//                                      onCreatePressed: (text) => dispatch(addTodoRequest(text)),
//                                    });
//                  (IX) So far we added think for "loading" from server, and creating a "todo" to the server:
//                       GOAL: delete a "todo" from a server:
//                             ==> When user click on "Remove" button, it persist those changes
//                             ==> For adding a todo, we created a "POST" request
//                             ==> for delete a todo, we create a "DELETE" request wih /id
//                       ** thunk: add "removeTodoRequest" thunk
//                                    export const removeTodoRequest = (id) => async (dispatch) => {
//                                      try {
//                                        const response = await fetch(`http://localhost:8080/todos/${id}`, {
//                                          method: "delete",
//                                        });
//                                        const removedTodo = await response.json();
//                                        dispatch(remove_todo_action(removedTodo));
//                                      } catch (e) {
//                                        dispatch(displayAlert(e));
//                                      }
//                                    };
//                       ** action.js: in REMOVE_TODO action creator, instead of text, it gets "todo", gets that
//                                     into the payload
//                                      export const CREATE_TODO = " CREATE_TODO";
//                                      export const create_todo_action = (todo) => ({
//                                        type: CREATE_TODO,
//                                        payload: { todo },
//                                      });
//                       ** reducer.js: Similar changes in reducer, instead of getting "text", it shoud get "todo":
//                                      case REMOVE_TODO: {
//                                        const { todo: todoToRemove } = payload;
//                                        return state.filter((todo) => todo.id !== todoToRemove.id);
//                                      }
//                       ** TodoList comp:
//                          >> in the import: remove "remove_todo_action" from action import
//                          >> add "removeTodoRequest" to thunk import
//                          >> add following to "mapDispatchToProps":
//                               onRemovedPressed: (id) => dispatch(removeTodoRequest(id)),
//                       ** TodoListItem comp:
//                                onRemovedPressed(state_item.id);
//                  (IX) "Mark it As Completed in the Server:
//                       GOAL: So far we added thunk for "loading" from server, creating a "todo" to
//                             the server and "delete" a todo in the server
//                             We want to be able to marke one todo in the server as "Completed"
//                       ** Thunk.js:
//                          >> As always, instead of directly chaging the action.js, we make changes in thunk
//                          >> add a new thunk as "MarkTodoAsCompleted"
//                       ** actions.js:
//                          >> we change the "markToDoAsCompleted" action to get "todo" instead of text
//                       ** reducer.js:
//                          >> we modify the old "MARKE_TODO_AS_COMPLETED" case
//                          >> cange "text" to "todo"
//                                    case MARKE_TODO_AS_COMPLETED: {
//                                      const { todo: updatedTodo } = payload;
//                                      return state.map((item) => {
//                                        if (item.id === updatedTodo.id) {
//                                          return updatedTodo;
//                                        }
//                                        return item;
//                                      });
//                                    }
//                       ** TodoList.jsx comp:
//                          >> instead of using "markToDoAsCompleted" action, we import
//                             "MarkTodoAsCompletedRequest" from thunk
//                                    import { loadTodos, removeTodoRequest, MarkTodoAsCompletedRequest } from "./thunk.js";
//                                    const mapDispatchToProps = (dispatch) => ({
//                                      ......
//                                      onCompletedPressed: (id) => dispatch(MarkTodoAsCompletedRequest(id)),
//                                      ......
//                                    });
//                       ** TodoListItem.jsx comp:
//                          >> Since the changes will be passed ot TodoListItem, we need to change there too:
//                                    onCompletedPressed(state_item.id);
//
//
//
//*******************************************************************
// (3) Selectors
//*******************************************************************
//            ** https://hackernoon.com/redux-step-by-step-a-simple-and-robust-workflow-for-real-life-apps-1fdf7df46092
//            ** PROBLEM: is we look at the "mapStateToProps" in each comp, to extract part of state data
//                        needed for that comp, REQUIRES GOOD KNOWLEDGE OF THE STATE and how things are
//                        stored in stae.
//            ** We can define various selctors that acomponents calls one of them, to get access to the state
//               it wants.==> Usually we can put some logics to get the data from redux-store and get it in
//               a shape that our component can use.
//            (I) Abstracing the way data is stored in redux-store:
//                  >> TodoList.jsx:
//                     ==> Here, in mapStateToProps,  we have state.todo and state.isLoading: -> Get these
//                         2 data and create a selector for them.
//                     ==> create a "selector.js", and create these functions:
//                                export const getTodos = (state) => state.todos;
//                                export const getTodosLoading = (state) => state.isLoading;
//                     ==> make these changes in TodoList.jsx:
//                                  import { getTodos, getTodosLoading } from "./selectors.js";
//                                  const mapStateToProps = (state) => ({
//                                    received_state: getTodos(state),
//                                    isoading: getTodosLoading(state),
//                                  });
//                  >> TodoListItem.jsx:
//                     ==> since we need the todos, we should use the selectors to get the todos of the state
//                     ==> since we need the todos, we should use the selectors to get the todos of the state
//                                    import { getTodos } from "./selectors.js";
//                                    const mapStateToProps = (state) => ({
//                                      todos_reducer: getTodos(state),
//                                    });
//                  >> reducer.jsx: => "changes in the data-structure" in reducer
//                     ==> GOAL: have a single reducer here for "todo"
//                               in rela life, you might have another reducer for another bigger category.
//                     ==> technically, reducers are between thunk/action box and the store box, while the
//                         selectors are between component box and store box.
//                     ==> In the sore, we make changes in the "state" based on the action dispatched by the
//                         comp. ==> we have difference cases in a reducer.
//                     ==> the main change in data structure:
//                         ** Currently we have 2 reducers.
//                         ** Incorporate the "isLoading" reducer into "todo_reducer"
//                     ==> we want to design it in a way that:
//                                  state.todo:{
//                                    data: [....],
//                                    isLoading: true,
//                                  }
//                     ==> steps:
//                          (a) define an intial state with 2 elemnts, data and isLoading:
//                                      const initialState ={sLoading=false, data=[]}
//                          (b) getting data from payload of actions is the same, the way
//                              we modify the sata based on payload data is changed, for each
//                              of the "case" in the switch statement in the reducer:
//                              for instance, for "REMOVE_TODO" will be changed to:
//
//                                    case REMOVE_TODO: {
//                                      const { todo: todoToRemove } = payload;
//                                      return {
//                                        ...state,
//                                        data: state.data.filter((todo) => todo.id !== todoToRemove.id),
//                                      };
//                                    }
//                              and for "":
//                                      case LOAD_TODOS_SUCCESS: {
//                                        const { todos } = payload;
//                                        return {
//                                          ...state,
//                                          isLoading: false,
//                                          data: todos,
//                                        };
//                                      }
//                          (c) Now, we can remove the old, 2nd reducer "isLoading_reducer"
//                          (d) remove the "isLoading_reducer" from the store as well.
