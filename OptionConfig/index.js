import React, { PureComponent as Component } from 'react';
import { Switch } from 'antd';
import PropTypes from 'prop-types';
import {DEFAULT_OPTIONS, DEFAULT_OPTIONS_LABEL} from '../j2t/index';

export default class OptionConfig extends Component {
  static propTypes = {
    onOptionsChange: PropTypes.func,
    options: PropTypes.object
  };


  state = {
    ...DEFAULT_OPTIONS
  }

  onSwitchChange = (optionKey, optionValue) => {
    this.setState({
      [optionKey]: optionValue
    },()=>{
      this.props.onOptionsChange(this.state);
    });
  }

  render(){
    return (
      <div>
        <h3>ts转换配置</h3>
        {
          Object.keys(DEFAULT_OPTIONS).map(key=>{
            if(typeof DEFAULT_OPTIONS[key] === 'boolean'){
              return (
                <div key={key}>
                  <Switch 
                    size="small" 
                    checked={this.state[key]} 
                    onChange={b=>this.onSwitchChange(key, b)} 
                  />
                  <span style={{marginLeft: 10}}>{DEFAULT_OPTIONS_LABEL[key]}</span>
                </div>
              );
            }
            return null;
          })
        }
      </div>
    );
  }
}