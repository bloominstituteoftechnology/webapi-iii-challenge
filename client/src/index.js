import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import PostList from './components/PostList';

ReactDOM.render(<Router>
                <div>
                    <Route exact path='/' component={App} />
                    <Route path='/posts:id' component={PostList} />
                </div>    
                </Router>, document.getElementById('root'));
registerServiceWorker();
