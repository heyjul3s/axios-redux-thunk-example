import { CancelTokenSource } from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { FETCH_POSTS } from '../../constants/actions';
import Request from '../../modules/request';

export interface IProps {
  error?: Error;
  dispatch: any;
  posts: any[];
};

export interface IPosts {
  userId: number,
  id: number,
  title: string,
  body: string,
};
 
class Home extends React.Component<IProps, {}> {
  request: CancelTokenSource;

  get dispatch() {
    return this.props.dispatch;
  }

  get posts() {
    return !!this.props.posts && this.props.posts;
  }

  public componentDidMount() {
    this.request = this.dispatch(Request.get(FETCH_POSTS));
  }

  public componentWillUnmount() {
    this.request.cancel();
  }

  public render() {
    return (
      <div className="main">
        <h1>Redux Thunking</h1>
        {this.posts.map((post, i) => {
          return (
            <div className={`post post-${i}`} key={`post-${post.id}`}>
              <p>{post.title}</p>
              <p>{post.body}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
 
const state = (store: any) => ({
  posts: store.home.posts,
  error: store.home.error
});

export default withRouter(connect(state)(Home));