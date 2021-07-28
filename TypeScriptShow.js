import React, { PureComponent as Component } from 'react';
import { Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Json2Ts, transReqQuery } from "./util";
import jsonSchema2ts from 'yapi-plugin-typescript/j2t';
import OptionConfig from './OptionConfig';
import {DEFAULT_OPTIONS} from './j2t/index';
// import './index.scss';

const { TextArea } = Input;

@connect(
  state => {
    return {
      curdata: state.inter.curdata,
      currProject: state.project.currProject
    };
  }
)
export default class TypeScript extends Component {
  static propTypes = {
    curdata: PropTypes.object,
    currProject: PropTypes.object
  };

  state = {
    reqQueryTypeScript: "",
    reqBodyTypeScript: "",
    resBodyTypeScript: "",
    reqBodyOptions:{
      ...JSON.parse(JSON.stringify(DEFAULT_OPTIONS))
    },
    resBodyOptions: {
      ...JSON.parse(JSON.stringify(DEFAULT_OPTIONS))
    }
  }

  setTypeScript = () => {
    this.setReqQueryTypeScript();
    this.setReqBodyTypeScript();
    this.setResBodyTypeScript();
  };
  setReqQueryTypeScript = () => {
    const {req_query} = this.props.curdata;
    if(!Array.isArray(req_query) || !req_query.length){
      return;
    }
    
    this.setState({
      reqQueryTypeScript: transReqQuery(req_query)
    });
  }
  setReqBodyTypeScript = () => {
    const {req_body_other, req_body_is_json_schema} = this.props.curdata;
    if(!req_body_other){
      return;
    } 
    let reqBodyTypeScript;

    if(!req_body_is_json_schema){
      reqBodyTypeScript =  new Json2Ts().convert(req_body_other);
    } else {
      const json = jsonSchema2ts(JSON.parse(req_body_other.toString()), this.state.reqBodyOptions);
      reqBodyTypeScript = json;
    }

    this.setState({
      reqBodyTypeScript
    });
  }
  setResBodyTypeScript = () => {
    const {res_body, res_body_is_json_schema} = this.props.curdata;
    if(!res_body){
      return;
    }
    let resBodyTypeScript;
    if(!res_body_is_json_schema){
      resBodyTypeScript =  new Json2Ts().convert(res_body);
    } else {
      const temp  = JSON.parse(res_body.toString());
      temp.title = 'RootObject';
      const json = jsonSchema2ts(temp, this.state.resBodyOptions);
      resBodyTypeScript = json;
    }

    this.setState({
      resBodyTypeScript
    });
  }

  onOptionsChange = (optionBlock, options, callback) => {
    const temp = {
      ...this.state[optionBlock],
      ...options
    }
    this.setState({
      [optionBlock]: temp
    },()=>{
      if(typeof callback === 'function'){
        callback();
      }
    });
  }

  componentDidMount() {
    console.log('state-->',this.state);
    console.log('props--->',this.props);
    this.setTypeScript();
  }
  
  render(){
    return (
      <div style={{padding: 20}}>
        {
          this.state.reqQueryTypeScript && (
            <div>
              <h2 className="typeScriptTitle">QUERY请求参数</h2>
              <TextArea
                value={this.state.reqQueryTypeScript}
                rows={6}
              />
            </div>
          )
        }
        {
          this.state.reqBodyTypeScript && (
            <div>
              <h2 className="typeScriptTitle">请求体参数</h2>
              <Row justify="space-between" gutter={10}>
                <Col span={18}>
                  <TextArea
                    value={this.state.reqBodyTypeScript}
                    rows={16}
                  />
                </Col>
                <Col span={6}>
                  <OptionConfig 
                    onOptionsChange={(options)=>this.onOptionsChange('reqBodyOptions', options, this.setReqBodyTypeScript)}
                  />
                </Col>
              </Row>
            </div>
          )
        }
        {
          this.state.resBodyTypeScript && (
            <div>
              <h2 className="typeScriptTitle">响应数据</h2>
              <Row justify="space-between" gutter={10}>
                <Col span={18}>
                  <TextArea
                    value={this.state.resBodyTypeScript}
                    rows={16}
                  />
                </Col>
                <Col span={6}>
                  <OptionConfig 
                    onOptionsChange={(options)=>this.onOptionsChange('resBodyOptions', options, this.setResBodyTypeScript)}
                  />
                </Col>
              </Row>
            </div>
          )
        }
      </div>
    );
  }
}