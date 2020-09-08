import React, {Component} from 'react';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import reactGA from 'react-ga';

export default () => Composed =>
class extends Component{
  static getInitialProps(ctx){
    return loadGetInitialProps(Composed, ctx)
  }

  componentDidMount(){
    reactGA.initialize('ID_ANALYTICS');
    reactGA.pageview(window.location.pathname);
    
  }

  render(){
    return <Composed {...this.props} />
  }
}